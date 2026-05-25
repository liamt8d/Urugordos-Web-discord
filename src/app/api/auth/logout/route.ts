import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true })
  response.cookies.delete('discord_token')
  response.cookies.delete('discord_refresh')
  return response
}