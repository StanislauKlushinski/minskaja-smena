import styles from './modelControls.module.css'
import React, { useState } from 'react'
import Modal from '@/components/modal/modal'
import ModalTitle from '@/components/modal/modalTitle/modalTitle'
import ModalButtons from '@/components/modal/modalButtons/modalButtons'
import ModalButton from '@/components/modal/modalButton/modalButton'
import Button from '@/components/button/button'
import { useAppDispatch } from '@/services/hooks'
import { delModel } from '@/services/modelsPack/modelsPackSlice'

interface IModelControls {
  id: number
}

export default function ModelControls ({
  id
}: IModelControls) {
  const [modalOpened, setModalOpened] = useState(false)
  const dispatch = useAppDispatch()

  return (
    <>
      <div className={styles.modelControls}>
        <Button
          title={'Удалить'}
          onClick={() => {setModalOpened(true)}}
          style={{
            marginLeft: 'auto'
          }}
        />
      </div>
      <Modal modalOpened={modalOpened}>
        <ModalTitle
          title={'Модель будет удалена, продолжить?'}
        />
        <ModalButtons>
          <ModalButton name={'Удалить'} onClick={async () => {
            dispatch(delModel({
              id: id
            }))
            setModalOpened(false)
          }}/>
          <ModalButton name={'Отмена'} onClick={() => {setModalOpened(false)}}/>
        </ModalButtons>
      </Modal>
    </>
  )
}