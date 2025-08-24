import React, { useRef } from 'react'
import styles from './modelsPack.module.css'
import { IModelsPackShort } from '@/utils/interface'
import Model from '@/components/revitConnector/modelsPackList/model/model'
import ModelsPackAccordion
  from '@/components/revitConnector/modelsPackList/modelsPackAccordion/modelsPackAccordion'
import ModelsPackControls
  from '@/components/revitConnector/modelsPackList/modelsPack/modelsPackControls/modelsPackControls'

export default function ModelsPack ({
  id,
  name,
  models
}: IModelsPackShort) {
  const ref = useRef<HTMLUListElement>(null)
  const inputId = 'modelsPack-' + id

  return (
    <ModelsPackAccordion
      tag={'li'}
      name={name}
      inputId={inputId}
      ref={ref}
    >
      <ModelsPackControls
        modelsPackId={id}
      />
      <ul className={styles.modelsPack} ref={ref}>
        {
          models.toSorted((a, b) => (a.id - b.id)).map(
            model => (
              <Model
                key={model.id}
                id={model.id}
                modelsPackId={model.modelsPackId}
                name={model.name}
                createdAt={model.createdAt}
                updatedAt={model.updatedAt}
                description={model.description}
              />
            )
          )
        }
      </ul>
    </ModelsPackAccordion>
  )
}