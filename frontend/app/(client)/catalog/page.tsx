import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import CatalogOfStructures
  from '@/components/catalogOfStructures/catalogOfStructures'

export default function Home () {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #555049 0%, #97918A 51.44%)',
      minHeight: '100%'
    }}>
      <Header/>
      <main>
        <CatalogOfStructures
          type={'founded'}
        />
        <CatalogOfStructures
          type={'inDev'}
        />
        <CatalogOfStructures
          type={'toDev'}
        />
      </main>
      <Footer/>
    </div>
  )
}
