/// <reference types="astro/client" />

declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI?: string
    GUILD_ID?: string
    DISCORD_WEBHOOK_URL?: string
    SITE_URL?: string
  }
}
