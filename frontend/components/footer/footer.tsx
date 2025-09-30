'use client'
import styles from './footer.module.css'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import coat from '@/assets/coat.png'
import minskCoat from '@/assets/minskCoat.png'
import logoq from '@/assets/logoq.png'
import district1 from '@/assets/district1.png'
import district2 from '@/assets/district2.png'
import district3 from '@/assets/district3.png'
import year2025 from '@/assets/year2025.png'
import minksProect from '@/assets/minksProect.png'
import logoMgask from '@/assets/logoMgask.png'
import { usePathname } from 'next/navigation'

export default function Footer () {
  const pathname = usePathname()
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
    <footer className={styles.footer}>
      <div className={styles.links}>
        {urls.map(url => (
          <div key={url.url} className={styles.link} style={{
            backgroundColor: url.url === pathname ? '#959595' : undefined
          }}>
            <Link href={url.url}>
              {url.title}
            </Link>
          </div>
        ))}
      </div>
      <div style={{
        display: 'flex',
        marginTop: 25
      }}>
        <div className={styles.footerContacts}>
          <span>
            +375-00-000-00-00
          </span>
          <span>
            xxxxxxx@gmail.com
          </span>
        </div>
        <div
          style={{
            padding: '0 10px'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'end'
          }}>
            <Image
              src={coat}
              width={40}
              height={40}
              alt='coat'
            />
            <Image
              src={minskCoat}
              width={33}
              height={39}
              alt='minskCoat'
              style={{ marginLeft: 2 }}
            />
            <div
              className={styles.footerText}
            >
              МИНСКИЙ ГОРОДСКОЙ ИСПОЛНИТЕЛЬНЫЙ КОМИТЕТ
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end'
          }}>
            <Image
              src={logoq}
              width={54}
              height={54}
              alt='logoq'
            />
            <Image
              src={district1}
              width={26}
              height={36}
              alt='district1'
              style={{ marginLeft: 37 }}
            />
            <Image
              src={district2}
              width={31}
              height={33}
              alt='district2'
              style={{ marginLeft: 13 }}
            />
            <Image
              src={district3}
              width={36}
              height={34}
              alt='district3'
              style={{ marginLeft: 8 }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end'
            }}>
            <Image
              src={year2025}
              width={89}
              height={46}
              alt='year2025'
            />
            <Image
              src={minksProect}
              width={34}
              height={37}
              alt='minksProect'
              style={{ marginLeft: 17 }}
            />
            <Image
              src={logoMgask}
              width={37}
              height={37}
              alt='logoMgask'
              style={{ marginLeft: 42 }}
            />
          </div>
        </div>
      </div>
      <p className={styles.text}>© 2025 МИНСКАЯ СМЕНА</p>
    </footer>
  )
}