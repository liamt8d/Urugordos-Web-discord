import { NextResponse } from 'next/server'
import { getMaoDb } from '@/lib/db'

async function getDisplayName(userId: string, botToken: string): Promise<string> {
  try {
    const res = await fetch(`https://discord.com/api/v10/users/${userId}`, {
      headers: { Authorization: `Bot ${botToken}` },
    })
    if (res.ok) {
      const data = await res.json()
      return data.global_name || data.username || userId
    }
  } catch {}
  return userId
}

export async function GET() {
  try {
    const guildId = process.env.GUILD_ID || '1208067087411773532'
    const botToken = process.env.DISCORD_BOT_TOKEN || ''
    const db = await getMaoDb()

    const [users, shop, config] = await Promise.all([
      db.collection('economy_users').aggregate([
        { $match: { guild_id: guildId } },
        { $addFields: { total: { $add: [{ $ifNull: ['$wallet', 0] }, { $ifNull: ['$bank', 0] }] } } },
        { $sort: { total: -1 } },
        { $limit: 10 },
      ]).toArray(),
      db.collection('economy_shop').findOne({ guild_id: guildId }),
      db.collection('guild_config').findOne({ guild_id: guildId }),
    ])

    const leaderboard = await Promise.all(
      users.map(async (u, i) => {
        const name = botToken ? await getDisplayName(u.user_id, botToken) : u.user_id
        return {
          rank: i + 1,
          userId: u.user_id,
          displayName: name,
          wallet: u.wallet || 0,
          bank: u.bank || 0,
          total: (u.wallet || 0) + (u.bank || 0),
        }
      })
    )

    return NextResponse.json({
      leaderboard,
      shop: shop?.items || [],
      config: {
        currency: config?.currency || '🪙',
        maxWallet: config?.max_wallet || Number.MAX_SAFE_INTEGER,
        maxBank: config?.max_bank || Number.MAX_SAFE_INTEGER,
        taxEnabled: config?.tax_enabled ?? true,
        taxPercent: config?.tax_percent || 0.02,
        taxInterval: config?.tax_interval_ms || 43200000,
      },
    })
  } catch (err) {
    console.error('Economy API error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}