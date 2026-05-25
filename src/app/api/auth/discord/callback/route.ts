import { NextRequest, NextResponse } from 'next/server'
import { exchangeCode, getAdminRoles, getUserGuildMember } from '@/lib/auth'

const BASE_URL = 'https://urugordos.com'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL(`${BASE_URL}/admin/login?error=denied`))
  }

  try {
    const tokens = await exchangeCode(code)
    const member = await getUserGuildMember(tokens.access_token)

    if (!member) {
      return NextResponse.redirect(new URL(`${BASE_URL}/admin/login?error=not_member`))
    }

    const adminRoles = getAdminRoles()
    const isAdmin = adminRoles.length === 0 || adminRoles.some(roleId => member.roles.includes(roleId))
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL(`${BASE_URL}/admin/login?error=not_admin`))
    }

    const response = NextResponse.redirect(new URL(`${BASE_URL}/admin`))
    response.cookies.set('discord_token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
    response.cookies.set('discord_refresh', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (err) {
    console.error('[Discord OAuth Error]', err)
    return NextResponse.redirect(new URL(`${BASE_URL}/admin/login?error=oauth_failed`))
  }
}