import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Главная страница'
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
