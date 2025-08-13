import Auth from '@/components/auth/auth'
import React from 'react'

export default function Home () {
  return (
    <Auth redirectUrl={'/login'}>
      <h1>
        Main page
      </h1>
    </Auth>
  )
}
