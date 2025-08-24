import styles from './button.module.css'
import React, { CSSProperties, MouseEventHandler } from 'react'

interface IButton {
  title: string
  onClick: MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
  disabled?: boolean
}

export default function Button ({
  title,
  onClick,
  style = {},
  disabled = false
}: IButton) {

  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {title}
    </button>
  )
}