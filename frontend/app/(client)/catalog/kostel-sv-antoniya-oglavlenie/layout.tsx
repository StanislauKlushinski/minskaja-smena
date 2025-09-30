import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Каталог'
}

export default function Layout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {children}
    </>
  )
}
