import { NextResponse } from 'next/server'
import { getAdminToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    let password: string | undefined

    const contentType = request.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const body = await request.json()
      password = body.password
    } else {
      const formData = await request.formData()
      password = formData.get('password') as string | undefined
    }

    if (!password) {
      return NextResponse.json({ success: false, error: 'Contraseña requerida' }, { status: 400 })
    }

    const expected = process.env.ADMIN_PASSWORD || 'admin123'

    if (password === expected) {
      const token = getAdminToken()
      return NextResponse.json({ success: true, token }, { status: 200 })
    }

    return NextResponse.json({ success: false, error: 'Contraseña incorrecta' }, { status: 401 })
  } catch (err) {
    console.error('[Login Error]', err)
    return NextResponse.json({ success: false, error: 'Error interno' }, { status: 500 })
  }
}
