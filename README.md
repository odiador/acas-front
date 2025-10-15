# ACAS Frontend - Sistema de Gestión Educativa# Amador & Calderón Academic Services



Sistema de gestión educativa construido con **Next.js 15**, **shadcn/ui**, **next-intl** para internacionalización, y **Zustand** para gestión de estado.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



## 🚀 Características## Getting Started



- ✅ **Next.js 15** con App RouterFirst, run the development server:

- ✅ **shadcn/ui** - Componentes UI modernos y accesibles

- ✅ **next-intl** - Internacionalización (ES/EN)```bash

- ✅ **Zustand** - Gestión de estadonpm run dev

- ✅ **JWT Authentication** - Autenticación segura con cookies HTTP-only# or

- ✅ **Role-based Access Control** - Control de permisos por rol (Estudiante, Profesor, Administrador)yarn dev

- ✅ **TypeScript** - Type safety completo# or

- ✅ **Tailwind CSS** - Estilos modernos y responsivepnpm dev

- ✅ **Theme Support** - Modo claro/oscuro# or

bun dev

## 📁 Estructura del Proyecto```



```Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

acas-front/

├── app/You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

│   └── [locale]/              # Rutas con i18n

│       ├── auth/              # AutenticaciónThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

│       │   └── login/

│       ├── dashboard/         # Dashboard principal## Learn More

│       │   ├── students/      # Gestión de estudiantes

│       │   ├── courses/       # Gestión de cursosTo learn more about Next.js, take a look at the following resources:

│       │   ├── users/         # Gestión de usuarios

│       │   ├── profile/       # Perfil de usuario- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

│       │   └── reports/       # Reportes- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

│       └── unauthorized/      # Página de acceso denegado

├── components/You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

│   ├── ui/                    # Componentes shadcn/ui

│   └── layout/                # Componentes de layout## Deploy on Vercel

│       ├── sidebar.tsx

│       ├── navbar.tsxThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

│       ├── locale-switcher.tsx

│       └── theme-toggle.tsxCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

├── hooks/                     # React hooks personalizados
│   ├── use-auth.ts
│   ├── use-permissions.ts
│   └── use-role.ts
├── lib/                       # Utilidades
│   ├── auth.ts               # Funciones de autenticación
│   ├── permissions.ts        # Sistema de permisos
│   ├── api-client.ts         # Cliente HTTP
│   └── utils.ts
├── store/                     # Estado global (Zustand)
│   └── auth-store.ts
├── types/                     # Tipos TypeScript
│   ├── auth.types.ts
│   └── models.types.ts
├── messages/                  # Traducciones i18n
│   ├── en.json
│   └── es.json
├── middleware.ts              # Middleware de autenticación
├── i18n.ts                   # Configuración i18n
└── navigation.ts             # Navegación tipada con i18n
```

## 🎯 Roles y Permisos

### Estudiante (STUDENT)
- ✅ Dashboard
- ✅ Mis cursos (solo los inscritos)
- ✅ Perfil

### Profesor (TEACHER)
- ✅ Dashboard
- ✅ Gestión de estudiantes
- ✅ Gestión de cursos (crear/editar)
- ✅ Reportes
- ✅ Perfil

### Administrador (ADMIN)
- ✅ Acceso completo a todas las funcionalidades
- ✅ Gestión de usuarios del sistema
- ✅ Configuración global

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd acas-front
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
```env
JWT_SECRET=your-secret-key
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Internacionalización

El proyecto soporta múltiples idiomas mediante **next-intl**:

- **Español (es)** - Idioma por defecto
- **English (en)**

Las rutas están prefijadas con el locale:
- `/es/dashboard` - Dashboard en español
- `/en/dashboard` - Dashboard en inglés

Para cambiar el idioma, usa el selector de idioma en la navbar.

## 🔐 Autenticación

El sistema utiliza JWT con cookies HTTP-only para seguridad:

1. El usuario inicia sesión en `/[locale]/auth/login`
2. El servidor valida credenciales y crea un JWT
3. El JWT se almacena en una cookie HTTP-only
4. El middleware verifica el token en cada request
5. Si el token es válido, el usuario accede a las rutas protegidas

### Middleware de Autenticación

El `middleware.ts` intercepta todas las rutas y:
- ✅ Verifica la existencia del token
- ✅ Valida el JWT
- ✅ Verifica permisos por rol
- ✅ Redirige a login si no está autenticado
- ✅ Redirige a unauthorized si no tiene permisos

## 🎨 Temas

El proyecto incluye soporte para modo claro/oscuro usando **next-themes**:

- Sistema (por defecto)
- Claro
- Oscuro

Usa el toggle en la navbar para cambiar el tema.

## 📦 Componentes Principales

### Sidebar
Navegación lateral dinámica que muestra opciones según el rol del usuario.

### Navbar
Barra superior con información del usuario, selector de idioma y selector de tema.

### LoginForm
Formulario de autenticación con validación y manejo de errores.

## 🔧 Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

## 🚧 Próximas Características

- [ ] Integración completa con backend
- [ ] Formularios de creación/edición (Estudiantes, Cursos, Usuarios)
- [ ] Tablas con paginación y filtros
- [ ] Sistema de notificaciones
- [ ] Dashboard con gráficas y estadísticas
- [ ] Exportación de reportes (PDF/Excel)
- [ ] Sistema de calificaciones
- [ ] Chat/Mensajería interna

## 📚 Tecnologías Utilizadas

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [jose](https://github.com/panva/jose) - JWT
- [axios](https://axios-http.com/)
- [Lucide Icons](https://lucide.dev/)

## 📝 Notas de Desarrollo

### Agregar un nuevo idioma

1. Crea un nuevo archivo en `messages/[locale].json`
2. Agrega el locale a `i18n.ts`
3. Actualiza el middleware matcher

### Agregar un nuevo permiso

1. Define el permiso en `lib/permissions.ts`
2. Actualiza `rolePermissions`
3. Usa el hook `usePermissions()` en componentes

### Agregar una nueva ruta protegida

1. Crea la ruta en `app/[locale]/dashboard/[ruta]`
2. Define permisos en `lib/permissions.ts`
3. Actualiza el middleware con la nueva ruta

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Equipo

Desarrollado para ACAS - Sistema de Gestión Educativa

---

**¡Listo para empezar!** 🚀

Para cualquier duda o problema, por favor abre un issue en el repositorio.
