# My Portfolio Showcase

Un portafolio moderno y profesional diseñado para mostrar mis proyectos, habilidades y experiencia como desarrollador. Construido con las últimas tecnologías web para ofrecer una experiencia de usuario fluida, interactiva y visualmente atractiva.

<img width="1349" height="638" alt="image" src="https://github.com/user-attachments/assets/9e195451-57d8-475e-9d4e-ec2265af45b2" />


## 🚀 Características

- **Diseño Responsivo**: Adaptado perfectamente a dispositivos móviles, tablets y escritorio.
- **Modo Oscuro/Claro**: Soporte nativo para cambio de tema utilizando `next-themes`.
- **Animaciones Suaves**: Transiciones y efectos visuales impulsados por `framer-motion`.
- **Gestión de Proyectos**: Integración con Supabase para cargar y gestionar proyectos dinámicamente.
- **Formulario de Contacto**: Funcionalidad de correo electrónico integrada mediante EmailJS.
- **Componentes de UI Modernos**: Utilizando la biblioteca Shadcn/UI para una estética limpia y consistente.

## 🛠️ Tecnologías Utilizadas

### Frontend

- **[React](https://react.dev/)**: Biblioteca principal para la construcción de interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático.
- **[Vite](https://vitejs.dev/)**: Herramienta de construcción rápida y servidor de desarrollo.

### Estilos & UI

- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS de utilidad primero.
- **[Shadcn/UI](https://ui.shadcn.com/)**: Colección de componentes reutilizables.
- **[Lucide React](https://lucide.dev/)**: Iconos vectoriales ligeros y personalizables.

### Backend & Servicios

- **[Supabase](https://supabase.com/)**: Backend as a Service (BaaS) para base de datos y autenticación.
- **[EmailJS](https://www.emailjs.com/)**: Servicio para envío de correos electrónicos directamente desde el cliente.

### Otras Herramientas

- **React Router DOM**: Manejo de rutas y navegación.
- **React Hook Form & Zod**: Manejo y validación de formularios.
- **TanStack Query**: Gestión del estado del servidor y fetching de datos.

## 🏁 Comenzando

Sigue estos pasos para configurar el proyecto localmente.

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd my-portfolio-showcase
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables con tus propias credenciales:

```env
# Configuración de Supabase
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase

# Configuración de EmailJS
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:8080` (o el puerto que Vite asigne).

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run preview`: Vista previa local de la build de producción.
- `npm run lint`: Ejecuta el linter para encontrar errores en el código.

## 📂 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables (UI, Secciones, etc.)
├── hooks/          # Hooks personalizados
├── integrations/   # Configuraciones de servicios externos (Supabase, etc.)
├── pages/          # Vistas principales de la aplicación
├── lib/            # Utilidades y configuraciones de bibliotecas
└── index.css       # Estilos globales y configuración de Tailwind
```

## 📄 Licencia

Este proyecto es de uso personal y demostrativo.
