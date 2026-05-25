import { NextRequest, NextResponse } from 'next/server'
import { authorizeFromCookie } from '@/lib/auth'
import { getDb } from '@/lib/db'

export async function GET(request: Request) {
  const auth = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!await authorizeFromCookie(auth)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const db = await getDb()
    const guildId = process.env.GUILD_ID || '1208067087411773532'
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get('estado') || undefined

    const collection = db.collection('postulaciones')
    const filter: Record<string, any> = { guild_id: guildId }
    if (estado) filter.estado = estado

    const docs = await collection.find(filter).sort({ fecha: -1 }).toArray() as any[]

    const token = process.env.DISCORD_BOT_TOKEN
    const enriched = await Promise.all(
      docs.map(async (doc: any) => {
        const result: any = { ...doc }
        if (!result.user_name && result.user_id && token) {
          try {
            const res = await fetch(`https://discord.com/api/v10/users/${result.user_id}`, {
              headers: { Authorization: `Bot ${token}` },
            })
            if (res.ok) {
              const data = await res.json()
              result.user_name = data.global_name || data.username || result.user_id
            }
          } catch {}
        }
        return result
      })
    )

    return NextResponse.json(enriched)
  } catch (err) {
    console.error('[admin/postulaciones] error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const auth = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!await authorizeFromCookie(auth)) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, estado, motivo } = body

    if (!id || !estado) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const db = await getDb()
    const collection = db.collection('postulaciones')
    const doc = await collection.findOne({ _id: id })

    if (!doc) {
      return NextResponse.json({ error: 'Postulación no encontrada' }, { status: 404 })
    }

    const updates: Record<string, unknown> = {
      estado,
      revisor_id: 'admin_web',
      fecha_revision: new Date().toISOString(),
    }
    if (motivo) updates.motivo_revision = motivo

    await collection.updateOne({ _id: id }, { $set: updates })

    const emoji = estado === 'aceptada' ? '✅' : estado === 'rechazada' ? '❌' : '⏳'
    const estadoLabel = estado.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    const revisor = 'admin_web'
    const fecha = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })

    const token = process.env.DISCORD_BOT_TOKEN
    if (token && doc.canal_notif_id && doc.mensaje_id && token) {
      try {
        const channel = await fetch(`https://discord.com/api/v10/channels/${doc.canal_notif_id}/messages/${doc.mensaje_id}`, {
          headers: { Authorization: `Bot ${token}` },
        })
        if (channel.ok) {
          const msg = await channel.json()
          const existingEmbeds = (msg.embeds || []).filter((e: any) =>
            !e.color || ![0x5bc101, 0xfe3333, 0xfae61c].includes(e.color)
          )

          if (existingEmbeds.length > 0) {
            const base = existingEmbeds[0]
            existingEmbeds[0] = {
              ...base,
              fields: base.fields.map((f: any) =>
                f.name === 'Estado' ? { ...f, value: `${emoji} ${estadoLabel}` } : f
              ),
            }
          }

          const accionEmbed = {
            title: `${emoji} Postulación ${estadoLabel}`,
            color: estado === 'aceptada' ? 0x5bc101 : estado === 'rechazada' ? 0xfe3333 : 0xfae61c,
            timestamp: new Date().toISOString(),
            fields: [
              { name: '👤 Revisado por', value: revisor, inline: true },
              { name: '🕐 Fecha', value: fecha, inline: true },
              ...(motivo ? [{ name: '💬 Motivo', value: motivo, inline: false }] : []),
            ],
          }

          await fetch(`https://discord.com/api/v10/channels/${doc.canal_notif_id}/messages/${doc.mensaje_id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bot ${token}` },
            body: JSON.stringify({ embeds: [...existingEmbeds, accionEmbed], components: [] }),
          })
        }
      } catch (e) {
        console.error('[admin/postulaciones] Discord update error:', e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/postulaciones] PATCH error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}