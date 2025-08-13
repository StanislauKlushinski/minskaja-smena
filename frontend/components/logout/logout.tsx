'use client'

import React, { useEffect } from 'react'
import { logoutUserRequest } from '@/services/user/userSlice'
import { useAppDispatch } from '@/services/hooks'
import Auth from '@/components/auth/auth'

export default function Logout () {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logoutUserRequest())
  }, [])
  return (
    <Auth redirectUrl={'/login'}/>
  )
}
