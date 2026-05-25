import { NextResponse } from 'next/server'
import { insertarPostulacion, actualizarPostulacion } from '@/lib/storage'
import { getTipo } from '@/data/preguntas'
import { enviarDm, enviarPostulacionACanal } from '@/lib/discord'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tipo, userId, userName, respuestas } = body

    if (!tipo || !userId || !respuestas || !Array.isArray(respuestas)) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const tipoData = getTipo(tipo)
    if (!tipoData) {
      return NextResponse.json({ error: 'Tipo de postulación inválido' }, { status: 400 })
    }

    const guildId = process.env.GUILD_ID || '1208067087411773532'
    const _id = `${guildId}_${userId}_${tipo}`

    const doc = {
      _id,
      guild_id: guildId,
      user_id: userId,
      user_name: userName || userId,
      tipo,
      estado: 'en_espera' as const,
      respuestas,
      fecha: Date.now(),
      mensaje_id: null as string | null,
      canal_notif_id: null as string | null,
      revisor_id: null as string | null,
      motivo_revision: null as string | null,
      fecha_revision: null as string | null,
    }

    await insertarPostulacion(doc)

    // Enviar embed con botones al canal de notificaciones (como el bot)
    const notif = await enviarPostulacionACanal(userId, userName || userId, tipo, respuestas)
    if (notif) {
      await actualizarPostulacion(_id, { canal_notif_id: notif.channelId, mensaje_id: notif.messageId } as any)
    }

    // DM al usuario confirmando recepción
    const tipoEmoji: Record<string, string> = { staff: '🛡️', developer: '💻', disenador: '🎨', tickets: '🎫' }
    const dmContent = [
      `## ${tipoEmoji[tipo] || '📋'} Postulación recibida`,
      '',
      `**Tipo:** ${tipoData.nombre}`,
      '',
      `Tu postulación está en espera de revisión. Te avisaremos cuando haya una respuesta.`,
    ].join('\n')
    await enviarDm(userId, dmContent)

    return NextResponse.json({ success: true, id: doc._id }, { status: 200 })
  } catch (err) {
    console.error('Error al guardar postulación:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
