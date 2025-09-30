import styles from './header.module.css'
import React from 'react'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Link from 'next/link'

export default function Header () {
  const urls: {
    title: string
    url: string
  }[] = [
    {
      title: 'Главная',
      url: '/'
    },
    {
      title: 'Каталог',
      url: '/catalog'
    },
    {
      title: 'Карта',
      url: '/map'
    },
    {
      title: 'Новости',
      url: '/news'
    },
    {
      title: 'О нас',
      url: '/about-us'
    },
    {
      title: 'Контакты',
      url: '/contacts'
    }
  ]

  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Image
          src={logo}
          width={33}
          height={33}
          alt='logo'
        />
        <span className={styles.logoSpan}>ТЕХНОЛОГИЯ ИНФОРМАЦИОННОГО МОДЕЛИРОВАНИЯ</span>
        <input placeholder={'Найти памятник...'} className={styles.input}
               type='text'/>
      </div>
      <div className={styles.headerBottom}>
        {urls.map(url => (
          <Link
            href={url.url}
            className={styles.link}
            key={url.url}
          >
            {url.title}
          </Link>
        ))}
      </div>
    </header>
  )
}