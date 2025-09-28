import styles from './revitLogin.module.css'
import React from 'react'
import Auth from '@/components/auth/auth'
import Form from '@/components/login/form/form'

export default function RevitLogin () {

  return (
    <Auth redirectUrl={'/revit-connector'} isAuthPage={true}>
      <div className={styles.index}>
        <div className={styles.container}>
          <h1>
            Минская смена
          </h1>
          <h2>
            Revit model converter
          </h2>

          <Form/>
        </div>
      </div>
    </Auth>
  )
}