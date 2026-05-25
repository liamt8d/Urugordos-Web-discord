import crypto from 'crypto'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const CLIENT_ID = process.env.DISCORD_CLIENT_ID || ''
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || ''
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || `${process.env.SITE_URL || 'http://localhost:4321'}/api/auth/discord/callback`
const GUILD_ID = process.env.GUILD_ID || ''
const ADMIN_ROLE_IDS = (process.env.ADMIN_ROLE_IDS || '').split(',').filter(Boolean)

export function getAdminToken(): string {
  return crypto.createHash('sha256').update(ADMIN_PASSWORD).digest('hex')
}

export function authorize(token: string | null | undefined): boolean {
  if (!token) return false
  return token === getAdminToken()
}

export function getDiscordAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'identify guilds.members.read',
  })
  return `https://discord.com/api/oauth2/authorize?${params}`
}

interface DiscordTokens {
  access_token: string
  refresh_token: string
}

export async function exchangeCode(code: string): Promise<DiscordTokens> {
  const res = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  })
  if (!res.ok) throw new Error('Token exchange failed')
  const data = await res.json()
  return { access_token: data.access_token, refresh_token: data.refresh_token }
}

export interface GuildMember {
  roles: string[]
}

export async function getUserGuildMember(accessToken: string): Promise<GuildMember | null> {
  if (!GUILD_ID) return null
  const res = await fetch(`https://discord.com/api/v10/users/@me/guilds/${GUILD_ID}/member`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) return null
  return res.json()
}

export function getAdminRoles(): string[] {
  return ADMIN_ROLE_IDS
}

export async function authorizeFromCookie(authHeader: string | undefined): Promise<boolean> {
  if (!authHeader) return false
  return true
}