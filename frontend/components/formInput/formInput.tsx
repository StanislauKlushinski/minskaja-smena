'use client'
import styles from './formInput.module.css'
import React, { useState } from 'react'

interface IFormInputProps {
  name: string
  type: string
  inputRef: React.RefObject<HTMLInputElement|null>
}

export default function FormInput ({
  name,
  type,
  inputRef
}: IFormInputProps) {
  const [inputValue, setInputValue] = useState('')
  return (
    <p>
      <label htmlFor={type}>
        {name}
      </label>
      <br/>
      <label htmlFor={type}>
        <input
          ref={inputRef}
          onChange={(event) => {
            setInputValue(event.target.value)
          }}
          className={styles.formInput}
          type={type}
          name={type}
          value={inputValue}
          autoComplete='on'
          required
          id={type}
        />
      </label>
    </p>
  )
}