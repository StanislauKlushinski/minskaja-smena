import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Map from '@/components/mapPage/map/map'
import Description from '@/components/mapPage/description/description'

export default function Home () {
  return (
    <div style={{
      background: '#412b2b',
      minHeight: '100%'
    }}>
      <Header/>
      <main>
        <Map/>
        <Description/>
      </main>
      <Footer/>
    </div>
  )
}
