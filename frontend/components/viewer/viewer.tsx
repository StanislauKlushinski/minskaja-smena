'use client'
import React, { useEffect, useRef, useState } from 'react'
import { TreeViewer } from '@/utils/three/treeViewer'
import { useAppSelector } from '@/services/hooks'
import { modelFullSelector } from '@/services/modelsPack/modelsPackSelector'

async function init (container: HTMLDivElement) {
  const viewer: TreeViewer = new TreeViewer(container)
  await viewer.init()
  return viewer
}

export default function Viewer () {
  const containerRef = useRef<HTMLDivElement>(null)
  const modelFull = useAppSelector(modelFullSelector)
  const viewerRef = useRef<TreeViewer>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isRendering, setIsRendering] = useState(true)

  const [isInitialised, setIsInitialised] = useState(false)
  useEffect(() => {
    if (containerRef.current) {
      init(containerRef.current).then(viewer => {
        viewerRef.current = viewer
        setIsInitialised(true)
      })
    }
  }, [])

  useEffect(() => {
    if (viewerRef.current && isInitialised && modelFull) {
      setIsLoading(false)
      setTimeout(() => {
        viewerRef.current?.loadModel(modelFull).then(_ => {
          setIsRendering(false)
        })
      }, 10)
    }
  }, [isInitialised, modelFull])

  return (
    <>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: isLoading || isRendering ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
          <span>
            {isLoading ? 'Закгрузка данных' : 'Обработка модели'}
          </span>
      </div>
    </>
  )
}