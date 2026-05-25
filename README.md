# Urugordos Web

Sitio web oficial del servidor de Discord Urugordos. Una web informativa construida con Next.js que incluye:

- Páginas informativas del servidor
- Sistema de postulaciones al staff
- Panel de administración con Discord OAuth
- Sistema de apelaciones de sanciones

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Base de datos:** MongoDB
- **Autenticación:** Discord OAuth2 + contraseña legacy
- **Hosting:** Discloud

## Requisitos

- Node.js 20.9.0 o superior
- MongoDB (local o remoto)
- npm o yarn

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/liamt8d/Urugordos-Web-discord.git
cd Urugordos-Web-discord
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea el archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en `.env`:
```env
# MongoDB
MONGO_URI=mongodb://usuario:password@host:27017/base

# Discord
DISCORD_BOT_TOKEN=tu_token_del_bot
GUILD_ID=id_del_servidor
DISCORD_NOTIF_CHANNEL_ID=id_del_canal_de_notificaciones
DISCORD_WEBHOOK_URL=url_del_webhook

# Sitio
SITE_URL=https://tu-dominio.com

# Admin
ADMIN_PASSWORD=tu_contraseña_segura

# Discord OAuth (opcional)
DISCORD_CLIENT_ID=id_de_tu_app_discord
DISCORD_CLIENT_SECRET=secreto_de_tu_app_discord
DISCORD_REDIRECT_URI=https://tu-dominio.com/api/auth/discord/callback
ADMIN_ROLE_IDS=id_rol_admin1,id_rol_admin2
```

## Desarrollo Local

```bash
npm run dev
```

El servidor de desarrollo estará disponible en `http://localhost:3000`

## Producción

### Build local

```bash
npm run build
```

### Deploy en Discloud

1. Asegúrate de tener los archivos `discloud.config` y `Dockerfile` en la raíz del proyecto
2. Sube tu `.env` con las variables correctas
3. Desde Discloud:
```bash
discloud deploy
```

O conectando tu repositorio de GitHub en el panel de Discloud.

## Estructura del Proyecto

```
├── src/
│   ├── app/              # Páginas y API routes de Next.js
│   │   ├── admin/        # Panel de administración
│   │   ├── api/          # Endpoints de la API
│   │   │   ├── admin/    # Rutas protegidas del admin
│   │   │   ├── auth/     # OAuth de Discord
│   │   │   └── *.ts      # Rutas públicas
│   │   └── */page.tsx    # Páginas públicas
│   ├── components/       # Componentes reutilizables
│   ├── lib/              # Utilidades y conexión a BD
│   └── data/             # Datos estáticos
├── public/               # Archivos estáticos
├── .env.example          # Template de variables de entorno
├── discloud.config       # Configuración de Discloud
└── Dockerfile           # Imagen para despliegue
```

## Panel de Administración

### Método 1: Discord OAuth (Recomendado)

1. Crea una aplicación en el [Discord Developer Portal](https://discord.com/developers/applications)
2. Añade una redirect URI: `https://tu-dominio.com/api/auth/discord/callback`
3. Configura `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` y `ADMIN_ROLE_IDS` en `.env`
4. Los usuarios con los roles especificados podrán iniciar sesión automáticamente

### Método 2: Contraseña

Accede a `/admin/login` e ingresa la contraseña configurada en `ADMIN_PASSWORD`.

## Configurar Discord OAuth

### 1. Crear aplicación en Discord Developer Portal

1. Ve a https://discord.com/developers/applications
2. Crea una nueva aplicación
3. En "OAuth2", añade una redirect URI:
   - Para desarrollo local: `http://localhost:3000/api/auth/discord/callback`
   - Para producción: `https://tu-dominio.com/api/auth/discord/callback`

### 2. Obtener credentials

- **Client ID:** Visible en la página de tu aplicación
- **Client Secret:** Genera uno nuevo en "OAuth2 > Secrets"

### 3. Configurar bot

1. En tu aplicación, crea un bot en la sección "Bot"
2. Copia el token del bot como `DISCORD_BOT_TOKEN`

### 4. Configurar Intents

Asegúrate de que el bot tenga los intents necesarios:
- Server Members Intent (para verificar roles)
- Presence Intent (opcional)

### 5. Añadir roles de admin

Crea un rol en tu servidor Discord para admins y obtén su ID (clic derecho en el rol > "Copiar ID").

Añade los IDs de roles separados por comas en `ADMIN_ROLE_IDS`.

## APIs Disponibles

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/postular` | POST | Crear postulación |
| `/api/apelar` | POST | Crear apelación |
| `/api/admin/postulaciones` | GET/PATCH | Gestionar postulaciones |
| `/api/admin/apelaciones` | GET/PATCH | Gestionar apelaciones |
| `/api/auth/discord` | GET | Iniciar OAuth Discord |
| `/api/auth/discord/callback` | GET | Callback OAuth Discord |
| `/api/auth/logout` | POST | Cerrar sesión |

## Configuración de Dominio

### Cloudflare + Discloud

1. En Cloudflare, configura los DNS de tu dominio:
   - Tipo: `A` o `CNAME`
   - Apunta a la IP/dominio de Discloud

2. En Discloud, añade tu dominio personalizado en el panel

3. Asegúrate de que SSL/TLS esté configurado correctamente

## Seguridad

- El archivo `.env` **no está incluido** en el repositorio
- Usa `ADMIN_ROLE_IDS` para restringir el acceso al panel admin
- Los tokens de Discord deben mantenerse en privado
- Considera usar variables de entorno en Discloud para mayor seguridad

## Licencia

Este proyecto es propiedad del equipo de Urugordos.