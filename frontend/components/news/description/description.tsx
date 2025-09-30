import styles from './description.module.css'
import React from 'react'

export default function Description () {

  return (
    <div className={styles.container}>
      <h3>
        Следите за новыми открытиями!
      </h3>
      <p>
        Выберите направления, которые вам близки — мы будем присылать только то,
        что откликается
      </p>
      <div>
        <button>
          Архитектура
        </button>
        <button>
          Интерактивные маршруты
        </button>
        <button>
          Архивные документы
        </button>
        <button>
          Аудиоистории
        </button>
      </div>
    </div>
  )
}