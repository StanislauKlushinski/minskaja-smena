import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import NewsList from '@/components/news/newsList/newsList'
import GoalsList from '@/components/news/goalsList/goalsList'
import Description from '@/components/news/description/description'
import Mail from '@/components/news/mail/mail'

export default function Home () {
  return (
    <div style={{
      background: '#474b5a',
      minHeight: '100%'
    }}>
      <Header/>
      <main>
        <NewsList/>
        <GoalsList/>
        <Description/>
        <Mail/>
      </main>
      <Footer/>
    </div>
  )
}
