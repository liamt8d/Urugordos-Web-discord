import { getDb } from './db'
import type { Collection, WithId, Document } from 'mongodb'

export interface Postulacion {
  _id: string
  guild_id: string
  user_id: string
  user_name?: string
  tipo: string
  estado: 'en_espera' | 'aceptada' | 'rechazada' | 'abandonada'
  respuestas: { pregunta: string; respuesta: string }[]
  fecha: number | string
  duracion?: number
  mensaje_id: string | null
  canal_notif_id: string | null
  revisor_id: string | null
  motivo_revision: string | null
  fecha_revision: number | string | null
}

async function getCollection(): Promise<Collection<Postulacion>> {
  const db = await getDb()
  return db.collection<Postulacion>('postulaciones')
}

export async function insertarPostulacion(doc: Postulacion): Promise<void> {
  const col = await getCollection()
  await col.insertOne(doc as any)
}

export async function obtenerPostulaciones(estado?: string): Promise<Postulacion[]> {
  const col = await getCollection()
  const filter: Record<string, any> = {}
  if (estado) filter.estado = estado
  return col.find(filter).sort({ fecha: -1 }).toArray() as unknown as Postulacion[]
}

export async function obtenerPostulacion(id: string): Promise<Postulacion | null> {
  const col = await getCollection()
  return col.findOne({ _id: id }) as unknown as Postulacion | null
}

export async function actualizarPostulacion(
  id: string,
  updates: Partial<Postulacion>
): Promise<boolean> {
  const col = await getCollection()
  const result = await col.updateOne({ _id: id }, { $set: updates })
  return result.modifiedCount > 0
}

export function formatFecha(fecha: number | string | undefined | null): string {
  if (!fecha) return '—'
  if (typeof fecha === 'number') {
    const ms = fecha > 1e12 ? fecha : fecha * 1000
    return new Date(ms).toLocaleDateString('es-AR', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}
