import styles from './description.module.css'
import React from 'react'
import descriptionImg from '@/assets/map/description.png'
import lightbulb from '@/assets/map/lightbulb.png'
import Image from 'next/image'

export default function Description () {

  return (
    <>
      <div className={styles.description}>
        <p>
          На этой карте отмечены объекты архитектурного наследия Беларуси,
          находящиеся в состоянии утраты, разрушения или реконструкции.
        </p>
        <p>
          Каждый из них — это история, которую мы возвращаем: через фиксацию,
          визуализацию и проект восстановления.
        </p>
        <p>
          Вы можете исследовать объекты по регионам, эпохам и типам. При клике —
          откроется их путь: от прошлого к будущему.
        </p>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src={descriptionImg}
          alt={'descriptionImg'}
          width={203}
          height={203}
          className={styles.img}
        />
        <p>
          Пусть эта карта станет местом, где прошлое не исчезает, а находит
          новое дыхание. Где руины становятся началом.
        </p>
      </div>
      <div className={styles.addObjContainer}>
        <Image
          src={lightbulb}
          alt={'lightbulb'}
          width={41}
          height={41}
        />
        <div>
          <p>
            Добавить объект на карту
          </p>
          <p>
            Если вы знаете архитектурный памятник, который нуждается в фиксации
            или восстановлении — напишите нам.
            <br/>
            Мы рассмотрим возможность
            включения его в проект.
          </p>
          <button>
            Добавить объект
          </button>
        </div>
      </div>
    </>
  )
}