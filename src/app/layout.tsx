import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import PageReveal from '@/components/PageReveal'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  metadataBase: new URL('https://urugordos.discloud.app'),
  title: {
    default: 'Urugordos',
    template: 'Urugordos - %s',
  },
  description: 'Comunidad de Urugodd en Discord. Únete y sé parte.',
  icons: { icon: '/assets/ugblanco.svg' },
  openGraph: {
    title: 'Urugordos',
    description: 'Comunidad de Urugodd en Discord. Únete y sé parte.',
    siteName: 'Urugordos',
    type: 'website',
    images: [{ url: '/assets/ugblanco.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary',
    title: 'Urugordos',
    description: 'Comunidad de Urugodd en Discord. Únete y sé parte.',
    images: ['/assets/ugblanco.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{'@keyframes prFade{0%{opacity:0;transform:translateY(6px) scale(.99)}100%{opacity:1;transform:translateY(0) scale(1)}}'}</style>
      </head>
      <body>
        <PageReveal>{children}</PageReveal>
        <BackToTop />
      </body>
    </html>
  )
}
