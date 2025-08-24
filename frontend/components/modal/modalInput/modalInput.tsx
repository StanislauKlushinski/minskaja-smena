import styles from './modalInput.module.css'
import React, { useId } from 'react'

interface modalProps {
  val: string
  setter: React.Dispatch<string>
  label?: string
  textArea?: boolean
}

export default function ModalInput ({
  val,
  setter,
  label,
  textArea = false
}: modalProps) {
  const id = useId()
  return (
    <div className={label ? styles.modalInputContainer : ''}>
      <label className={styles.modalLabel} htmlFor={id}></label>
      {label ? (<p>
        {label}
      </p>) : null}
      {textArea ?
        (
          <textarea
            name={id}
            id={id}
            value={val}
            onChange={e => setter(e.target.value)}
            className={styles.modalTextArea}
          ></textarea>
        ) : (
          <input
            type={'text'}
            name={id}
            id={id}
            className={styles.modalInput}
            value={val}
            onChange={e => setter(e.target.value)}
          />
        )
      }
    </div>
  )
}
