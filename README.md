# Nexus - Tu Espacio Digital Personal

Nexus es una red social personal que evolucionó de un portfolio a una plataforma social completa. La primera red social latinoamericana que conecta personas por lo que realmente aman.

## 🚀 Demo en vivo

[https://nexus-eac.netlify.app/](https://nexus-eac.netlify.app/)

## 🛠️ Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript vanilla (sin frameworks)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Hosting**: Netlify
- **Autenticación**: Supabase Auth + Sistema legacy

## 📋 Características

### ✅ Implementadas
- Autenticación dual (Supabase + legacy)
- CRUD completo para 6 tipos de contenido (música, películas, libros, artículos, posts, galería)
- Sistema de follows con contadores
- Búsqueda de usuarios en tiempo real
- Navegación entre perfiles
- Feed global con filtros y tab "Siguiendo"
- Quick Post modal siempre accesible
- Edición de perfil con iniciales custom

### ⏳ En desarrollo
- Notificaciones: Solo UI, falta backend
- Páginas personalizadas: Creación lista, falta contenido

### ❌ Pendientes
- Sistema de likes/reacciones
- Comentarios en posts
- Mensajes privados
- Notificaciones en tiempo real

## 🏗️ Estructura del Proyecto

```
nexus/
├── index.html              # Archivo principal
├── package.json           # Configuración npm
├── netlify.toml          # Configuración Netlify
├── README.md             # Este archivo
├── styles/               # Estilos CSS
│   ├── main.css         # Variables y estilos base
│   ├── components.css   # Componentes reutilizables
│   ├── sections.css     # Estilos de secciones
│   └── responsive.css   # Media queries
├── js/                  # JavaScript
│   ├── config.js       # Configuración global
│   ├── core/           # Módulos centrales
│   ├── services/       # Servicios de negocio
│   ├── components/     # Componentes UI
│   ├── sections/       # Secciones principales
│   ├── utils/          # Utilidades
│   └── app.js          # Inicialización
└── assets/             # Recursos estáticos
```

## 🚦 Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/IamEac/nexus.git
cd nexus
```

2. Abre `index.html` en tu navegador o usa un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx serve
```

## 🔐 Configuración de Supabase

El proyecto usa Supabase para backend. Las credenciales están en `js/config.js`.

### Tablas necesarias:
- `profiles`: Perfiles de usuario
- `follows`: Relaciones follower → following
- `posts`: Posts tipo Twitter
- `movies`: Películas
- `books`: Libros
- `playlists`: Música
- `articles`: Artículos
- `media`: Galería
- `custom_pages`: Páginas personalizadas (pendiente)

### Storage Buckets:
- `movies`
- `books`
- `articles`
- `posts`
- `gallery`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

## 👤 Autor

**IamEac**

## 🙏 Agradecimientos

- A la comunidad latinoamericana por la inspiración
- Supabase por el excelente servicio de backend
- Netlify por el hosting gratuito