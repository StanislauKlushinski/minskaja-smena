'use client'
import React from 'react'
import { useAppDispatch } from '@/services/hooks'
import { logoutUserRequest } from '@/services/user/userSlice'
import Button from '@/components/button/button'

export default function LogoutButton () {
  const dispatch = useAppDispatch()
  return (
    <Button
      title={'Выход'}
      onClick={() => {
        dispatch(logoutUserRequest())
      }}
    />
  )
}