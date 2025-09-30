import styles from './authors.module.css'
import React from 'react'

const authors: {
  name: string
  role: string
  description: string
  type: 'withHref' | 'common' | 'wide'
}[] = [
  {
    name: 'Кашковский Владислав андреевич',
    role: 'Ведущий автор проекта',
    description: 'Техник-проектировщик УП "Минскпроект" Студент АФ БНТУ',
    type: 'withHref'
  },
  {
    name: 'клышинский станислав евгеньевич',
    role: 'Автор технического решения',
    description: 'Студент МСФ БНТУ',
    type: 'common'
  },
  {
    name: 'Гвоздь вера евгеньевна',
    role: 'Автор дизайн-решения',
    description: 'Учащаяся УО "Минский государственный колледж Архитектуры и строительства"',
    type: 'common'
  },
  {
    name: 'очерет екатерина васильевна',
    role: 'Куратор',
    description: 'Начальник отдела исторической застройки, благоустройства, рекламы и городского дизайна Комитета архитектуры и градостроительства Мингорисполкома',
    type: 'wide'
  },
  {
    name: 'Ладисова Галина Петровна',
    role: 'Куратор',
    description: 'Директор ГУ “Музей истории города Минска”',
    type: 'wide'
  }
]

export default function Authors () {

  return (
    <div className={styles.container}>
      {authors.map(author => (
        <div key={author.name}
             className={`${styles.author} ${author.type === 'wide'
               ? styles.wide
               : ''}`}>
          <h3 className={styles.name}>
            {author.name}
          </h3>
          <p className={styles.role}>
            {author.role}
          </p>
          <p className={styles.description}>
            {author.description}
          </p>
          {author.type === 'withHref' ? (
            <button className={styles.button}>
              Развернуть
            </button>
          ) : null}
        </div>
      ))}
    </div>
  )
}