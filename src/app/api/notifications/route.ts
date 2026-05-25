import { NextResponse } from 'next/server'

const API = 'https://discord.com/api/v10'

async function fetchJson(url: string, token: string) {
  const res = await fetch(url, { headers: { Authorization: `Bot ${token}` } })
  if (!res.ok) return null
  return res.json()
}

async function fetchMessages(channelId: string, token: string) {
  const data = await fetchJson(`${API}/channels/${channelId}/messages?limit=20`, token)
  return Array.isArray(data) ? data : []
}

const MENTION_CH = /<#(\d+)>/g
const MENTION_ROLE = /<@&(\d+)>/g
const GUILD_ID = '1333180919112273993'

function extractIds(text: string, re: RegExp): string[] {
  const ids: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) ids.push(m[1])
  return ids
}

export async function GET() {
  const token = process.env.DISCORD_BOT_TOKEN
  if (!token) return NextResponse.json({ error: 'no token' }, { status: 500 })

  const targetChannelIds = ['1400644940823793764', '1333199348447838288', '1333199380924072037']

  const channelData = await Promise.all(
    targetChannelIds.map(async (id) => {
      const d: any = await fetchJson(`${API}/channels/${id}`, token)
      return d && d.id ? { id: d.id, name: d.name } : null
    })
  )
  const targetChannels = channelData.filter(Boolean) as { id: string; name: string }[]

  const results = await Promise.all(targetChannels.map((c) => fetchMessages(c.id, token)))
  const rawMessages = results
    .flat()
    .filter((m: any) => m && m.id)
    .sort((a: any, b: any) => Date.parse(b.timestamp) - Date.parse(a.timestamp))
    .slice(0, 50)

  const chMap: Record<string, string> = {}
  const roleMap: Record<string, { name: string; color: number }> = {}

  for (const c of targetChannels) chMap[c.id] = c.name

  const allContent = rawMessages.map((m: any) => m.content || '').join(' ')

  const chIds = [...new Set(extractIds(allContent, MENTION_CH))]
  const roleIds = [...new Set(extractIds(allContent, MENTION_ROLE))]

  const chResults = await Promise.all(
    chIds.filter((id) => !chMap[id]).map(async (id) => {
      const data = await fetchJson(`${API}/channels/${id}`, token)
      return data ? [id, data.name] as [string, string] : null
    })
  )
  for (const r of chResults) {
    if (r) chMap[r[0]] = r[1]
  }

  if (roleIds.length > 0) {
    const guildRoles: any[] | null = await fetchJson(`${API}/guilds/${GUILD_ID}/roles`, token)
    if (Array.isArray(guildRoles)) {
      for (const r of guildRoles) {
        if (roleIds.includes(r.id)) {
          let color = r.color || 0
          if (!color && r.gradient_colors?.length) {
            const sorted = [...r.gradient_colors].sort((a: any, b: any) =>
              (b.color || 0) - (a.color || 0)
            )
            color = sorted[0].color || 0
          }
          roleMap[r.id] = { name: r.name, color }
        }
      }
    }
  }

  const messages = rawMessages.map((m: any) => ({
    id: m.id,
    channelId: m.channel_id,
    channelName: targetChannels.find((c) => c.id === m.channel_id)?.name || 'Desconocido',
    content: m.content,
    timestamp: m.timestamp,
    editedTimestamp: m.editedTimestamp,
    author: {
      id: m.author.id,
      username: m.author.global_name || m.author.username,
      avatar: m.author.avatar
        ? `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.${m.author.avatar.startsWith('a_') ? 'gif' : 'png'}`
        : null,
      bot: m.author.bot,
    },
    embeds: m.embeds || [],
    attachments: m.attachments || [],
    reactions: (m.reactions || []).map((r: any) => ({
      emoji: r.emoji.name || r.emoji.id,
      emojiUrl: r.emoji.id
        ? `https://cdn.discordapp.com/emojis/${r.emoji.id}.${r.emoji.animated ? 'gif' : 'png'}`
        : null,
      count: r.count,
    })),
    stickerItems: (m.sticker_items || []).map((s: any) => ({
      id: s.id,
      name: s.name,
      formatType: s.format_type,
    })),
  }))

  const channelIdMap: Record<string, string> = {}
  for (const c of targetChannels) channelIdMap[c.name] = c.id

  return NextResponse.json({ messages, channels: chMap, roles: roleMap, channelIdMap })
}
