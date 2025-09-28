import styles from './revitConnector.module.css'

import React from 'react'
import Header from '@/components/revitConnector/header/header'
import Auth from '@/components/auth/auth'
import Main from '@/components/revitConnector/main/main'

export default function RevitConnector () {
  return (
    <Auth redirectUrl={'/revit-connector/login'}>
      <div className={styles.container}>
        <Header/>
        <Main/>
      </div>
    </Auth>
  )
}
