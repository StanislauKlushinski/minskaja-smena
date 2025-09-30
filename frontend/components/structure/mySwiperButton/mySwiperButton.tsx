import styles from './mySwiperButton.module.css'
import React from 'react'

export default function MySwiperButton () {

  return (
    <div className={styles.container}>
      <button className={styles.button}>
        посмотреть <br/>панораму
      </button>
    </div>
  )
}