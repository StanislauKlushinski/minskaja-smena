import styles from './modal.module.css'
import { createPortal } from 'react-dom'
import React from 'react'

interface modalProps {
  modalOpened: boolean
  children: React.ReactNode
}

export default function Modal ({
  modalOpened,
  children
}: modalProps) {
  let modalDOM
  if (typeof window !== 'undefined') {
    modalDOM = document.querySelector('#next-modals')
  } else {
    return <></>
  }
  return createPortal((
    <div className={`${styles.modal} ${modalOpened ? styles.modalOpened : ''}`}>
      <div className={styles.modalContainer}>
        {children}
      </div>
    </div>
  ), modalDOM as HTMLElement)
}
