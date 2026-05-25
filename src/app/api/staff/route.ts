import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response | null> {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url, options)
    if (res.ok) return res
    if (res.status === 429) {
      const retryAfter = parseFloat(res.headers.get('retry-after') || '1')
      await new Promise(r => setTimeout(r, (retryAfter + 0.1) * 1000))
      continue
    }
    return null
  }
  return null
}

export async function GET() {
  try {
    const guildId = process.env.GUILD_ID || '1208067087411773532'
    const db = await getDb()
    const doc = await db.collection('urugod_sanciones').findOne({ _id: `staff_${guildId}` as any })

    if (!doc || !doc.roles) {
      return NextResponse.json({ roles: [] })
    }

    let roles = doc.roles as any[]

    const token = process.env.DISCORD_BOT_TOKEN
    if (token) {
      const ids = new Set<string>()
      for (const r of roles) {
        for (const m of (r.members || [])) ids.add(m.id)
      }
      if (ids.size > 0) {
        try {
          const res = await fetchWithRetry(
            `https://discord.com/api/v10/guilds/${guildId}/members?limit=1000`,
            { headers: { Authorization: `Bot ${token}` } },
            2
          )
          if (res) {
            const members: any[] = await res.json()
            const map = new Map<string, string>()
            for (const mem of members) {
              map.set(mem.user.id, mem.nick || mem.user.global_name || mem.user.username)
            }
            roles = roles.map(r => ({
              ...r,
              members: (r.members || []).map((m: any) => ({
                ...m,
                name: map.get(m.id) || m.name,
              })),
            }))
          }
        } catch {}
      }
    }

    return NextResponse.json({
      roles,
      updatedAt: doc.updatedAt ?? null,
    })
  } catch (err) {
    console.error('Error fetching staff:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
