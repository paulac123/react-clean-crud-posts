# Aplicación de Posts en React + TypeScript + MUI

## 📖 **Descripción**

Aplicación web frontend desarrollada con React, que consume la API pública JSONPlaceholder
para listar, crear, actualizar y eliminar posts.

### Incluye:

- Listado paginado de posts en un Data Table.
- Formularios para crear y actualizar posts usando React Hook Form.
- Botones para editar y eliminar cada post.
- Ventanas de notificación modal para operaciones realizadas.
- Uso de React Hooks, React Router, Axios y Material UI.

La aplicación sigue buenas prácticas de desarrollo, separación por componentes y manejo de estado con Context API.

---

## ⚙️ **Tecnologías utilizadas**

- React + Hooks
- TypeScript
- React Router
- React Hook Form
- Axios
- Material UI (MUI)
- Jest + React Testing Library (para pruebas unitarias)

---

## 📋 **Instalación y ejecución**

```bash
# Clonar el repositorio
git clone <URL-DEL-REPO>

# Entrar a la carpeta del proyecto
cd react-clean-crud-posts

# Instalar dependencias
npm install

# Iniciar la app en modo desarrollo
npm start

**La aplicación se ejecutará en:**
👉 http://localhost:5173
```

---

## 🚀 **Uso**

- Listado de posts: la aplicación muestra los posts paginados al iniciar.
- Crear post: llenar el formulario y hacer click en "Crear Post".
- Editar post: hacer click en el botón "Editar", modificar los campos y guardar.
- Eliminar post: hacer click en el botón "Eliminar".
- Notificaciones: toda acción exitosa muestra un modal de confirmación.
  ***

## 🧪 **Testing**

```bash
**Para ejecutar los tests unitarios:**

npm run test
```

Los tests fueron creados con React Testing Library y Jest, validando las funciones principales del
formulario y las acciones de los botones (crear, editar y eliminar).

---

## 🧱 **Estructura del proyecto**

```bash

src/
 ├─ components/       # Componentes de UI (PostForm, DataTable, botones, etc.)
 ├─ context/          # Contexto global para manejo de estado (PostContext)
 ├─ services/         # Funciones Axios para consumo de API
 ├─ __tests__/        # Pruebas unitarias
 ├─ App.tsx           # Componente raíz y configuración de rutas
 └─ main.tsx          # Punto de entrada principal
```

---

## 🧭 **Buenas prácticas aplicadas**

- Separación de responsabilidades por componentes.
- Uso de React Hook Form para validación y manejo de formularios.
- Manejo de estado global con Context API.
- Tipado con TypeScript para mejorar la mantenibilidad.
- Implementación de test unitarios para asegurar la funcionalidad de los formularios.
  ***

## 🧑‍💻 **Autor**

### **Paula Cruz**

Desarrolladora Fullstack

🌐 GitHub: https://github.com/paulac123
