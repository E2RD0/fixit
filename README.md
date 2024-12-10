# _Fixit_ Sistema de Gestión de Incidencias

Este es un sistema de gestión de incidencias que permite a los usuarios registrar y gestionar problemas/incidencias dentro de una organización. Incluye funcionalidades clave como:

- _Autenticación_:
  - Registro de usuarios.
  - Inicio de sesión con manejo de sesiones.
- _Gestión de Incidencias_:
  - Crear incidencias.
  - Listar incidencias asociadas a los usuarios.
  - Asignar responsables a cada incidencia.
  - Buscar una incidencia.

---

## _Índice_

1. [Arquitectura General](#arquitectura-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
   - [Frontend](#frontend)
   - [Backend](#backend)
3. [Instalación](#instalación)
4. [Uso del Proyecto](#uso-del-proyecto)

---

## _Arquitectura General_

El sistema está dividido en dos partes principales: _Frontend_ y _Backend_.

- _Frontend_:

  - Construido con _ReactJS_ y _Vite_.
  - Escribe en _TypeScript_ para tipado estático y mejor mantenibilidad.
  - Proporciona una interfaz de usuario para la gestión de incidencias.

- _Backend_:
  - Construido con _Node.js, \*\*Express.js_ y _TypeScript_.
  - Utiliza _MongoDB_ como base de datos para almacenar usuarios e incidencias.
  - Implementa una API REST para la comunicación con el frontend.

## _Diagrama de casos de uso_:

![image](/docs/cdu.jpg)

## _Diagrama de arquitectura_:

![image](/docs/arquitectura.jpg)

## _Estructura del Proyecto_

### _Frontend_

El frontend es responsable de la interfaz gráfica que interactúa con el usuario. Está organizado de la siguiente manera:

![image](/docs/estructura_front.jpg)

#### Principales Funcionalidades:

1. _Autenticación_:
   - SignIn.tsx para iniciar sesión.
   - SignUp.tsx para registrar nuevos usuarios.
2. _Gestión de Incidencias_:
   - Dashboard.tsx para listar y gestionar incidencias.
3. _Protección de Rutas_:
   - PrivateRoute.tsx asegura que solo usuarios autenticados accedan a rutas protegidas.

---

### _Diagrama del frontend_

![image](/docs/frontend.jpg)

### _Backend_

El backend es responsable de procesar las solicitudes, manejar la lógica de negocio y comunicarse con la base de datos. Su estructura es:

![image](/docs/estructura_back.jpg)

#### Principales Funcionalidades:

1. _Gestión de Usuarios_:
   - Crear, actualizar, y eliminar usuarios.
2. _Gestión de Incidencias_:
   - Crear, listar, buscar y asignar incidencias.
   - Enlaces a usuarios a través de reportedBy y assignedTo.
3. _Seguridad_:
   - Manejo de sesiones y autenticación con middleware.

---

### _Diagrama del Back_

![image](/docs/backend.jpg)

### _Diagrama de la base de datos:_

![image](/docs/bd.jpg)

## _Instalación_

### _Requisitos Previos_

- _Node.js_ (v14 o superior)
- _npm_ o _yarn_
- _MongoDB_ (local o en la nube)

### _Clonar el Repositorio_

git clone "link"
cd FIXIT-MAIN

### _Instalación del Backend_

1. Ve a la carpeta del backend:
   cd backend
2. Instala las dependencias:
   npm install
3. Configura las variables de entorno:

   - Crea un archivo .env basado en .env.example.
   - Configura el URI de MongoDB y otras variables.

4. Inicia el servidor:
   npm run dev

### _Instalación del Frontend_

1. Ve a la carpeta del frontend:
   bash
   cd frontend

2. Instala las dependencias:
   bash
   npm install
3. Inicia el servidor:
   bash
   npm run dev

---

## _Uso del Proyecto_

### _Acceso_

1. Ve al navegador y accede a:
   - Frontend: `http://localhost...:
   - Backend: http://localhost:4000

### _Flujo de Trabajo_

1. _Registro_:
   - Ve a la página de registro y crea una cuenta.
2. _Iniciar Sesión_:
   - Accede con tus credenciales para visualizar el tablero.
3. _Crear Incidencias_:
   - Crea nuevas incidencias desde el dashboard.
4. _Asignar Responsable_:
   - Asigna usuarios a las incidencias según sea necesario.

---
