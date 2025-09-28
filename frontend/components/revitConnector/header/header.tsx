import styles from './header.module.css'
import React from 'react'
import LogoutButton
  from '@/components/revitConnector/header/logoutButton/logoutButton'

export default function Header () {
  return (
    <header className={styles.header}>
      <span></span>
      <span>
        Менеджер моделей
      </span>
      <LogoutButton/>
    </header>
  )
}