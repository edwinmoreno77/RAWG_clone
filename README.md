# �� RAWG clone

Una aplicación web moderna para explorar y descubrir videojuegos usando la API de RAWG. Incluye funcionalidades de IA para análisis inteligente de juegos.

## 🖼️ Capturas de pantalla
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/edwinmoreno77/_game_finder_page_/blob/main/src/assets/homePage.gif" width="1200"/>
</div>

## 🚀 Características

### **Funcionalidades Principales**
- **Exploración de juegos**: Navega por una lista de videojuegos populares
- **Búsqueda avanzada**: Busca juegos por nombre desde la barra de navegación
- **Filtros dinámicos**: Filtra por género, plataforma, desarrollador, etiquetas y año
- **Gestión de favoritos**: Agrega o elimina juegos de tu lista personal
- **Paginación**: Navega fácilmente entre páginas de resultados
- **Interfaz responsiva**: Optimizada para móviles y pantallas grandes

### **Funcionalidades de IA**
- **Análisis inteligente**: Análisis de sentimiento, dificultad y rejugabilidad
- **Recomendaciones personalizadas**: Juegos similares basados en géneros
- **Tips y trucos**: Consejos específicos por género del juego
- **Múltiples proveedores**: Soporte para OpenAI y DeepSeek
- **Fallback automático**: Cambio automático entre proveedores si uno falla

## 🛠️ Tecnologías

- **Frontend**: React 18, React Router, Tailwind CSS
- **Animaciones**: Framer Motion
- **Estado**: Zustand con persistencia
- **IA**: OpenAI GPT-3.5 y DeepSeek
- **APIs**: RAWG API para datos de juegos
- **Herramientas**: Vite, ESLint

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/edwinmoreno77/_game_finder_page_.git
cd _game_finder_page_
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
# RAWG API (obligatorio)
VITE_RAWG_API_KEY=tu_rawg_api_key

# OpenAI (opcional)
VITE_OPENAI_API_KEY=sk-tu_openai_api_key
VITE_OPENAI_ENDPOINT=https://api.openai.com/v1/chat/completions

# DeepSeek (opcional)
VITE_DEEPSEEK_API_KEY=sk-tu_deepseek_api_key
VITE_DEEPSEEK_ENDPOINT=https://api.deepseek.com/v1/chat/completions

# Selección de proveedor de IA (auto, openai, deepseek)
VITE_AI_PROVIDER=auto
```

### 4. Ejecutar el proyecto
```bash
pnpm run dev
```

Abre tu navegador en `http://localhost:5173`

## 🎯 Cómo usar la aplicación

### **Navegación Principal**
- **Home**: Lista de juegos populares con filtros
- **Favoritos**: Tus juegos guardados
- **Búsqueda**: Busca juegos específicos por nombre

### **Filtros Disponibles**
- **Género**: Action, RPG, Strategy, Adventure, etc.
- **Plataforma**: PC, PlayStation, Xbox, Nintendo
- **Desarrollador**: Filtra por estudio de desarrollo
- **Etiquetas**: Tags específicos del juego
- **Año**: Filtra por año de lanzamiento
- **Ordenamiento**: Por relevancia, rating, fecha, etc.

### **Funcionalidades de IA**
1. **Accede a un juego**: Haz clic en cualquier juego de la lista
2. **Sección AI Insights**: Encuentra la sección con análisis de IA
3. **Tabs disponibles**:
   - **Recommendations**: Juegos similares recomendados
   - **Tricks**: Tips y trucos específicos del género

### **Gestión de Favoritos**
- **Agregar**: Haz clic en el corazón en la página del juego
- **Ver favoritos**: Navega a la sección "Favoritos"
- **Eliminar**: Haz clic en el corazón nuevamente

## 🔧 Configuración de IA

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

### **Modos de Operación**

**Modo Auto (Recomendado)**
```env
VITE_AI_PROVIDER=auto
```
- Usa OpenAI primero, luego DeepSeek si falla
- Requiere configurar ambas API keys

**Modo Específico**
```env
VITE_AI_PROVIDER=openai  # Solo OpenAI
VITE_AI_PROVIDER=deepseek  # Solo DeepSeek
```

## 📁 Estructura del Proyecto

```
src/
├── api/              # Lógica de API (RAWG)
├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes de interfaz
│   ├── game/        # Componentes específicos de juegos
│   └── card/        # Tarjetas de juegos
├── pages/           # Páginas principales
├── services/        # Servicios (IA)
├── store/           # Estado global (Zustand)
├── hooks/           # Hooks personalizados
└── utils/           # Utilidades
```

## 🚨 Solución de Problemas

### **Error de API**
- Verifica que tu API key de RAWG esté correcta
- Asegúrate de que la cuenta esté verificada

### **IA no funciona**
- Verifica que al menos una API key de IA esté configurada
- Revisa que `VITE_AI_PROVIDER` esté configurado correctamente
- El sistema cambiará automáticamente entre proveedores si uno falla

### **Problemas de rendimiento**
- La aplicación usa lazy loading para optimizar la carga
- Los favoritos se guardan localmente
- Las imágenes se optimizan automáticamente

## 🌐 Despliegue

**Desplegado en**: 
```bash
https://rawg-clone-theta.vercel.app
```

## 📞 Contacto

- **Email**: edwinmoreno77@gmail.com
- **GitHub**: [edwinmoreno77](https://github.com/edwinmoreno77)
- **LinkedIn**: [edwinmoreno777](https://www.linkedin.com/in/edwinmoreno777/)

---

**¡Disfruta explorando y descubriendo nuevos videojuegos!** 🎮
