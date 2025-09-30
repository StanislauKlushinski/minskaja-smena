import styles from './map.module.css'
import React from 'react'
import map from '@/assets/map.png'
import Image from 'next/image'

export default function Map () {

  return (
    <div className={styles.container}>
      <Image
        src={map}
        alt={'map'}
        width={278}
        height={228}
      />
      <p>
        На карте Беларуси мы отмечаем архитектурные памятники, которые уже
        зафиксированы, находятся в процессе изучения или ожидают реконструкции.
      </p>
      <p>
        Каждый объект — это история, которую можно открыть: фотографии,
        3D-модель, исторические данные и проект восстановления.
      </p>
      <p>
        Карта обновляется по мере появления новых инициатив и открытий.
      </p>
    </div>
  )
}