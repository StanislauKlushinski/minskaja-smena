import styles from './modelsPackControls.module.css'
import React, { useState } from 'react'
import Modal from '@/components/modal/modal'
import ModalTitle from '@/components/modal/modalTitle/modalTitle'
import ModalInput from '@/components/modal/modalInput/modalInput'
import ModalButtons from '@/components/modal/modalButtons/modalButtons'
import ModalButton from '@/components/modal/modalButton/modalButton'
import { useAppDispatch } from '@/services/hooks'
import Button from '@/components/button/button'
import ModalText from '@/components/modal/modalText/modalText'
import {
  addModelRequest,
  delModelsPack
} from '@/services/modelsPack/modelsPackSlice'

interface IModelsPackControls {
  modelsPackId: number
}

export default function ModelsPackControls ({
  modelsPackId
}: IModelsPackControls) {
  const [modalOpened, setModalOpened] = useState(false)
  const [DelModalOpened, setDelModalOpened] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalDescription, setModalDescription] = useState('')
  const dispatch = useAppDispatch()

  function reset () {
    setModalOpened(false)
    setModalName('')
    setModalDescription('')
  }

  return (
    <>
      <div className={styles.modelsPackControls}>
        <Button title={'Удалить папку'} onClick={() => {
          setDelModalOpened(true)
        }}/>
        <Button title={'Добавить модель'} onClick={() => {
          setModalOpened(true)
        }}/>
      </div>
      <Modal modalOpened={DelModalOpened}>
        <ModalTitle
          title={'Вы уверены что хотите удалитьь папку вместе со всеми моделяит?'}/>
        <ModalButtons>
          <ModalButton
            name={'Удалить'}
            onClick={() => {
              dispatch(delModelsPack({
                id: modelsPackId
              }))
              setDelModalOpened(false)
            }}
          />
          <ModalButton name={'Отмена'} onClick={() => {
            reset()
          }}/>
        </ModalButtons>
      </Modal>
      <Modal modalOpened={modalOpened}>
        <ModalTitle title={'Добавление модели'}/>
        <ModalInput
          val={modalName}
          setter={setModalName}
          label={'Название'}
        />
        <ModalInput
          val={modalDescription}
          setter={setModalDescription}
          label={'Описание*'}
          textArea={true}
        />
        <ModalText text={'Не обязательно*'}/>
        <ModalButtons>
          <ModalButton
            name={'Загрузить'}
            onClick={async () => {
              reset()
              dispatch(addModelRequest({
                name: modalName,
                description: modalDescription,
                modelsPackId: modelsPackId
              }))
            }}
            disable={modalName === ''}
          />
          <ModalButton name={'Отмена'} onClick={() => {
            reset()
          }}/>
        </ModalButtons>
      </Modal>
    </>
  )
}