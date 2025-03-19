# 🎮 RAWG Game Finder

RAWG Game Finder es una aplicación web moderna y dinámica que permite a los usuarios explorar, buscar y gestionar una lista de videojuegos utilizando la API de RAWG. Con una interfaz intuitiva y responsiva, los usuarios pueden filtrar juegos por género, plataforma, desarrollador, etiquetas, y más. Además, pueden agregar juegos a su lista de favoritos para un acceso rápido.

# 🖼️ Capturas de pantalla
<div style="display: flex; justify-content: center; gap: 10px;">
  <img src="https://github.com/edwinmoreno77/page-games/blob/main/src/assets/rawg_desktop.webp" width="600"/>
  <img src="https://github.com/edwinmoreno77/page-games/blob/main/src/assets/rawg_mobile.webp" width="150"/>
</div>

## 🚀 Características

- **Exploración de videojuegos**: Navega por una lista de videojuegos populares con detalles como nombre, calificación y fecha de lanzamiento.
- **Búsqueda avanzada**: Busca juegos por nombre utilizando un campo de búsqueda en el `Navbar`.
- **Filtros dinámicos**: Filtra juegos por género, plataforma, desarrollador, etiquetas y año de lanzamiento desde el `Sidebar`.
- **Gestión de favoritos**: Agrega o elimina juegos de tu lista de favoritos con un solo clic.
- **Interfaz responsiva**: Optimizada para dispositivos móviles y pantallas grandes.
- **Cierre automático del Sidebar**: El `Sidebar` se cierra automáticamente al hacer clic fuera de él o al aplicar filtros.
- **Paginación**: Navega fácilmente entre páginas de resultados.

---

## 🛠️ Tecnologías utilizadas

- **Frontend**:
  - [React](https://reactjs.org/) (v18.3.1)
  - [React Router](https://reactrouter.com/) (v7.3.0)
  - [Tailwind CSS](https://tailwindcss.com/) (v3.4.10)
  - [FontAwesome](https://fontawesome.com/) para íconos
- **Gestión de estado**:
  - Context API con un patrón Flux personalizado
- **Backend**:
  - [RAWG API](https://rawg.io/apidocs) para datos de videojuegos
- **Herramientas de desarrollo**:
  - [Vite](https://vitejs.dev/) para un entorno de desarrollo rápido
  - [ESLint](https://eslint.org/) para mantener un código limpio y consistente

---

## 📂 Estructura del proyecto

```plaintext
rawg/
├── public/                # Archivos públicos
├── src/
│   ├── api/               # Lógica para consumir la API de RAWG
│   ├── components/        # Componentes reutilizables (Navbar, Sidebar, Card, etc.)
│   ├── store/             # Gestión de estado global con Flux
│   ├── views/             # Vistas principales (PageList, Favorites, Search, Game)
│   ├── App.jsx            # Componente principal de la aplicación
│   ├── [main.jsx](http://_vscodecontentref_/1)           # Punto de entrada de la aplicación
│   ├── [App.css](http://_vscodecontentref_/2)            # Estilos globales
│   └── [tailwind.config.js](http://_vscodecontentref_/3) # Configuración de Tailwind CSS
├── [package.json](http://_vscodecontentref_/4)           # Dependencias y scripts del proyecto
└── [README.md](http://_vscodecontentref_/5)              # Documentación del proyecto
```


## ⚙️ Instalación y configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. Clonar el repositorio

```
git clone https://github.com/tu-usuario/rawg-game-finder.git
cd rawg-game-finder
```

2. Instalar dependencias
Asegúrate de tener Node.js y pnpm instalados en tu sistema. Luego, ejecuta:
```
pnpm install
```

3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto y agrega tu clave de la API de RAWG:

```
VITE_RAWG_API_KEY=tu_clave_de_api
```

4. Ejecutar el proyecto

```
pnpm dev
```

Abre tu navegador y navega a http://localhost:5173.


### 🌐 API utilizada
Este proyecto utiliza la RAWG API para obtener datos de videojuegos. Asegúrate de registrar una cuenta y obtener una clave de API para usarla en el proyecto.


📧 Contacto
Si tienes preguntas o sugerencias, no dudes en contactarme:

- Email: edwinmoreno77@gamail.com
- GitHub: [edwinmoreno77](https://github.com/edwinmoreno77)
- LinkedIn: [edwinmroeno777](https://www.linkedin.com/in/edwinmoreno777/)