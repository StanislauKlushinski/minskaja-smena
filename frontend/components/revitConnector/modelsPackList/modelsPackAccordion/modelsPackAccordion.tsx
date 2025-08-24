import styles from './modelsPackAccordion.module.css'
import React, { JSX, RefObject, useState } from 'react'
import { Property } from 'csstype'

interface IModelsPackAccordion {
  tag: keyof JSX.IntrinsicElements
  children: React.ReactNode
  name: string
  inputId: string
  ref: RefObject<HTMLElement | null>
}

export default function ModelsPackAccordion ({
  tag: Wrapper,
  children,
  name,
  inputId,
  ref
}: IModelsPackAccordion) {
  const [opened, setOpened] = useState(false)
  const [childHeight, setChildHeight] = useState<
    Property.MaxHeight<string | number>>(0)

  const padding = 20

  return (
    <Wrapper
      className={styles.accordion}
    >
      <input
        className={styles.accordionInput}
        type='checkbox'
        id={inputId}
      />
      <label
        className={styles.accordionLabel}
        htmlFor={inputId}
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
        {name}
      </label>
      <div
        className={styles.accordionContent}
        style={{
          maxHeight: opened ? childHeight : 0,
          padding: opened ? `${padding}px` : `0 ${padding}px`
        }}
        onTransitionEnd={() => {
          setChildHeight('fit-content')
          //   'fit-content' нужен для коректного отображения элементов внутри аккардиона
        }}
      >
        {children}
      </div>
    </Wrapper>
  )
}