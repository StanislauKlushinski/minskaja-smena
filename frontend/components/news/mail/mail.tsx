import styles from './mail.module.css'
import React from 'react'
import Image from 'next/image'
import mail from '@/assets/news/mail.png'

export default function Mail () {

  return (
    <div className={styles.container}>
      <div>
        <input type='text' placeholder={'Введите электронную почту...'}/>
        <button>ПОДПИСАТЬСЯ</button>
      </div>
      <Image
        src={mail}
        alt={'mail'}
        width={73}
        height={73}
      />
    </div>
  )
}