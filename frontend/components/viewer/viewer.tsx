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
      viewerRef.current.loadModel(modelFull).then(r => r)
    }
  }, [isInitialised, modelFull])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  )
}