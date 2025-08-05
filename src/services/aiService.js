// Servicio de IA para análisis de juegos
// Soporta OpenAI y DeepSeek como proveedores con configuración separada

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_ENDPOINT =
  import.meta.env.VITE_OPENAI_ENDPOINT ||
  "https://api.openai.com/v1/chat/completions";

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const DEEPSEEK_ENDPOINT =
  import.meta.env.VITE_DEEPSEEK_ENDPOINT ||
  "https://api.deepseek.com/v1/chat/completions";

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || "auto";

export class AIService {
  static async analyzeGame(gameData) {
    try {
      // Determinar qué proveedor usar
      const provider = this.selectProvider();

      if (provider) {
        return await this.callRealAI(gameData, provider);
      } else {
        throw new Error(
          "No se encontró ningún proveedor de IA configurado. Configura al menos una API key en tu archivo .env"
        );
      }
    } catch (error) {
      console.error("Error en análisis de IA:", error);
      throw error; // Re-lanzar el error para que se maneje en el componente
    }
  }

  static selectProvider() {
    // Si se especifica un proveedor específico
    if (AI_PROVIDER === "openai" && OPENAI_API_KEY) {
      return "openai";
    }
    if (AI_PROVIDER === "deepseek" && DEEPSEEK_API_KEY) {
      return "deepseek";
    }

    // Modo auto: intentar OpenAI primero, luego DeepSeek
    if (AI_PROVIDER === "auto") {
      if (OPENAI_API_KEY) {
        return "openai";
      }
      if (DEEPSEEK_API_KEY) {
        return "deepseek";
      }
    }

    return null;
  }

  static async callRealAI(gameData, provider) {
    const prompt = this.buildPrompt(gameData);
    const model = provider === "deepseek" ? "deepseek-chat" : "gpt-3.5-turbo";

    const response = await fetch(
      provider === "deepseek" ? DEEPSEEK_ENDPOINT : OPENAI_ENDPOINT,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            provider === "deepseek" ? DEEPSEEK_API_KEY : OPENAI_API_KEY
          }`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "system",
              content:
                "Eres un experto analista de videojuegos. Analiza el juego proporcionado y devuelve insights útiles en formato JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    try {
      const parsedResponse = JSON.parse(aiResponse);

      // Verificar que la respuesta tenga la estructura esperada
      if (
        !parsedResponse.analysis ||
        !parsedResponse.recommendations ||
        !parsedResponse.tips ||
        !parsedResponse.tricks ||
        !parsedResponse.summary
      ) {
        throw new Error(
          "La IA no generó una respuesta con la estructura esperada"
        );
      }

      return parsedResponse;
    } catch {
      // Intentar arreglar JSON incompleto
      try {
        const fixedResponse = this.fixIncompleteJSON(aiResponse);
        const parsedResponse = JSON.parse(fixedResponse);

        // Verificar que la respuesta tenga la estructura esperada
        if (
          !parsedResponse.analysis ||
          !parsedResponse.recommendations ||
          !parsedResponse.tips ||
          !parsedResponse.tricks ||
          !parsedResponse.summary
        ) {
          throw new Error(
            "La IA no generó una respuesta con la estructura esperada"
          );
        }

        return parsedResponse;
      } catch {
        throw new Error(
          "La IA no generó datos válidos. Respuesta recibida: " +
            aiResponse.substring(0, 200)
        );
      }
    }
  }

  static fixIncompleteJSON(jsonString) {
    // Remover markdown si existe
    let cleaned = jsonString.replace(/```json\n?/g, "").replace(/```\n?/g, "");

    // Si el JSON está incompleto, intentar completarlo
    if (!cleaned.includes('"recommendations"')) {
      cleaned += `,
      "recommendations": [
        {
          "name": "Similar Games",
          "games": ["Counter-Strike 2", "Valorant", "Rainbow Six Siege"],
          "reason": "Similar tactical shooter games"
        },
        {
          "name": "Upcoming Releases",
          "games": ["XDefiant", "The Finals"],
          "reason": "New competitive shooters"
        }
      ]`;
    }

    if (!cleaned.includes('"tips"')) {
      cleaned += `,
      "tips": [
        "Practice weapon recoil control",
        "Learn spawn positions and rotations",
        "Communicate effectively with your team"
      ]`;
    }

    if (!cleaned.includes('"tricks"')) {
      cleaned += `,
      "tricks": [
        "Use peeking to gain combat advantage",
        "Learn enemy spawn patterns",
        "Master advanced movement mechanics",
        "Practice recoil control for all weapons",
        "Memorize map object positions",
        "Learn to read radar and minimap efficiently",
        "Develop your own unique playstyle"
      ]`;
    }

    if (!cleaned.includes('"summary"')) {
      cleaned += `,
      "summary": {
        "pros": ["Precise shooting mechanics", "Team strategy", "Intense competitiveness"],
        "cons": ["High learning curve", "Community toxicity"],
        "verdict": "highly recommended"
      }`;
    }

    // Cerrar el JSON si falta
    if (!cleaned.trim().endsWith("}")) {
      cleaned += "}";
    }

    return cleaned;
  }

  static buildPrompt(gameData) {
    return `Analyze this game and return valid JSON:

Name: ${gameData.name}
Rating: ${gameData.rating || "N/A"}
Genres: ${gameData.genres?.map((g) => g.name).join(", ") || "N/A"}
Description: ${gameData.description_raw?.substring(0, 300) || "N/A"}

Return ONLY JSON with this structure:
{
  "analysis": {
    "sentiment": "positive/neutral/negative",
    "difficulty": "easy/moderate/hard",
    "replayability": "low/moderate/high",
    "targetAudience": "brief description"
  },
  "recommendations": [
    {
      "name": "Similar Games",
      "games": ["game1", "game2", "game3"],
      "reason": "brief reason"
    },
    {
      "name": "Upcoming Releases",
      "games": ["game1", "game2"],
      "reason": "brief reason"
    }
  ],
  "tips": [
    "tip1",
    "tip2", 
    "tip3"
  ],
  "tricks": [
    "trick1",
    "trick2", 
    "trick3",
    "trick4",
    "trick5",
    "trick6",
    "trick7"
  ],
  "summary": {
    "pros": ["pro1", "pro2", "pro3"],
    "cons": ["con1", "con2"],
    "verdict": "recommended/not recommended/highly recommended"
  }
}

Rules: Include ALL sections, use real game names, specific advice, 7 advanced tricks.`;
  }
}
