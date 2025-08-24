import styles from './model.module.css'
import React, { useRef, useState } from 'react'
import { IModelShort } from '@/utils/interface'
import ModelInfo
  from '@/components/revitConnector/modelsPackList/model/modelInfo/modelInfo'
import { Property } from 'csstype'
import ModelControls
  from '@/components/revitConnector/modelsPackList/model/modelControls/modelControls'

export default function Model ({
  id,
  modelsPackId,
  name,
  createdAt,
  updatedAt,
  description
}: IModelShort) {
  const ref = useRef<HTMLDivElement>(null)
  const inputId = 'model-' + id

  const [opened, setOpened] = useState(false)
  const [childHeight, setChildHeight] = useState<
    Property.MaxHeight<string | number>>(0)

  const padding = 20

  return (
    <li className={styles.model}>
      <div className={styles.modelLabelContainer}>
        <img className={styles.modelImg} src='https://placehold.co/100'
             alt='placeholder'/>
        <span>
          {name}
        </span>
        <input
          className={styles.modelInput}
          type='checkbox'
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={styles.modelLabel}
          onMouseDown={() => {
            if (
              !ref.current
            ) {
              return
            }
            setChildHeight(ref.current.clientHeight + padding * 2)
            //   Нужно для того, чтобы работала анимация. 'fit-content' блокирует анимацию
          }}
          onClick={() => {
            setOpened(!opened)
            if (
              !ref.current
            ) {
              return
            }
            setChildHeight(ref.current.offsetHeight + padding * 2)
          }}
        >
          ❯
        </label>
      </div>
      <div
        className={styles.modelContent}
        style={{
          maxHeight: opened ? childHeight : 0,
          padding: opened ? `${padding}px` : `0 ${padding}px`
        }}
        onTransitionEnd={() => {
          setChildHeight('fit-content')
          //   'fit-content' нужен для коректного отображения элементов внутри аккардиона
        }}
      >
        <div ref={ref}>
          <ModelInfo
            id={id}
            modelsPackId={modelsPackId}
            name={name}
            createdAt={createdAt}
            updatedAt={updatedAt}
            description={description}
          />
          <ModelControls
            id={id}
          />
        </div>
      </div>
    </li>
  )
}