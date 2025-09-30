import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Authors from '@/components/aboutUs/authors/authors'
import Description from '@/components/aboutUs/description/description'

export default function Home () {
  return (
    <div style={{
      background: '#363253',
      minHeight: '100%'
    }}>
      <Header/>
      <main>
        <Authors/>
        <Description/>
      </main>
      <Footer/>
    </div>
  )
}
