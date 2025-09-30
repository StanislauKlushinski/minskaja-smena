import styles from './controls.module.css'
import React from 'react'

export default function Controls () {

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <button className={styles.filter}>
          Тип
        </button>
        <button className={styles.filter}>
          Состояние
        </button>
        <button className={styles.filter}>
          Регион
        </button>
        <button className={styles.filter}>
          Период
        </button>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>
          Сбросить
        </button>
        <button className={styles.button}>
          Показать результаты
        </button>
      </div>
    </div>
  )
}