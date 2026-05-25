import { NextResponse } from 'next/server'
import { getAdminToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password) {
      return NextResponse.json({ success: false, error: 'Contraseña requerida' }, { status: 400 })
    }

    const expected = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === expected) {
      const token = getAdminToken()
      return NextResponse.json({ success: true, token }, { status: 200 })
    }

    return NextResponse.json({ success: false, error: 'Contraseña incorrecta' }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 })
  }
}
