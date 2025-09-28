import React, { MouseEventHandler } from 'react'
import Button from '@/components/button/button'

interface modalProps {
  name: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disable?: boolean
}

const voidFunc = () => {
}

export default function ModalButton ({
  name,
  onClick,
  disable = false
}: modalProps) {
  return (
    <Button
      title={name}
      onClick={onClick ?? voidFunc}
      disabled={disable}
    />
  )
}
