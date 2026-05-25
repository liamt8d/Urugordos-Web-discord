import { getDb } from './db'
import type { Collection } from 'mongodb'

export interface Apelacion {
  _id: string
  user_id: string
  tipo_sancion: string
  motivo_sancion: string
  justificacion: string
  evidencia: string
  estado: 'pendiente' | 'aceptada' | 'rechazada'
  fecha: number
  revisor_id: string | null
  motivo_revision: string | null
  fecha_revision: number | string | null
}

async function getCollection(): Promise<Collection<Apelacion>> {
  const db = await getDb()
  return db.collection<Apelacion>('apelaciones')
}

export async function insertarApelacion(doc: Apelacion): Promise<void> {
  const col = await getCollection()
  await col.insertOne(doc as any)
}

export async function obtenerApelaciones(estado?: string): Promise<Apelacion[]> {
  const col = await getCollection()
  const filter: Record<string, any> = {}
  if (estado) filter.estado = estado
  return col.find(filter).sort({ fecha: -1 }).toArray() as unknown as Apelacion[]
}

export async function obtenerApelacion(id: string): Promise<Apelacion | null> {
  const col = await getCollection()
  return col.findOne({ _id: id }) as unknown as Apelacion | null
}

export async function actualizarApelacion(
  id: string,
  updates: Partial<Apelacion>
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
