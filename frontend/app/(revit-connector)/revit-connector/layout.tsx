import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Revit',
  description: 'Revit connector'
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
