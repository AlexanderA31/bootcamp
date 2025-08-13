# Plataforma de Adopción de Mascotas

Esta es una aplicación web full-stack para un centro de adopción de mascotas. Permite a los usuarios navegar por las mascotas disponibles, ver detalles sobre ellas y enviar formularios de adopción. También incluye un panel de administración para gestionar los listados de mascotas y las solicitudes de adopción.

## Estructura del Proyecto

El proyecto es un monorepo con dos directorios principales:

```
pets/
├── Client/                     # Frontend - Aplicación React
│   ├── public/                 # Archivos públicos
│   │   ├── index.html         # Plantilla HTML principal
│   │   ├── favicon.ico        # Favicon del sitio
│   │   └── manifest.json      # Configuración PWA
│   ├── src/                   # Código fuente React
│   │   ├── components/        # Componentes reutilizables
│   │   │   ├── Header/        # Componente de encabezado
│   │   │   ├── Footer/        # Componente de pie de página
│   │   │   ├── PetCard/       # Tarjeta individual de mascota
│   │   │   ├── AdoptionForm/  # Formulario de adopción
│   │   │   └── AdminPanel/    # Panel de administración
│   │   ├── pages/             # Páginas principales
│   │   │   ├── Home/          # Página de inicio
│   │   │   ├── PetList/       # Lista de mascotas
│   │   │   ├── PetDetail/     # Detalles de mascota
│   │   │   ├── About/         # Página acerca de
│   │   │   └── Contact/       # Página de contacto
│   │   ├── styles/            # Archivos CSS
│   │   │   ├── global.css     # Estilos globales
│   │   │   ├── variables.css  # Variables CSS (colores, fuentes)
│   │   │   └── responsive.css # Media queries
│   │   ├── utils/             # Utilidades y helpers
│   │   │   ├── api.js         # Configuración de API
│   │   │   ├── constants.js   # Constantes de la aplicación
│   │   │   └── helpers.js     # Funciones auxiliares
│   │   ├── hooks/             # Custom hooks de React
│   │   ├── context/           # Context providers (tema, idioma)
│   │   ├── images/            # Recursos de imágenes
│   │   ├── App.js             # Componente raíz
│   │   ├── index.js           # Punto de entrada
│   │   └── App.css            # Estilos del componente App
│   ├── package.json           # Dependencias del frontend
│   └── README.md              # Documentación del cliente
│
├── server/                     # Backend - API Node.js
│   ├── models/                # Modelos de MongoDB
│   │   ├── Pet.js             # Modelo de mascota
│   │   ├── Adoption.js        # Modelo de adopción
│   │   └── User.js            # Modelo de usuario
│   ├── routes/                # Rutas de la API
│   │   ├── pets.js            # Endpoints de mascotas
│   │   ├── adoptions.js       # Endpoints de adopciones
│   │   └── users.js           # Endpoints de usuarios
│   ├── middleware/            # Middlewares personalizados
│   │   ├── auth.js            # Autenticación
│   │   ├── cors.js            # Configuración CORS
│   │   └── validation.js      # Validación de datos
│   ├── controllers/           # Lógica de controladores
│   │   ├── petController.js   # Controlador de mascotas
│   │   ├── adoptionController.js # Controlador de adopciones
│   │   └── userController.js  # Controlador de usuarios
│   ├── config/                # Configuraciones
│   │   ├── database.js        # Configuración de MongoDB
│   │   └── environment.js     # Variables de entorno
│   ├── uploads/               # Archivos subidos (imágenes)
│   ├── utils/                 # Utilidades del servidor
│   │   ├── imageUpload.js     # Manejo de subida de imágenes
│   │   └── emailService.js    # Servicio de emails
│   ├── server.js              # Archivo principal del servidor
│   ├── package.json           # Dependencias del backend
│   ├── .env                   # Variables de entorno (no incluido en git)
│   └── .env.example           # Ejemplo de variables de entorno
│
├── .gitignore                 # Archivos ignorados por git
├── README.md                  # Documentación principal
└── LICENSE                    # Licencia del proyecto
```

### Descripción de Directorios Principales:

-   **`Client/`**: Frontend construido con React que maneja la interfaz de usuario
-   **`server/`**: Backend construido con Node.js, Express y MongoDB que maneja la lógica del servidor y la base de datos

## Instalación y Configuración

Para ejecutar la aplicación en tu máquina local, sigue estos pasos.

### Prerequisitos

-   Node.js y npm instalados en tu máquina.
-   Una base de datos MongoDB (puedes usar una instancia local o un servicio en la nube como MongoDB Atlas).

### Configuración del Backend

1.  **Navega al directorio del servidor:**
    ```bash
    cd server
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Crea un archivo `.env`:**
    Crea un archivo llamado `.env` en el directorio `server` y agrega tu cadena de conexión de MongoDB:
    ```
    mongooseURL=tu_cadena_de_conexion_mongodb
    ```

4.  **Inicia el servidor:**
    Hemos agregado un script de conveniencia para ejecutar el servidor con `nodemon`.
    ```bash
    npx nodemon server  
    ```

### Configuración del Frontend

1.  **Navega al directorio del cliente:**
    ```bash
    cd Client
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo de React:**
    ```bash
    npm start
    ```
    La aplicación se abrirá en tu navegador en `http://localhost:3000`.

## Características

- **Navegación de Mascotas**: Los usuarios pueden explorar mascotas disponibles para adopción
- **Detalles de Mascotas**: Información detallada sobre cada mascota
- **Formularios de Adopción**: Sistema para enviar solicitudes de adopción
- **Panel de Administración**: Gestión de listados de mascotas y solicitudes
- **Diseño Responsivo**: Interfaz optimizada para dispositivos móviles y desktop
- **Modo Oscuro**: Alternancia entre temas claro y oscuro

## Tecnologías Utilizadas

### Frontend
- React.js
- React Router
- CSS3
- Diseño responsivo

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

