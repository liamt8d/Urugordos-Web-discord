import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

const tipos: Record<string, string> = {
  baneo: '🚫 Baneo', kickeo: '👢 Kickeo', mute: '🔇 Mute', warn: '⚠️ Warn', otro: '❓ Otro',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, userName, tipoSancion, motivoSancion, justificacion, evidencia } = body

    if (!userId || !tipoSancion || !motivoSancion || !justificacion) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const _id = `${userId}_${Date.now()}`
    const guildId = process.env.GUILD_ID || '1208067087411773532'
    const doc = {
      _id,
      guild_id: guildId,
      user_id: userId,
      tipo_sancion: tipoSancion,
      motivo_sancion: motivoSancion,
      justificacion,
      evidencia: evidencia || '',
      estado: 'pendiente' as const,
      fecha: Date.now(),
      revisor_id: null,
      motivo_revision: null,
      fecha_revision: null,
    }

    const db = await getDb()
    await db.collection('apelaciones').insertOne(doc as any)

    if (WEBHOOK_URL) {
      const embed = {
        title: '⚖️ Nueva Apelación Recibida',
        color: 0x5865F2,
        fields: [
          { name: '👤 Usuario', value: `${userName || userId} (<@${userId}>)`, inline: true },
          { name: '🔨 Sanción', value: tipos[tipoSancion] || tipoSancion, inline: true },
          { name: '📅 Fecha', value: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }), inline: true },
          { name: '📝 Motivo', value: motivoSancion, inline: false },
          { name: '💬 Justificación', value: justificacion, inline: false },
          { name: '🔗 Admin', value: `[Ver apelación →](https://urugordos.com/admin/apelaciones)`, inline: false },
        ],
        timestamp: new Date().toISOString(),
      }
      if (evidencia) {
        embed.fields.push({ name: '📎 Evidencia', value: evidencia, inline: false })
      }
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ embeds: [embed] }),
        })
      } catch { /* ignore */ }
    }

    return NextResponse.json({ success: true, id: doc._id }, { status: 200 })
  } catch (err) {
    console.error('Error al guardar apelación:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}