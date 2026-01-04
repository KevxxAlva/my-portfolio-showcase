# My Portfolio

Un portafolio moderno y profesional diseñado para mostrar mis proyectos, habilidades y experiencia como desarrollador. Construido con las últimas tecnologías web para ofrecer una experiencia de usuario fluida, interactiva y visualmente atractiva.

<img width="1349" height="638" alt="image" src="https://github.com/user-attachments/assets/b9537606-8cd1-42a1-ab55-98226c849d2e" />


## 🚀 Características

- **Panel de Administración Completo**: Interfaz segura (`/admin`) para gestionar Proyectos, Testimonios y Mensajes de contacto.
- **Multilenguaje (i18n)**: Soporte completo para Español e Inglés con cambio dinámico.
- **Sección de Testimonios**: Visualización dinámica de reseñas con efectos Parallax, gestionable desde el admin.
- **Bandeja de Mensajes**: Visualización y gestión de mensajes de contacto recibidos directamente en la plataforma.
- **Diseño Responsivo**: Adaptado perfectamente a dispositivos móviles, tablets y escritorio.
- **Modo Oscuro/Claro**: Soporte nativo para cambio de tema.
- **Animaciones Avanzadas**: Efectos Parallax, scroll suave y transiciones fluidas con `framer-motion`.
- **Gestión de Contenido**: Integración con Supabase para CRUD de proyectos y testimonios.
- **Formulario de Contacto**: Funcionalidad de correo electrónico (EmailJS) + respaldo en base de datos.
- **Componentes Modernos**: UI limpia y consistente con Shadcn/UI.

## 🛠️ Tecnologías Utilizadas

### Frontend

- **[React](https://react.dev/)**: Biblioteca principal para la construcción de interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático.
- **[Vite](https://vitejs.dev/)**: Herramienta de construcción rápida y servidor de desarrollo.
- **[Framer Motion](https://www.framer.com/motion/)**: Biblioteca potente para animaciones y gestos.

### Estilos & UI

- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS de utilidad primero.
- **[Shadcn/UI](https://ui.shadcn.com/)**: Colección de componentes reutilizables.
- **[Lucide React](https://lucide.dev/)**: Iconos vectoriales ligeros y personalizables.

### Backend & Servicios

- **[Supabase](https://supabase.com/)**: Backend as a Service (BaaS) para base de datos (PostgreSQL), autenticación y almacenamiento.
- **[EmailJS](https://www.emailjs.com/)**: Servicio para envío de correos electrónicos desde el cliente.

### Otras Herramientas

- **Context API**: Manejo de estado global (Idiomas, Autenticación).
- **React Router DOM**: Manejo de rutas y navegación protegida.
- **Date-fns**: Manipulación y formateo de fechas.
- **React Hook Form**: Manejo eficiente de formularios.

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
├── components/      # Componentes de UI y Secciones
│   ├── admin/       # Componentes específicos del panel de administración
│   ├── ui/          # Componentes base (Botones, Inputs, Cards)
│   └── ...          # Secciones (Hero, Proyectos, Contacto, etc.)
├── contexts/        # Contextos de React (Lenguaje, Temas)
├── data/            # Tipos de datos y definiciones TypeScript
├── hooks/           # Custom Hooks (Lógica de negocio y conexión a DB)
├── integrations/    # Cliente de Supabase y configuraciones externas
├── pages/           # Rutas principales (Index, Admin, Login)
├── lib/             # Utilidades (cn, formats)
└── index.css        # Estilos globales y configuración de Tailwind
```

## 🗄️ Esquema de Base de Datos (Supabase)

El proyecto utiliza las siguientes tablas en PostgreSQL:

- **`projects`**: Almacena los proyectos del portafolio (título, descripción, tags, enlaces, imágenes).
- **`testimonials`**: Guarda las reseñas de clientes o colegas (nombre, rol, texto).
- **`contact_messages`**: Registra los mensajes enviados desde el formulario de contacto.

> **Nota**: Todas las tablas están protegidas con políticas _Row Level Security (RLS)_ para asegurar que solo el administrador pueda editar la información.

## 🚀 Despliegue

Este proyecto está optimizado para ser desplegado en **Vercel** o **Netlify**.

1. Haz fork de este repositorio.
2. Importa el proyecto en tu plataforma de hosting preferida.
3. Configura las **Variables de Entorno** (mencionadas arriba) en el panel de configuración del hosting.
4. ¡Listo! Tu portafolio se actualizará automáticamente con cada push.

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE). Siéntete libre de usarlo como inspiración o plantilla para tu propio portafolio.
