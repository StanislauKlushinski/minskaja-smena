import styles from './columns.module.css'
import React from 'react'
import Link from 'next/link'
import columns from '@/assets/columns.png'
import Image from 'next/image'

export default function Columns () {

  return (
    <div className={styles.columns}>
      <div
        className={styles.title}
        style={{
          zIndex: 10,
          position: 'relative'
        }}
      >
        ТИМ - туризм
      </div>
      <div
        className={styles.text}
        style={{
          zIndex: 10,
          position: 'relative'
        }}
      >
        УТРАЧЕНО, НО НЕ ЗАБЫТО
      </div>
      <Link
        href={'/catalog'}
        className={styles.link}
        style={{
          zIndex: 10,
          position: 'relative'
        }}
      >
        Перейти в каталог
      </Link>
      <Image
        src={columns}
        width={287}
        height={287}
        alt='columns'
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: -3,
          right: 37
        }}
      />
    </div>
  )
}