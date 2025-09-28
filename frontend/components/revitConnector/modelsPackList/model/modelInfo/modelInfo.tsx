import styles from './modelInfo.module.css'
import React from 'react'
import { IModelShort } from '@/utils/interface'

function dateToString (date: Date) {
  return `${date.getMonth() +
  1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes() <
  10 ? '0' + date.getMinutes().toString() : date.getMinutes()}`
}

export default function ModelInfo ({
  createdAt,
  updatedAt,
  description
}: IModelShort) {
  return (
    <ul className={styles.modelInfo}>
      <li>
        Создан: {dateToString(new Date(createdAt.date))}
      </li>
      <li>
        Изменён: {dateToString(new Date(updatedAt.date))}
      </li>
      {
        description ? (
          <li
            style={{
              textAlign: 'justify'
            }}
          >
            <br/>
            Описание: {description}
          </li>
        ) : null
      }
    </ul>
  )
}