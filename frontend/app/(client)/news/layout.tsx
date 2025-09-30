import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Новости'
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
