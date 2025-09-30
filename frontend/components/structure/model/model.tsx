import styles from './model.module.css'
import React from 'react'
import modelImg from '@/assets/structure/model.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Model () {

  return (
    <div className={styles.model}>
      <Link href={'/catalog/kostel-sv-antoniya-oglavlenie/model'}>
        <Image
          src={modelImg}
          alt={'modelImg'}
          width={346}
          height={263}
        />
      </Link>
    </div>
  )
}