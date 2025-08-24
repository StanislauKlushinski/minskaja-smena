import styles from './modalText.module.css'

interface modalProps {
  text: string
}

export default function ModalText ({
  text
}: modalProps) {
  return (
    <p className={styles.modalText}>
      {text}
    </p>
  )
}
