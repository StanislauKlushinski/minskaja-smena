'use client'

import React, { use, useEffect } from 'react'
import { useAppDispatch } from '@/services/hooks'
import { getModelRequest } from '@/services/modelsPack/modelsPackSlice'
import Viewer from '@/components/viewer/viewer'

export default function Home ({
  params
}: {
  params: Promise<{ model: string }>
}) {
  const dispatch = useAppDispatch()

  const { model } = use(params)

  useEffect(() => {
    dispatch(getModelRequest({
      slug: model
    }))
  }, [])

  return (
    <>
      <Viewer/>
    </>
  )
}
