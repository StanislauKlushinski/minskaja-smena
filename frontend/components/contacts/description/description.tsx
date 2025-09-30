import styles from './description.module.css'
import React from 'react'

export default function Description () {

  return (
    <div className={styles.description}>
      <h2 className={styles.title}>
        Связаться с нами
      </h2>
      <p className={styles.text}>
        Мы открыты к диалогу. Если вы знаете архитектурный памятник, который
        нуждается в фиксации, хотите предложить идею, поделиться архивными
        материалами или просто задать вопрос — напишите нам. Каждое сообщение
        для
        нас важно.
      </p>
    </div>
  )
}