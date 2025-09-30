import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Title from '@/components/structure/title/title'
import Description from '@/components/structure/description/description'
import MySwiper from '@/components/structure/mySwiper/mySwiper'
import MySwiperTitle from '@/components/structure/mySwiperTitle/mySwiperTitle'
import MySwiperButton
  from '@/components/structure/mySwiperButton/mySwiperButton'
import Afterword from '@/components/structure/afterword/afterword'
import Model from '@/components/structure/model/model'

export default function Home () {
  return (
    <div style={{
      background: '#2f3532',
      minHeight: '100%'
    }}>
      <Header/>
      <main>
        <Title/>
        <Description/>
        <Model/>
        <MySwiperTitle/>
        <MySwiper/>
        <MySwiperButton/>
        <Afterword/>
      </main>
      <Footer/>
    </div>
  )
}
