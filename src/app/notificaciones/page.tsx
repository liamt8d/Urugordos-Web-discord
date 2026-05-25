'use client'

import { useState, useEffect, useMemo, useRef, type ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function StickerImage({ id, name, formatType }: { id: string; name: string; formatType: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (formatType !== 3 || !ref.current) return
    let lottie: any
    import('lottie-web').then((mod) => {
      lottie = mod.default
      fetch(`https://cdn.discordapp.com/stickers/${id}.json`)
        .then((r) => r.json())
        .then((data) => {
          if (ref.current) {
            lottie.loadAnimation({ container: ref.current, animationData: data, loop: true, autoplay: true })
          }
        })
        .catch(() => {})
    })
    return () => {
      if (lottie) lottie.destroy()
    }
  }, [id, formatType])

  if (formatType === 3) {
    return <div ref={ref} className="nv-sticker nv-sticker-lottie" />
  }

  return (
    <img
      src={`https://cdn.discordapp.com/stickers/${id}.png`}
      alt={name}
      className="nv-sticker"
    />
  )
}

interface Notification {
  id: string
  channelId: string
  channelName: string
  content: string
  timestamp: string
  editedTimestamp: string | null
  author: { id: string; username: string; avatar: string | null; bot: boolean }
  embeds: any[]
  attachments: any[]
  reactions: { emoji: string; emojiUrl: string | null; count: number }[]
  stickerItems: { id: string; name: string; formatType: number }[]
}

function parseDiscord(
  text: string,
  chMap: Record<string, string>,
  roleMap: Record<string, { name: string; color: number }>
): ReactNode[] {
  const lines = text.split('\n')
  const parts: ReactNode[] = []
  let key = 0

  const processLine = (line: string): ReactNode[] => {
    const tokens: ReactNode[] = []
    let i = 0

    while (i < line.length) {
      const rest = line.slice(i)

      const chMatch = rest.match(/^<#(\d+)>/)
      if (chMatch) {
        const name = chMap[chMatch[1]]
        tokens.push(<span key={key++} className="dc-mention">#{name || chMatch[1]}</span>)
        i += chMatch[0].length
        continue
      }

      const roleMatch = rest.match(/^<@&(\d+)>/)
      if (roleMatch) {
        const role = roleMap[roleMatch[1]]
        const hex = role?.color ? `#${role.color.toString(16).padStart(6, '0')}` : undefined
        const r = role?.color ? (role.color >> 16) & 255 : 0
        const g = role?.color ? (role.color >> 8) & 255 : 0
        const b = role?.color ? role.color & 255 : 0
        const style = role && role.color
          ? { color: hex, background: `rgba(${r},${g},${b},0.15)` }
          : undefined
        tokens.push(<span key={key++} className="dc-mention" style={style}>@{role ? role.name : roleMatch[1]}</span>)
        i += roleMatch[0].length
        continue
      }

      const userMatch = rest.match(/^<@!?(\d+)>/)
      if (userMatch) {
        tokens.push(<span key={key++} className="dc-mention">@{userMatch[1]}</span>)
        i += userMatch[0].length
        continue
      }

      const emojiMatch = rest.match(/^<a?:(\w+):(\d+)>/)
      if (emojiMatch) {
        const animated = rest[1] === 'a'
        tokens.push(
          <img
            key={key++}
            src={`https://cdn.discordapp.com/emojis/${emojiMatch[2]}.${animated ? 'gif' : 'png'}`}
            alt={emojiMatch[1]}
            className="dc-emoji"
          />
        )
        i += emojiMatch[0].length
        continue
      }

      const tsMatch = rest.match(/^<t:(\d+)(?::([tTdDfFR]))?>/)
      if (tsMatch) {
        const d = new Date(parseInt(tsMatch[1], 10) * 1000)
        const formatted = isNaN(d.getTime()) ? tsMatch[0] : d.toLocaleString('es-UY', { dateStyle: 'long', timeStyle: 'short' })
        tokens.push(<span key={key++} className="dc-ts">{formatted}</span>)
        i += tsMatch[0].length
        continue
      }

      const urlMatch = rest.match(/^https?:\/\/[^\s<]+/)
      if (urlMatch) {
        tokens.push(<a key={key++} href={urlMatch[0]} target="_blank" rel="noreferrer" className="dc-link">{urlMatch[0]}</a>)
        i += urlMatch[0].length
        continue
      }

      if (rest.startsWith('**')) {
        const end = rest.indexOf('**', 2)
        if (end !== -1) {
          tokens.push(<strong key={key++}>{processLine(rest.slice(2, end))}</strong>)
          i += end + 2
          continue
        }
      }

      if (rest.startsWith('~~')) {
        const end = rest.indexOf('~~', 2)
        if (end !== -1) {
          tokens.push(<s key={key++}>{processLine(rest.slice(2, end))}</s>)
          i += end + 2
          continue
        }
      }

      if (rest.startsWith('__')) {
        const end = rest.indexOf('__', 2)
        if (end !== -1) {
          tokens.push(<u key={key++}>{processLine(rest.slice(2, end))}</u>)
          i += end + 2
          continue
        }
      }

      if (rest.startsWith('*') && !rest.startsWith('**')) {
        const end = rest.indexOf('*', 1)
        if (end !== -1) {
          tokens.push(<em key={key++}>{processLine(rest.slice(1, end))}</em>)
          i += end + 1
          continue
        }
      }

      if (rest.startsWith('```')) {
        const end = rest.indexOf('```', 3)
        if (end !== -1) {
          tokens.push(<code key={key++} className="dc-code-block">{rest.slice(3, end)}</code>)
          i += end + 3
          continue
        }
      }

      if (rest[0] === '`') {
        const end = rest.indexOf('`', 1)
        if (end !== -1) {
          tokens.push(<code key={key++} className="dc-code">{rest.slice(1, end)}</code>)
          i += end + 1
          continue
        }
      }

      tokens.push(<span key={key++}>{line[i]}</span>)
      i++
    }

    return tokens
  }

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li]

    if (line.startsWith('### ')) {
      parts.push(<h3 key={key++} className="dc-h3">{processLine(line.slice(4))}</h3>)
      continue
    }
    if (line.startsWith('## ')) {
      parts.push(<h4 key={key++} className="dc-h4">{processLine(line.slice(3))}</h4>)
      continue
    }
    if (line.startsWith('# ')) {
      parts.push(<h4 key={key++} className="dc-h4">{processLine(line.slice(2))}</h4>)
      continue
    }
    if (line.startsWith('> ')) {
      parts.push(
        <blockquote key={key++} className="dc-bq">
          {processLine(line.slice(2))}
        </blockquote>
      )
      continue
    }

    const inline = processLine(line)
    if (inline.length > 0) {
      parts.push(<p key={key++} className="dc-p">{inline}</p>)
    }
  }

  return parts
}

export default function NotificacionesPage() {
  const [data, setData] = useState<Notification[] | null>(null)
  const [chMap, setChMap] = useState<Record<string, string>>({})
  const [roleMap, setRoleMap] = useState<Record<string, { name: string; color: number }>>({})
  const [channelIdMap, setChannelIdMap] = useState<Record<string, string>>({})
  const [channel, setChannel] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/notifications')
      .then((r) => r.json())
      .then((res: any) => {
        setData(res.messages)
        setChMap(res.channels || {})
        setRoleMap(res.roles || {})
        setChannelIdMap(res.channelIdMap || {})
      })
      .catch(() => setData([]))
  }, [])

  const groups = useMemo(() => {
    if (!data) return {}
    const g: Record<string, Notification[]> = {}
    for (const m of data) {
      if (!g[m.channelName]) g[m.channelName] = []
      g[m.channelName].push(m)
    }
    return g
  }, [data])

  const channelNames = Object.keys(groups)

  useEffect(() => {
    if (!channel && channelNames.length > 0) setChannel(channelNames[0])
  }, [channel, channelNames])

  const messages = channel ? groups[channel] || [] : []

  const dateGroups = useMemo(() => {
    const g: { dateKey: string; displayDate: string; msgs: Notification[] }[] = []
    let curKey = ''
    let curDisplay = ''
    let curMsgs: Notification[] | null = null
    for (const m of messages) {
      const d = new Date(m.timestamp)
      const key = d.toLocaleDateString('es-UY', { year:'numeric', month:'2-digit', day:'2-digit' })
      const display = d.toLocaleDateString('es-UY', { day:'numeric', month:'long', year:'numeric' })
      if (key !== curKey) {
        if (curMsgs) g.push({ dateKey: curKey, displayDate: curDisplay, msgs: curMsgs })
        curKey = key
        curDisplay = display
        curMsgs = []
      }
      curMsgs!.push(m)
    }
    if (curMsgs) g.push({ dateKey: curKey, displayDate: curDisplay, msgs: curMsgs })
    return g
  }, [messages])

  const discordGuildId = '1333180919112273993'

  return (
    <>
      <Header />
      <main className="form-page">
        <section className="hero-small">
          <div className="hero-small-content">
            <span className="hero-badge">Notificaciones</span>
            <h1>Últimas Notificaciones</h1>
            <p>Selecciona un canal para ver sus mensajes.</p>
          </div>
        </section>

        <section className="nv-section">
          {!data ? (
            <p className="nv-empty">Cargando...</p>
          ) : data.length === 0 ? (
            <p className="nv-empty">No hay notificaciones.</p>
          ) : (
            <>
              <div className="nv-channels">
                {channelNames.map((name) => (
                  <button
                    key={name}
                    className={`nv-channel-btn${channel === name ? ' active' : ''}`}
                    onClick={() => setChannel(name)}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <div className="nv-feed">
                {dateGroups.map((dg) => (
                  <div key={dg.dateKey}>
                    <div className="nv-date-divider">{dg.displayDate}</div>
                    {dg.msgs.map((m) => (
                      <article key={m.id} className="nv-msg">
                        <img src={m.author.avatar || '/assets/ugblanco.svg'} alt="" className="nv-avatar" />
                        <div className="nv-body">
                          <div className="nv-head">
                            <span className="nv-name">
                              {m.author.username}
                              {m.author.bot && <span className="nv-bot">BOT</span>}
                            </span>
                            <span className="nv-time">
                              {new Date(m.timestamp).toLocaleString('es-UY', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                              {m.editedTimestamp && <span className="nv-edited"> (editado)</span>}
                            </span>
                          </div>

                      {m.content && (
                        <div className="nv-content">
                          {parseDiscord(m.content, chMap, roleMap)}
                        </div>
                      )}

                      {m.embeds.map((e: any, i: number) => {
                        const bc = e.color ? `#${e.color.toString(16).padStart(6, '0')}` : undefined
                        return (
                          <div key={i} className="nv-embed" style={bc ? { borderLeftColor: bc } : undefined}>
                            {e.author && (
                              <div className="nv-embed-author">
                                {e.author.icon_url && <img src={e.author.icon_url} alt="" className="nv-embed-author-icon" />}
                                {e.author.name}
                              </div>
                            )}
                            {e.title && (
                              e.url
                                ? <a href={e.url} target="_blank" rel="noreferrer" className="nv-embed-title">{e.title}</a>
                                : <div className="nv-embed-title">{e.title}</div>
                            )}
                            {e.description && <p className="nv-embed-desc">{e.description}</p>}
                            {e.fields && e.fields.length > 0 && (
                              <div className="nv-embed-fields">
                                {e.fields.map((f: any, fi: number) => (
                                  <div key={fi} className={`nv-embed-field${f.inline ? ' inline' : ''}`}>
                                    <span className="nv-embed-field-name">{f.name}</span>
                                    <span className="nv-embed-field-value">{f.value}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            {e.image && <img src={e.image.url} alt="" className="nv-embed-img" />}
                            {e.footer && (
                              <div className="nv-embed-footer">
                                {e.footer.icon_url && <img src={e.footer.icon_url} alt="" className="nv-embed-footer-icon" />}
                                {e.footer.text}
                              </div>
                            )}
                          </div>
                        )
                      })}

                      {m.attachments.length > 0 && (
                        <div className="nv-attachments">
                          {m.attachments.map((a: any, i: number) => (
                            a.width && a.height
                              ? <img key={i} src={a.url} alt={a.filename} className="nv-attach-img" />
                              : <a key={i} href={a.url} target="_blank" rel="noreferrer" className="nv-attach-file">{a.filename}</a>
                          ))}
                        </div>
                      )}

                      {m.stickerItems.length > 0 && (
                        <div className="nv-stickers">
                          {m.stickerItems.map((s) => (
                            <StickerImage key={s.id} id={s.id} name={s.name} formatType={s.formatType} />
                          ))}
                        </div>
                      )}

                      {m.reactions.length > 0 && (
                        <div className="nv-reactions">
                          {m.reactions.map((r, i) => (
                            <span key={i} className="nv-reaction">
                              {r.emojiUrl
                                ? <img src={r.emojiUrl} alt={r.emoji} className="nv-reaction-img" />
                                : <span className="nv-reaction-emoji">{r.emoji}</span>
                              }
                              <span className="nv-reaction-count">{r.count}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                ))}
                </div>
              ))}
              {channel && channelIdMap[channel] && (
                <a
                  href={`https://discord.com/channels/${discordGuildId}/${channelIdMap[channel]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="nv-more-link"
                >
                  Ver más mensajes en Discord ↗
                </a>
              )}
            </div>
            </>
          )}
        </section>
      </main>
      <Footer />

      <style>{`
        html { scrollbar-gutter: stable; }
        .hero-small h1 { font-family: 'Cinzel', serif; font-size: clamp(2rem, 5vw, 3.5rem); }
        .hero-badge { font-family: 'Cinzel', serif; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .nv-section { max-width: 46rem; margin: 0 auto; padding: 0 1rem 5rem; }
        .nv-empty { text-align: center; opacity: 0.5; padding: 3rem 0; font-size: 0.9rem; }

        .nv-channels { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; justify-content: center; }
        .nv-channel-btn {
          padding: 0.5rem 1.1rem; border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.5); font-size: 0.85rem; font-weight: 600;
          font-family: 'Cinzel', serif;
          cursor: pointer; transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .nv-channel-btn:hover { border-color: rgba(255,255,255,0.15); color: #fff; }
        .nv-channel-btn.active { border-color: #b06040; background: rgba(176,96,64,0.1); color: #b06040; }

        .nv-feed { display: flex; flex-direction: column; }
        .nv-msg {
          display: flex; gap: 0.75rem; padding: 0.6rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .nv-msg:last-child { border-bottom: none; }
        .nv-avatar { width: 2.25rem; height: 2.25rem; border-radius: 50%; flex-shrink: 0; background: rgba(255,255,255,0.05); margin-top: 0.15rem; }
        .nv-body { flex: 1; min-width: 0; }
        .nv-head { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.2rem; }
        .nv-name { font-weight: 600; font-size: 0.88rem; color: #fff; display: flex; align-items: center; gap: 0.35rem; }
        .nv-bot { font-size: 0.55rem; font-weight: 700; text-transform: uppercase; background: #b06040; color: #fff; padding: 0.05rem 0.3rem; border-radius: 0.2rem; }
        .nv-time { font-size: 0.7rem; opacity: 0.35; }
        .nv-edited { font-style: italic; }
        .nv-content { font-size: 0.88rem; line-height: 1.6; word-break: break-word; color: #fff; }
        .nv-content p { margin: 0.2rem 0; }
        .nv-content h3, .nv-content h4 { font-family: 'Cinzel', serif; color: #fff; margin: 0.4rem 0 0.2rem; font-weight: 700; }
        .nv-content h3 { font-size: 1rem; }
        .nv-content h4 { font-size: 0.9rem; }
        .nv-content blockquote {
          margin: 0.2rem 0; padding-left: 0.6rem;
          border-left: 3px solid #b06040;
          opacity: 0.7;
        }
        .dc-mention { background: rgba(176,96,64,0.15); color: #b06040; padding: 0.05rem 0.3rem; border-radius: 0.25rem; font-weight: 600; font-size: 0.85rem; }
        .dc-ts { background: rgba(255,255,255,0.04); padding: 0.05rem 0.3rem; border-radius: 0.25rem; font-size: 0.85rem; white-space: nowrap; }
        .dc-emoji { width: 1.3rem; height: 1.3rem; vertical-align: middle; object-fit: contain; }
        .dc-code { background: rgba(255,255,255,0.06); padding: 0.1rem 0.3rem; border-radius: 0.25rem; font-size: 0.82rem; font-family: monospace; }
        .dc-code-block { display: block; background: rgba(0,0,0,0.3); padding: 0.5rem; border-radius: 0.4rem; font-size: 0.82rem; font-family: monospace; white-space: pre; margin: 0.3rem 0; overflow-x: auto; }
        .dc-link { color: #6080c0; text-decoration: none; }
        .dc-link:hover { text-decoration: underline; }

        .nv-embed { margin-top: 0.4rem; border-left: 4px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.02); border-radius: 0 0.4rem 0.4rem 0; padding: 0.5rem 0.65rem; }
        .nv-embed-author { display: flex; align-items: center; gap: 0.35rem; font-size: 0.78rem; font-weight: 600; opacity: 0.7; margin-bottom: 0.2rem; }
        .nv-embed-author-icon { width: 1.1rem; height: 1.1rem; border-radius: 50%; }
        .nv-embed-title { font-weight: 700; font-size: 0.85rem; color: #b06040; text-decoration: none; display: block; margin-bottom: 0.2rem; }
        .nv-embed-title:hover { text-decoration: underline; }
        .nv-embed-desc { font-size: 0.8rem; opacity: 0.6; line-height: 1.5; white-space: pre-wrap; }
        .nv-embed-fields { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem; }
        .nv-embed-field { flex: 1 1 100%; }
        .nv-embed-field.inline { flex: 1 1 auto; min-width: 7rem; }
        .nv-embed-field-name { display: block; font-size: 0.75rem; font-weight: 600; opacity: 0.7; margin-bottom: 0.1rem; }
        .nv-embed-field-value { display: block; font-size: 0.78rem; opacity: 0.5; line-height: 1.4; white-space: pre-wrap; }
        .nv-embed-img { max-width: 100%; border-radius: 0.4rem; margin-top: 0.4rem; }
        .nv-embed-footer { display: flex; align-items: center; gap: 0.3rem; font-size: 0.7rem; opacity: 0.4; margin-top: 0.4rem; }
        .nv-embed-footer-icon { width: 0.9rem; height: 0.9rem; border-radius: 50%; }
        .nv-attachments { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem; }
        .nv-attach-img { max-width: 100%; border-radius: 0.4rem; max-height: 18rem; object-fit: cover; }
        .nv-attach-file { font-size: 0.78rem; color: #b06040; text-decoration: none; padding: 0.25rem 0.5rem; border: 1px solid rgba(255,255,255,0.08); border-radius: 0.35rem; }
        .nv-attach-file:hover { border-color: #b06040; }
        .nv-stickers { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.4rem; }
        .nv-sticker { width: 10rem; max-width: 100%; border-radius: 0.4rem; }
        .nv-sticker-lottie { width: 10rem; height: 10rem; max-width: 100%; }
        .nv-reactions { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.5rem; }
        .nv-reaction { display: inline-flex; align-items: center; gap: 0.2rem; padding: 0.15rem 0.4rem; border: 1px solid rgba(255,255,255,0.06); border-radius: 0.4rem; font-size: 0.82rem; }
        .nv-reaction-img { width: 1rem; height: 1rem; }
        .nv-reaction-emoji { font-size: 1rem; line-height: 1; }
        .nv-more-link { display: block; text-align: center; margin-top: 1.5rem; padding: 0.6rem 1.2rem; border-radius: 0.5rem; border: 1px solid rgba(255,255,255,0.1); color: #b06040; font-weight: 600; font-size: 0.85rem; font-family: 'Cinzel', serif; text-decoration: none; transition: border-color 0.2s, background 0.2s; }
        .nv-more-link:hover { border-color: #b06040; background: rgba(176,96,64,0.08); }
        .nv-date-divider { text-align: center; font-size: 0.75rem; opacity: 0.35; font-weight: 600; padding: 1rem 0 0.5rem; letter-spacing: 0.04em; position: relative; }
        .nv-date-divider::before, .nv-date-divider::after { content: ''; position: absolute; top: 50%; height: 1px; background: rgba(255,255,255,0.08); width: calc(50% - 7rem); }
        .nv-date-divider::before { left: 0; }
        .nv-date-divider::after { right: 0; }
      `}</style>
    </>
  )
}
