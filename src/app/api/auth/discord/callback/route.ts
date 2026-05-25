import { NextRequest, NextResponse } from 'next/server'
import { exchangeCode, getAdminRoles, getUserGuildMember } from '@/lib/auth'

const BASE_URL = 'https://urugordos.com'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    console.log('[OAuth] Error or no code:', error)
    return NextResponse.redirect(new URL(`${BASE_URL}/admin/login?error=denied`))
  }

  try {
    console.log('[OAuth] Exchanging code...')
    const tokens = await exchangeCode(code)
    console.log('[OAuth] Got tokens')
    
    const member = await getUserGuildMember(tokens.access_token)
    console.log('[OAuth] Member:', JSON.stringify(member))

    if (!member) {
      return NextResponse.redirect(new URL(`${BASE_URL}/admin/login?error=not_member`))
    }

    const adminRoles = getAdminRoles()
    console.log('[OAuth] Admin roles:', adminRoles)
    console.log('[OAuth] User roles:', member.roles)
    
    const isAdmin = adminRoles.length > 0 && adminRoles.some(roleId => member.roles.includes(roleId))
    console.log('[OAuth] Is admin:', isAdmin)
    
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