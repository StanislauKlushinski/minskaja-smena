import styles from './title.module.css'
import React from 'react'

export default function Title () {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Костёл святого Антония
      </h1>
      <svg width='275' height='21' viewBox='0 0 275 21' fill='none'
           xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0 7.5H78.5C92.8333 6.16666 120.2 6 115 16C108.5 28.5 133.5 7.49999 137 13.5C140.5 19.5 226.5 -12.5 188.5 7.5C158.1 23.5 190.167 18.1667 210 13.5C217.6 8.7 257.167 7.5 275 7.5'
          stroke='#FDFDFD' strokeOpacity='0.54'/>
      </svg>

    </div>
  )
}