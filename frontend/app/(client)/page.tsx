import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Columns from '@/components/columns/columns'
import Theses from '@/components/theses/theses'
import Map from '@/components/map/map'
import About from '@/components/about/about'
import Review from '@/components/review/review'

export default function Home () {
  return (
    <div style={{
      background: '#171c12',
      minHeight: '100%'
    }}>
      <Header/>
      <Columns/>
      <main
        style={{
          overflow: 'hidden'
        }}
      >
        <Theses/>
        <Map/>
        <About/>
        <Review/>
      </main>
      <Footer/>
    </div>
  )
}
