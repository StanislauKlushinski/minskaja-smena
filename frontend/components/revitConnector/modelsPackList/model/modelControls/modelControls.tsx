import styles from './modelControls.module.css'
import React, { useState } from 'react'
import Modal from '@/components/modal/modal'
import ModalTitle from '@/components/modal/modalTitle/modalTitle'
import ModalButtons from '@/components/modal/modalButtons/modalButtons'
import ModalButton from '@/components/modal/modalButton/modalButton'
import Button from '@/components/button/button'
import { IDBElement } from '@/utils/interface'
import { useAppDispatch } from '@/services/hooks'

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
          title={'Обновить'}
          onClick={() => {setModalOpened(true)}}
          style={{
            marginLeft: 'auto'
          }}
        />
      </div>
      <Modal modalOpened={modalOpened}>
        <ModalTitle
          title={'Модель будет обновлена текущей моделью, продолжить?'}
        />
        <ModalButtons>
          <ModalButton name={'Продолжить'} onClick={async () => {
            if (browserEvent) {
              const model: IDBElement[] = JSON.parse(
                await browserEvent.getModel())

              console.log(model)
            }
          }}/>
          <ModalButton name={'Отмена'} onClick={() => {setModalOpened(false)}}/>
        </ModalButtons>
      </Modal>
    </>
  )
}