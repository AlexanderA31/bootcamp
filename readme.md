# 🐾 AdopMe - Plataforma de Adopción de Mascotas

Una aplicación web full-stack con chatbot inteligente para la gestión integral de mascotas y procesos de adopción. Facilita la conexión entre mascotas que necesitan un hogar y familias dispuestas a adoptar.

<div align="center">

[![Vercel Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://adopmebootcamp.vercel.app)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com)
[![React](https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js)](https://nodejs.org)

**[🌐 Ver Demo en Vivo](https://adopmebootcamp.vercel.app)** | **[📱 Repositorio](https://github.com/AlexanderA31/bootcamp)**

</div>

---

## 📋 Tabla de Contenidos

- [🎯 Características Principales](#-características-principales)
- [🖼️ Capturas de Pantalla](#️-capturas-de-pantalla)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [⚡ Instalación y Configuración](#-instalación-y-configuración)
- [🚀 Despliegue](#-despliegue)
- [🔧 Variables de Entorno](#-variables-de-entorno)
- [🤝 Contribuir](#-contribuir)
- [👥 Autores](#-autores)
- [📄 Licencia](#-licencia)

---

## 🎯 Características Principales

### 🏠 **Para Usuarios**
- 🔍 **Exploración de Mascotas**: Navega por mascotas disponibles con filtros avanzados
- 📱 **Diseño Responsivo**: Interfaz optimizada para móviles y desktop
- 🌙 **Modo Oscuro/Claro**: Alternancia entre temas según preferencia del usuario
- 📝 **Formularios de Adopción**: Sistema intuitivo para solicitar adopciones
- 🎁 **Dar en Adopción**: Formulario para usuarios que desean dar sus mascotas en adopción
- 🤖 **Chatbot Inteligente**: Asistente virtual que guía en el proceso de adopción

### 🛡️ **Para Administradores**
- 📊 **Panel de Control**: Gestión completa de mascotas y solicitudes
- ✅ **Aprobación de Publicaciones**: Control de mascotas publicadas por usuarios
- 📋 **Gestión de Adopciones**: Seguimiento de todas las solicitudes de adopción
- 🗑️ **Administración de Contenido**: Eliminar y editar listados de mascotas

### 🔒 **Características Técnicas**
- 🖼️ **Gestión de Imágenes**: Integración con Cloudinary para almacenamiento
- ⚡ **Rendimiento Optimizado**: Carga lazy de imágenes y componentes
- 🛡️ **Validación Robusta**: Validación tanto en frontend como backend
- 🌐 **API RESTful**: Backend estructurado y escalable

---

## 🖼️ Capturas de Pantalla

### 🏠 Interfaz Principal
![Interfaz Principal](https://github.com/user-attachments/assets/72028752-693b-4bf2-aeb1-130273d85431)

### 📱 Características Destacadas
- **Modo Claro/Oscuro**: Interfaz adaptable a preferencias del usuario
- **Catálogo de Mascotas**: Vista de mascotas disponibles con información detallada
- **Formulario de Adopción**: Proceso simple y guiado para adoptar
- **Chatbot Asistente**: Ayuda personalizada durante el proceso
- **Panel Administrativo**: Gestión completa del sistema

---

## 🛠️ Tecnologías Utilizadas

### 🎨 **Frontend**
- **React.js** - Biblioteca principal para UI
- **React Router** - Navegación y enrutamiento
- **Context API** - Gestión de estado global
- **CSS3** - Estilos con diseño responsivo

### ⚙️ **Backend**
- **Node.js** - Entorno de ejecución del servidor
- **Express.js** - Framework para API RESTful
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación mediante tokens
- **Multer** - Manejo de archivos e imágenes

### 🗃️ **Base de Datos**
- **MongoDB Atlas** - Base de datos NoSQL en la nube
- **Mongoose** - Modelado y validaciones de datos

### ☁️ **Servicios en la Nube**
- **Vercel** - Despliegue del frontend
- **Render** - Despliegue del backend
- **Cloudinary** - Almacenamiento de imágenes
- **Gemini API** - Chatbot inteligente

---

## 🏗️ Estructura del Proyecto

```
pets/
├── Client/                     # 🎨 Frontend - Aplicación React
│   ├── public/                 # Archivos públicos
│   │   ├── index.html         # Plantilla HTML principal
│   │   ├── favicon.ico        # Favicon del sitio
│   │   └── manifest.json      # Configuración PWA
│   ├── src/                   # 💻 Código fuente React
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Header/        # Componente de encabezado
│   │   │   ├── Footer/        # Componente de pie de página
│   │   │   ├── PetCard/       # Tarjeta individual de mascota
│   │   │   ├── AdoptionForm/  # Formulario de adopción
│   │   │   └── AdminPanel/    # Panel de administración
│   │   ├── pages/             # 📄 Páginas principales
│   │   │   ├── Home/          # Página de inicio
│   │   │   ├── PetList/       # Lista de mascotas
│   │   │   ├── PetDetail/     # Detalles de mascota
│   │   │   ├── About/         # Página acerca de
│   │   │   └── Contact/       # Página de contacto
│   │   ├── styles/            # 🎨 Archivos CSS
│   │   ├── utils/             # 🛠️ Utilidades y helpers
│   │   ├── hooks/             # ⚛️ Custom hooks de React
│   │   └── context/           # 🌐 Context providers
│   └── package.json           # Dependencias del frontend
│
├── server/                     # ⚙️ Backend - API Node.js
│   ├── models/                # 🗂️ Modelos de MongoDB
│   │   ├── Pet.js             # Modelo de mascota
│   │   ├── Adoption.js        # Modelo de adopción
│   │   └── User.js            # Modelo de usuario
│   ├── routes/                # 🛤️ Rutas de la API
│   │   ├── pets.js            # Endpoints de mascotas
│   │   ├── adoptions.js       # Endpoints de adopciones
│   │   └── users.js           # Endpoints de usuarios
│   ├── middleware/            # 🛡️ Middlewares personalizados
│   ├── controllers/           # 🎮 Lógica de controladores
│   ├── config/                # ⚙️ Configuraciones
│   └── utils/                 # 🛠️ Utilidades del servidor
└── README.md                  # 📖 Documentación principal
```

---

## ⚡ Instalación y Configuración

### 📋 **Prerequisitos**
- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **MongoDB Atlas** o instancia local de MongoDB
- **Git** para clonar el repositorio

### 🚀 **Pasos de Instalación**

#### 1️⃣ **Clonar el Repositorio**
```bash
git clone https://github.com/AlexanderA31/bootcamp.git
cd bootcamp
```

#### 2️⃣ **Configuración del Backend**
```bash
# Navegar al directorio del servidor
cd server

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Iniciar el servidor de desarrollo
npm run dev
# o
npx nodemon server
```

#### 3️⃣ **Configuración del Frontend**
```bash
# Navegar al directorio del cliente (en otra terminal)
cd Client

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
# Crear .env con las configuraciones necesarias

# Iniciar el servidor de desarrollo
npm start
```

La aplicación estará disponible en:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:4000`

---

## 🚀 Despliegue

### 🌐 **Despliegue en Producción**

El proyecto está configurado para despliegue en:

#### **Frontend (Vercel)**
1. Conectar repositorio con Vercel
2. Configurar build command: `npm run build`
3. Establecer output directory: `build`
4. Configurar variables de entorno

#### **Backend (Render)**
1. Crear Web Service en Render
2. Comando de inicio: `node server.js`
3. Configurar variables de entorno
4. Establecer versión Node.js (18.x)

#### **Base de Datos (MongoDB Atlas)**
1. Crear cluster en MongoDB Atlas
2. Configurar IP whitelisting
3. Establecer usuarios con permisos

---

## 🔧 Variables de Entorno

### 🖥️ **Backend (.env)**
```env
# Base de datos
mongooseURL=tu_cadena_de_conexion_mongodb

# Cloudinary para imágenes
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

```

### 🎨 **Frontend (.env)**
```env
# API del backend
REACT_APP_API_URL=http://localhost:4000

# Gemini API para chatbot
REACT_APP_GEMINI_API_URL=tu_gemini_api_url
```

### 📏 **Estándares de Código**
- Usar ESLint y Prettier para formateo
- Seguir convenciones de nomenclatura establecidas
- Incluir pruebas para nuevas funcionalidades
- Documentar cambios significativos

---

## 👥 Autores

Este proyecto fue desarrollado por un talentoso equipo de desarrolladores:

| Desarrollador | Rol | 
|---------------|-----|
| **Alexander Ufredo Alegria Chavez** | Full Stack Developer | 
| **Moises Fernando Alvarez Orellana** | Frontend Developer | 
| **Ivan De Jesus Vera Yagual** | Backend Developer | 
| **Angel Abisai Lezama Gutierrez** | DevOps & Database | 

---

## 🛡️ Seguridad

- 🔐 **Autenticación JWT** con expiración configurable
- 🛡️ **Validación y sanitización** de datos
- 🚦 **Rate limiting** para endpoints críticos  
- 🔒 **Hash de contraseñas** con bcrypt
- 🌐 **Configuración CORS** para dominios permitidos

---

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Crea un [Issue](https://github.com/AlexanderA31/bootcamp/issues)
- 🌐 Visita la [aplicación en vivo](https://adopmebootcamp.vercel.app)
- 📖 Revisa la documentación completa

---

<div align="center">

### 🐾 **¡Ayudemos a las mascotas a encontrar su hogar perfecto!** 🏠

**[🚀 Ver Demo](https://adopmebootcamp.vercel.app)** • **[⭐ Dar Estrella](https://github.com/AlexanderA31/bootcamp)** • **[🐛 Reportar Bug](https://github.com/AlexanderA31/bootcamp/issues)**

---

*Desarrollado con ❤️ para el Bootcamp, ojala ganemos ;c*

</div>

