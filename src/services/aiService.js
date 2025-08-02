// Servicio de IA para análisis de juegos
// En producción, conectarías con OpenAI, Claude, o tu propia API

const AI_API_KEY = import.meta.env.VITE_AI_API_KEY;
const AI_ENDPOINT =
  import.meta.env.VITE_AI_ENDPOINT ||
  "https://api.openai.com/v1/chat/completions";

export class AIService {
  static async analyzeGame(gameData) {
    try {
      // Si tienes API key configurada, usa IA real
      if (AI_API_KEY) {
        return await this.callRealAI(gameData);
      } else {
        // Fallback a análisis simulado
        return await this.simulateAIAnalysis(gameData);
      }
    } catch (error) {
      console.error("Error en análisis de IA:", error);
      return await this.simulateAIAnalysis(gameData);
    }
  }

  static async callRealAI(gameData) {
    const prompt = this.buildPrompt(gameData);

    const response = await fetch(AI_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
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
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    try {
      return JSON.parse(aiResponse);
    } catch {
      // Si no es JSON válido, parsear manualmente
      return this.parseAIResponse(aiResponse);
    }
  }

  static buildPrompt(gameData) {
    return `
    Analiza el siguiente juego y proporciona insights en formato JSON:
    
    Nombre: ${gameData.name}
    Rating: ${gameData.rating || "N/A"}
    Metacritic: ${gameData.metacritic || "N/A"}
    Géneros: ${gameData.genres?.map((g) => g.name).join(", ") || "N/A"}
    Desarrolladores: ${
      gameData.developers?.map((d) => d.name).join(", ") || "N/A"
    }
    Fecha de lanzamiento: ${gameData.released || "N/A"}
    Descripción: ${gameData.description_raw?.substring(0, 500) || "N/A"}
    
    Devuelve un JSON con esta estructura:
    {
      "analysis": {
        "sentiment": "análisis de sentimiento",
        "difficulty": "nivel de dificultad",
        "replayability": "valor de rejugabilidad",
        "targetAudience": "audiencia objetivo"
      },
      "recommendations": [
        {
          "name": "tipo de recomendación",
          "games": ["juego1", "juego2"],
          "reason": "razón de la recomendación"
        }
      ],
      "tips": [
        "tip 1",
        "tip 2"
      ],
      "summary": {
        "pros": ["pro1", "pro2"],
        "cons": ["con1", "con2"],
        "verdict": "veredicto final"
      }
    }
    `;
  }

  static async simulateAIAnalysis(gameData) {
    // Simular delay de IA
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const rating = gameData.rating || 3.5;
    const genres = gameData.genres?.map((g) => g.name) || [];
    const isAction = genres.some((g) => g.toLowerCase().includes("action"));
    const isRPG = genres.some((g) => g.toLowerCase().includes("rpg"));
    const isStrategy = genres.some((g) => g.toLowerCase().includes("strategy"));

    return {
      analysis: {
        sentiment:
          rating > 4 ? "Muy positivo" : rating > 3 ? "Positivo" : "Neutral",
        difficulty:
          rating > 4.5
            ? "Fácil de aprender"
            : rating > 3.5
            ? "Moderado"
            : "Desafiante",
        replayability: rating > 4 ? "Alta" : rating > 3 ? "Moderada" : "Baja",
        targetAudience: isAction
          ? "Gamers casuales y hardcore"
          : isRPG
          ? "Gamers que disfrutan historias profundas"
          : isStrategy
          ? "Gamers estratégicos"
          : "Gamers casuales",
      },
      recommendations: [
        {
          name: "Juegos similares",
          games: this.getSimilarGames(genres),
          reason: "Basado en géneros y mecánicas similares",
        },
        {
          name: "Próximos lanzamientos",
          games: ["Upcoming Game 1", "Upcoming Game 2"],
          reason: "Del mismo desarrollador o género",
        },
      ],
      tips: this.generateTips(gameData),
      summary: {
        pros: this.generatePros(gameData),
        cons: this.generateCons(gameData),
        verdict:
          rating > 4
            ? "Altamente recomendado"
            : rating > 3
            ? "Recomendado"
            : "Recomendado con reservas",
      },
    };
  }

  static getSimilarGames(genres) {
    const gameSuggestions = {
      Action: ["Grand Theft Auto V", "Red Dead Redemption 2", "Cyberpunk 2077"],
      RPG: ["The Witcher 3", "Elden Ring", "Final Fantasy XVI"],
      Strategy: ["Civilization VI", "XCOM 2", "Total War: Warhammer"],
      Adventure: ["The Legend of Zelda", "God of War", "Horizon Zero Dawn"],
      Shooter: ["Call of Duty", "Battlefield", "Overwatch"],
    };

    const suggestions = [];
    genres.forEach((genre) => {
      const games = gameSuggestions[genre] || [];
      suggestions.push(...games.slice(0, 2));
    });

    return suggestions.length > 0
      ? suggestions
      : ["Game A", "Game B", "Game C"];
  }

  static generateTips(gameData) {
    const baseTips = [
      "Comienza con el tutorial para dominar las mecánicas básicas",
      "Explora todos los modos de juego para encontrar tu favorito",
      "Únete a la comunidad para consejos avanzados",
      "Experimenta con diferentes configuraciones gráficas",
    ];

    const genreTips = {
      Action: [
        "Mantén tu distancia en combates",
        "Aprende las combinaciones de ataques",
      ],
      RPG: [
        "Invierte tiempo en desarrollar tu personaje",
        "Explora cada rincón del mundo",
      ],
      Strategy: [
        "Planifica tus movimientos con anticipación",
        "Estudia las fortalezas y debilidades",
      ],
      Adventure: [
        "Habla con todos los NPCs",
        "Recolecta todos los objetos que encuentres",
      ],
    };

    const additionalTips = [];
    gameData.genres?.forEach((genre) => {
      const tips = genreTips[genre.name];
      if (tips) additionalTips.push(...tips);
    });

    return [...baseTips, ...additionalTips.slice(0, 2)];
  }

  static generatePros(gameData) {
    const pros = [];
    const rating = gameData.rating || 3.5;

    if (rating > 4) pros.push("Gráficos impresionantes", "Mecánicas fluidas");
    if (rating > 3.5)
      pros.push("Gran variedad de contenido", "Buen diseño de niveles");
    if (gameData.genres?.length > 1) pros.push("Múltiples géneros combinados");
    if (gameData.developers?.length > 0) pros.push("Desarrollador reconocido");

    return pros.length > 0
      ? pros
      : [
          "Gráficos impresionantes",
          "Mecánicas fluidas",
          "Gran variedad de contenido",
        ];
  }

  static generateCons(gameData) {
    const cons = [];
    const rating = gameData.rating || 3.5;

    if (rating < 4) cons.push("Curva de aprendizaje inicial");
    if (rating < 3.5) cons.push("Algunos bugs menores");
    if (!gameData.genres || gameData.genres.length === 0)
      cons.push("Género no definido claramente");

    return cons.length > 0
      ? cons
      : ["Curva de aprendizaje inicial", "Algunos bugs menores"];
  }

  static parseAIResponse(response) {
    // Parsear respuesta de IA si no es JSON válido
    try {
      const lines = response.split("\n");
      const analysis = {};
      const recommendations = [];
      const tips = [];
      const summary = { pros: [], cons: [] };

      lines.forEach((line) => {
        if (line.includes("sentiment"))
          analysis.sentiment = line.split(":")[1]?.trim();
        if (line.includes("difficulty"))
          analysis.difficulty = line.split(":")[1]?.trim();
        if (line.includes("replayability"))
          analysis.replayability = line.split(":")[1]?.trim();
        if (line.includes("targetAudience"))
          analysis.targetAudience = line.split(":")[1]?.trim();
        if (line.includes("tip")) tips.push(line.split(":")[1]?.trim());
        if (line.includes("pro")) summary.pros.push(line.split(":")[1]?.trim());
        if (line.includes("con")) summary.cons.push(line.split(":")[1]?.trim());
      });

      return { analysis, recommendations, tips, summary };
    } catch {
      return this.simulateAIAnalysis({});
    }
  }
}
