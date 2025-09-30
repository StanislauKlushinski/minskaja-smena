import styles from './afterword.module.css'
import React from 'react'

export default function Afterword () {

  return (
    <div className={styles.container}>
      <p className={styles.afterword}>
        Работа над виртуальной реконструкцией костёла Святого Антония стала
        первым опытом создания трёхмерной модели утраченного архитектурного
        памятника. Основной целью проекта было сохранение историко-культурного
        наследия с помощью технологий информационного моделирования зданий
        (BIM).
      </p>
      <div className={styles.rules}>
        <div className={styles.rule}>
          Модель не является точной исторической копией — из-за нехватки данных
          о внутреннем убранстве и деталях.
        </div>
        <div className={styles.rule}>
          Все размеры соблюдены пропорционально, с учётом масштабов и анализа
          изображений.
        </div>
        <div className={styles.rule}>
          Некоторые элементы были реконструированы по аналогии или созданы на
          основе предположений.
        </div>
      </div>
    </div>
  )
}