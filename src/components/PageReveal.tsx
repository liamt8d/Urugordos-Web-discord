'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

export default function PageReveal({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="pr-w" key={pathname}>
      {children}
    </div>
  )
}