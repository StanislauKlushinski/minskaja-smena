import styles from './contacts.module.css'
import React from 'react'

export default function Contacts () {

  return (
    <div className={styles.container}>
      <div className={styles.contact}>
        <h2 className={styles.title}>
          Адрес
        </h2>
        <p className={styles.text}>
          Минск, Первомайский район
          <br/>
          (точный адрес по запросу)
        </p>
      </div>

      <div className={styles.contact}>
        <h2 className={styles.title}>
          Телефон
        </h2>
        <p className={styles.text}>
          +375 (XX) XXX-XX-XX
        </p>
      </div>

      <p className={styles.subtext}>
        (звонки принимаются в будние дни с 10:00 до 18:00)
      </p>

      <div className={styles.contact}>
        <h2 className={styles.title}>
          Электронная почта
        </h2>
        <p className={styles.text}>
          hello@названиесайта.by
        </p>
      </div>

      <p className={styles.subtext}>
        (ответ в течение 1–2 рабочих дней)
      </p>

      <div className={styles.contact}>
        <h2 className={styles.title}>
          Социальные сети
        </h2>
        <p className={styles.text}>
          @хххх
        </p>
      </div>
    </div>
  )
}