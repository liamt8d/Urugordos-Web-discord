const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const API = 'https://discord.com/api/v10'

async function request(method: string, path: string, body?: unknown) {
  if (!BOT_TOKEN) return null
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`[Discord API] ${method} ${path}: ${res.status} ${text}`)
    return null
  }
  return res.json()
}

export async function crearDm(userId: string): Promise<string | null> {
  const data = await request('POST', `/users/${userId}/channels`, { recipient_id: userId })
  return data?.id || null
}

export async function enviarDm(userId: string, content: string): Promise<boolean> {
  try {
    const channelId = await crearDm(userId)
    if (!channelId) return false
    const data = await request('POST', `/channels/${channelId}/messages`, { content })
    return !!data
  } catch {
    return false
  }
}

export async function editarMensaje(channelId: string, messageId: string, embeds: unknown[]): Promise<boolean> {
  try {
    const data = await request('PATCH', `/channels/${channelId}/messages/${messageId}`, { embeds })
    return !!data
  } catch {
    return false
  }
}

const ESTADO_EMOJI: Record<string, string> = {
  aceptada: '✅',
  rechazada: '❌',
  en_espera: '⏳',
}

const ESTADO_COLOR: Record<string, number> = {
  aceptada: 0x5bc101,
  rechazada: 0xfe3333,
  en_espera: 0xfae61c,
}

const GUILD_ID = process.env.GUILD_ID

export async function desbanearUsuario(userId: string): Promise<boolean> {
  if (!GUILD_ID) return false
  const data = await request('DELETE', `/guilds/${GUILD_ID}/bans/${userId}`)
  return data !== null
}

export async function quitarTimeout(userId: string): Promise<boolean> {
  if (!GUILD_ID) return false
  const data = await request('PATCH', `/guilds/${GUILD_ID}/members/${userId}`, {
    communication_disabled_until: null,
  })
  return data !== null
}

const NOTIF_CHANNEL = process.env.DISCORD_NOTIF_CHANNEL_ID

const COLOR_MAP: Record<string, number> = {
  staff: 0x5865F2, developer: 0x57F287, disenador: 0xFF73FA, tickets: 0xFF9400,
}
const TIPO_EMOJI: Record<string, string> = {
  staff: '🛡️', developer: '💻', disenador: '🎨', tickets: '🎫',
}
const TIPO_NOMBRE: Record<string, string> = {
  staff: 'Staff', developer: 'Developer', disenador: 'Diseñador', tickets: 'Tickets',
}

export async function enviarPostulacionACanal(
  userId: string, userName: string | null, tipo: string, respuestas: { pregunta: string; respuesta: string }[]
): Promise<{ channelId: string; messageId: string } | null> {
  if (!NOTIF_CHANNEL) return null

  const fields = [
    { name: '👤 Usuario', value: `${userName || userId} (<@${userId}>)`, inline: true },
    { name: '📋 Tipo', value: `${TIPO_EMOJI[tipo] || '📋'} ${TIPO_NOMBRE[tipo] || tipo}`, inline: true },
    { name: '📅 Fecha', value: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }), inline: true },
    { name: '📝 Respuestas', value: respuestas.map((r, i) => `**${i + 1}.** ${r.pregunta}\n> ${r.respuesta || 'Sin respuesta'}`).join('\n').slice(0, 1024), inline: false },
    { name: '🔗 Admin', value: `[Ver en web →](https://urugordos.com/admin/postulaciones)`, inline: false },
  ]

  const data = await request('POST', `/channels/${NOTIF_CHANNEL}/messages`, {
    embeds: [{
      title: `${TIPO_EMOJI[tipo] || '📋'} Nueva Postulación`,
      color: COLOR_MAP[tipo] || 0x5865F2,
      fields,
      timestamp: new Date().toISOString(),
    }],
    components: [{
      type: 1,
      components: [
        { type: 2, style: 3, label: 'Aceptar', custom_id: `accept_${userId}_${tipo}`, emoji: { name: '✅' } },
        { type: 2, style: 4, label: 'Rechazar', custom_id: `reject_${userId}_${tipo}`, emoji: { name: '❌' } },
      ],
    }],
  })

  if (!data?.id) return null
  return { channelId: NOTIF_CHANNEL, messageId: data.id }
}

export async function obtenerUserName(userId: string): Promise<string | null> {
  const data = await request('GET', `/users/${userId}`)
  if (data?.global_name) return data.global_name
  if (data?.username) return data.username
  return null
}

export function buildEmbedAccion(estado: string, motivo: string | null, revisorId: string) {
  const emoji = ESTADO_EMOJI[estado] || '❓'
  const color = ESTADO_COLOR[estado] || 0x5865F2
  const fields: any[] = [
    { name: '👤 Revisado por', value: `admin_web`, inline: true },
    { name: '🕐 Fecha', value: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }), inline: true },
  ]
  if (motivo) {
    fields.push({ name: '💬 Motivo', value: motivo, inline: false })
  }
  return {
    color,
    title: `${emoji} Postulación ${estado.replace('_', ' ').charAt(0).toUpperCase() + estado.replace('_', ' ').slice(1)}`,
    timestamp: new Date().toISOString(),
    fields,
  }
}
