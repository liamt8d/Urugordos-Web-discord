import { NextResponse } from 'next/server'
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

    const collection = db.collection('apelaciones')
    const filter: Record<string, any> = { guild_id: guildId }
    if (estado) filter.estado = estado

    const docs = await collection.find(filter).sort({ fecha: -1 }).toArray() as any[]
    return NextResponse.json(docs)
  } catch (err) {
    console.error('[admin/apelaciones] error:', err)
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
    const collection = db.collection('apelaciones')
    const doc = await collection.findOne({ _id: id })

    if (!doc) {
      return NextResponse.json({ error: 'Apelación no encontrada' }, { status: 404 })
    }

    const updates: Record<string, unknown> = {
      estado,
      revisor_id: 'admin_web',
      fecha_revision: new Date().toISOString(),
    }
    if (motivo) updates.motivo_revision = motivo

    await collection.updateOne({ _id: id }, { $set: updates })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[admin/apelaciones] PATCH error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}