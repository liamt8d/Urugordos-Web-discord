import { NextResponse } from 'next/server'
import { getDiscordAuthUrl } from '@/lib/auth'

export async function GET() {
  const url = getDiscordAuthUrl()
  return NextResponse.redirect(url)
}