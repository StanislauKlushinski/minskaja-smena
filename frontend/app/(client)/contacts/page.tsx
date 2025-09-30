import React from 'react'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Contacts from '@/components/contacts/contacts/contacts'
import Description from '@/components/contacts/description/description'
import styles from './page.module.css'

export default function Home () {
  return (
    <div style={{
      minHeight: '100%'
    }}
         className={styles.container}
    >
      <Header/>
      <main>
        <Contacts/>
        <Description/>
      </main>
      <Footer/>
    </div>
  )
}
