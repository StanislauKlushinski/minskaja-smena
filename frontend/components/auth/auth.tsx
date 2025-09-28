'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  isAuthCheckSelector,
  isAuthSelector,
  refreshSelector
} from '@/services/user/userSelector'
import { currentUserRequest } from '@/services/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/services/hooks'

interface IAuthProps {
  redirectUrl: string
  children?: React.ReactNode
  isAuthPage?: boolean
}

export default function Auth ({
  redirectUrl,
  children,
  isAuthPage = false
}: IAuthProps) {
  const router = useRouter()
  const isAuth = useAppSelector(isAuthSelector)
  const isAuthCheck = useAppSelector(isAuthCheckSelector)
  const refresh = useAppSelector(refreshSelector)
  const dispatch = useAppDispatch()

  const [showLoading, setShowLoading] = useState(false)

  useLayoutEffect(() => {
    dispatch(currentUserRequest())
    setTimeout(() => {
      setShowLoading(true)
    }, 500)
  }, [])

  useEffect(() => {
    if (refresh) {
      dispatch(currentUserRequest())
    }
  }, [refresh])

  useEffect(() => {
    if (isAuthPage === isAuth && isAuthCheck) {
      router.push(redirectUrl)
    }
  }, [isAuth, isAuthCheck])

  if (!isAuthCheck || (isAuthPage === isAuth)) {
    return (
      <h2 style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex'
      }}>{showLoading ? 'Пожалуйста подождите...' : ''}</h2>
    )
  }

  return (
    <>
      {children}
    </>
  )
};
