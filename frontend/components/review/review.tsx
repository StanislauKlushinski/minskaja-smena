import styles from './review.module.css'
import React from 'react'

export default function Review () {

  return (
    <>
      <p className={styles.text}>
        Отзывы и отклики
      </p>
      <textarea
        className={styles.textarea}
        placeholder={'Оставить отзыв...'}
      />
    </>
  )
}