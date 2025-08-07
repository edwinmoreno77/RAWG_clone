# 🤖 Funcionalidades de IA - Game Finder

## 🎯 **Qué hace la IA**

La aplicación incluye análisis inteligente de videojuegos que proporciona:

- **Recomendaciones personalizadas**: Juegos similares basados en géneros
- **Tips y trucos**: Consejos específicos por tipo de juego
- **Análisis de sentimiento**: Evaluación del juego
- **Análisis de dificultad**: Nivel de complejidad y rejugabilidad

## 🚀 **Cómo usar las funcionalidades de IA**

### **1. Acceder al análisis**
1. Ve a cualquier juego en la aplicación
2. Desplázate hacia abajo hasta encontrar la sección "AI Insights"
3. La IA analizará automáticamente el juego

### **2. Tabs disponibles**
- **Recommendations**: Juegos similares recomendados
- **Tricks**: Tips y trucos específicos del género

## ⚙️ **Configuración**

### **Variables de entorno necesarias**
```env
# RAWG API (obligatorio)
VITE_RAWG_API_KEY=tu_rawg_api_key

# OpenAI (opcional)
VITE_OPENAI_API_KEY=sk-tu_openai_api_key

# DeepSeek (opcional)
VITE_DEEPSEEK_API_KEY=sk-tu_deepseek_api_key

# Selección de proveedor (auto, openai, deepseek)
VITE_AI_PROVIDER=auto
```

### **Obtener API Keys**

**RAWG API (Obligatorio)**
1. Ve a [RAWG](https://rawg.io/apidocs)
2. Regístrate y obtén tu API key

**OpenAI (Opcional)**
1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Crea una cuenta y obtén tu API key

**DeepSeek (Opcional)**
1. Ve a [DeepSeek Platform](https://platform.deepseek.com/)
2. Regístrate y obtén tu API key

## 🔧 **Modos de operación**

### **Modo Auto (Recomendado)**
```env
VITE_AI_PROVIDER=auto
```
- Usa OpenAI primero, luego DeepSeek si falla
- Requiere configurar ambas API keys

### **Modo Específico**
```env
VITE_AI_PROVIDER=openai  # Solo OpenAI
VITE_AI_PROVIDER=deepseek  # Solo DeepSeek
```

## 🚨 **Solución de problemas**

### **IA no funciona**
- Verifica que al menos una API key de IA esté configurada
- Revisa que `VITE_AI_PROVIDER` esté configurado correctamente
- El sistema cambiará automáticamente entre proveedores si uno falla

### **Error 401 (Unauthorized)**
- Verifica que la API key esté correcta
- Asegúrate de que la cuenta esté verificada

### **Error 429 (Too Many Requests)**
- El sistema automáticamente cambiará al otro proveedor
- Espera unos minutos antes de hacer más peticiones

## 💰 **Costos estimados**

- **OpenAI GPT-3.5**: ~$0.002 por análisis
- **DeepSeek**: ~$0.0001 por análisis
- **1000 análisis/mes**: ~$0.10-2.00 USD

## 🔗 **Enlaces útiles**

- [Plataforma DeepSeek](https://platform.deepseek.com/)
- [OpenAI Platform](https://platform.openai.com/)
- [RAWG API](https://rawg.io/apidocs)

---

**¡La IA está lista para mejorar tu experiencia de descubrimiento de juegos!** 🚀 