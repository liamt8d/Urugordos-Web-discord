import { NextRequest, NextResponse } from 'next/server'
import { exchangeCode, getAdminRoles, getUserGuildMember } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/admin/login?error=denied', request.url))
  }

  try {
    const tokens = await exchangeCode(code)
    const member = await getUserGuildMember(tokens.access_token)

    if (!member) {
      return NextResponse.redirect(new URL('/admin/login?error=not_member', request.url))
    }

    const isAdmin = getAdminRoles().some(roleId => member.roles.includes(roleId))
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/admin/login?error=not_admin', request.url))
    }

    const response = NextResponse.redirect(new URL('/admin', request.url))
    response.cookies.set('discord_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })
    response.cookies.set('discord_refresh', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (err) {
    console.error('[Discord OAuth Error]', err)
    return NextResponse.redirect(new URL('/admin/login?error=oauth_failed', request.url))
  }
}