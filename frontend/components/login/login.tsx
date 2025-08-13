import React from 'react'
import Auth from '@/components/auth/auth'
import styles from '@/components/login/login.module.css'
import Form from '@/components/login/form/form'

export default function Login () {
  return (
    <Auth redirectUrl={'/'} isAuthPage={true}>
      <div className={styles.index}>
        <div className={styles.container}>
          <h1>
            Название
          </h1>
          <h2>
            Описание
          </h2>

          <Form/>
        </div>
      </div>
    </Auth>
  )
}
