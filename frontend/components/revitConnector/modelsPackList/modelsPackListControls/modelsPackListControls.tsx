import React, { useState } from 'react'
import styles from './modelsPackListControls.module.css'
import Button from '@/components/button/button'
import { useAppDispatch } from '@/services/hooks'
import { addModelsPackRequest } from '@/services/modelsPack/modelsPackSlice'
import Modal from '@/components/modal/modal'
import ModalTitle from '@/components/modal/modalTitle/modalTitle'
import ModalButtons from '@/components/modal/modalButtons/modalButtons'
import ModalButton from '@/components/modal/modalButton/modalButton'
import ModalInput from '@/components/modal/modalInput/modalInput'

interface IModelsPackListControls {}

export default function ModelsPackListControls ({}: IModelsPackListControls) {
  const [modalOpened, setModalOpened] = useState(false)
  const [modalsPackName, setModalsPackName] = useState('')
  const dispatch = useAppDispatch()

  function reset () {
    setModalOpened(false)
    setModalsPackName('')
  }

  return (
    <>
      <div className={styles.modelsPackListControls}>
        <Button title={'Добавить папку'} onClick={() => {
          setModalOpened(true)
        }}/>
      </div>
      <Modal modalOpened={modalOpened}>
        <ModalTitle title={'Введите название папки'}/>
        <ModalInput val={modalsPackName} setter={setModalsPackName}/>
        <ModalButtons>
          <ModalButton
            name={'Создать'}
            onClick={() => {
              dispatch(addModelsPackRequest({
                name: modalsPackName
              }))
              reset()
            }}
            disable={modalsPackName === ''}
          />
          <ModalButton name={'Отмена'} onClick={() => {
            reset()
          }}/>
        </ModalButtons>
      </Modal>
    </>
  )
}