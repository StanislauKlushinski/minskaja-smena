import type { Metadata } from 'next'
import StoreProvider from '@/services/storeProvider'
import './globals.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'Models',
  description: 'Models viewer'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ru'>
    <body>
    <StoreProvider>
      {children}
    </StoreProvider>
    </body>
    </html>
  )
}
