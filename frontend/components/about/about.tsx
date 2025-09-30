import styles from './about.module.css'
import React from 'react'
import Link from 'next/link'
import drawing from '@/assets/drawing.png'
import Image from 'next/image'

export default function About () {

  return (
    <>
      <Link href={'/catalog'} className={styles.link}>
        Перейти в каталог
      </Link>
      <Image
        src={drawing}
        alt={'drawing'}
        width={383}
        height={170}
        className={styles.img}
      />
      <div>
        <p className={styles.text}>
          ТИМ-туризм — это способ увидеть архитектурный памятник не только как
          руину, но как живую историю.
          Каждый объект проходит путь:
        </p>
        <p className={styles.text}>
          1. Фиксация текущего состояния <br/>
          2. Сбор исторических данных<br/>
          3. Визуальная реконструкция<br/>
          4. Создание туристического маршрута<br/>
          5. Публикация на платформе<br/>
        </p>
        <p className={styles.textBold}>
          Вы может пройти этот путь вместе с объектом — от прошлого к будущему!
        </p>
      </div>
    </>
  )
}