import styles from './theses.module.css'
import React from 'react'
import Image from 'next/image'
import langs from '@/assets/langs.png'
import these1 from '@/assets/these1.png'
import these2 from '@/assets/these2.png'

export default function Theses () {

  return (
    <div className={styles.container}>
      <Image
        src={langs}
        width={97}
        height={29}
        alt='langs'
        style={{
          position: 'absolute',
          top: 12,
          left: 9
        }}
      />
      <div className={styles.theses}>
        <div className={styles.these}>
          <Image
            src={these1}
            width={51}
            height={51}
            alt='these1'
          />
          <h2>
            Сохраняем архитектурную память
          </h2>
          <p>
            Мы фиксируем текущее состояние утраченных и разрушающихся памятников
            архитектуры Беларуси, собираем их историю, визуальные данные и
            создаём цифровые модели — чтобы сохранить то, что ещё можно спасти.
          </p>
        </div>
        <div className={styles.these}>
          <Image
            src={these2}
            width={51}
            height={51}
            alt='these2'
          />
          <h2>
            Проектируем будущее реконструкции
          </h2>
          <p>
            Каждый объект получает предложение по восстановлению: от эскизного
            проекта до архитектурной концепции. Мы объединяем исследование,
            визуализацию и идеи для привлечения инвестиций и возрождения
            культурной среды.
          </p>
        </div>
      </div>
      <h2 className={styles.title}>
        «Архитектура, которую мы помним»
      </h2>
    </div>
  )
}