'use client'
import styles from './main.module.css'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/services/hooks'
import {
  isRevitSelector
} from '@/services/revitConnector/revitConnectorSelector'
import { setIsRevit } from '@/services/revitConnector/revitConnectorSlice'
import ModelsPackList
  from '@/components/revitConnector/modelsPackList/modelsPackList'
import ModelsPackListControls
  from '@/components/revitConnector/modelsPackList/modelsPackListControls/modelsPackListControls'

export default function Main () {
  const isRevit = useAppSelector(isRevitSelector)
  const dispatch = useAppDispatch()

  const [isInit, setIsInit] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem('isRevit')) {
      dispatch(setIsRevit())
    }
    setIsInit(true)
  }, [])

  if (!isInit) {
    return <main></main>
  }
  if (!isRevit) {
    return (
      <main>
        <h2>
          Revit не обнаружен
        </h2>
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <ModelsPackList/>
      <ModelsPackListControls/>
    </main>
  )
}