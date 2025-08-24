'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/services/hooks'
import { getModelRequest } from '@/services/modelsPack/modelsPackSlice'
import { modelFullSelector } from '@/services/modelsPack/modelsPackSelector'

export default function Home () {
  const dispatch = useAppDispatch()
  const modelFull = useAppSelector(modelFullSelector)

  useEffect(() => {
    console.log(234)
    dispatch(getModelRequest({
      id: 6
    }))

    console.log(234)
    console.log(modelFull)
  }, [])
  console.log(modelFull)

  return (
    <>
      <h1>
        Main page
      </h1>
      <Link href={'/revit-connector'}>test</Link>
    </>
  )
}
