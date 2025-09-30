'use client'

import React, { useEffect } from 'react'
import { useAppDispatch } from '@/services/hooks'
import { getModelRequest } from '@/services/modelsPack/modelsPackSlice'
import Viewer from '@/components/viewer/viewer'

export default function Home () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getModelRequest({
      slug: 'model-test1'
    }))
  }, [])

  return (
    <>
      <Viewer/>
    </>
  )
}
