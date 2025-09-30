import type { Metadata } from 'next'
import StoreProvider from '@/services/storeProvider'
import './globals.css'
import React from 'react'
import { Brygada_1918, Inter } from 'next/font/google'

const brygada = Brygada_1918({
  subsets: ['latin', 'cyrillic'], // если нужен русский текст
  weight: ['400', '500', '600', '700'], // какие толщины грузить
  style: ['normal', 'italic'] // если нужна курсивная версия
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'], // если нужен русский текст
  weight: ['400', '500', '600', '700'], // какие толщины грузить
  style: ['normal', 'italic'] // если нужна курсивная версия
})
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
    <body className={`${brygada.className} ${inter.className}`}>
    <StoreProvider>
      {children}
      <div id='next-modals'></div>
    </StoreProvider>
    </body>
    </html>
  )
}
