import styles from './modelsPackList.module.css'
import React, { useEffect } from 'react'
import ModelsPack
  from '@/components/revitConnector/modelsPackList/modelsPack/modelsPack'
import { useAppDispatch, useAppSelector } from '@/services/hooks'
import {
  modelsPacksShortSelector
} from '@/services/modelsPack/modelsPackSelector'
import { getModelsPacksShort } from '@/services/modelsPack/modelsPackSlice'

export default function ModelsPackList () {
  const dispatch = useAppDispatch()
  const modelsPacks = useAppSelector(modelsPacksShortSelector)
  // const modelsPacks: IModelsPackShort[] = [
  //   {
  //     id: 1,
  //     name: 'test',
  //     models: [
  //       {
  //         id: 1,
  //         modelsPackId: 1,
  //         name: 'test model1',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       },
  //       {
  //         id: 2,
  //         modelsPackId: 1,
  //         name: 'test model2',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       },
  //       {
  //         id: 3,
  //         modelsPackId: 1,
  //         name: 'test model3',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     name: 'models',
  //     models: [
  //       {
  //         id: 4,
  //         modelsPackId: 2,
  //         name: 'small model',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       },
  //       {
  //         id: 5,
  //         modelsPackId: 2,
  //         name: 'big model',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     name: 'houses',
  //     models: [
  //       {
  //         id: 6,
  //         modelsPackId: 3,
  //         name: 'Small house',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam assumenda consequatur cupiditate delectus dicta dolor ducimus excepturi exercitationem explicabo ipsa maiores minus nisi officia, quasi qui quia soluta tempore?'
  //       },
  //       {
  //         id: 7,
  //         modelsPackId: 3,
  //         name: 'medium house',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       },
  //       {
  //         id: 8,
  //         modelsPackId: 3,
  //         name: 'big house',
  //         createdAt: new Date(),
  //         updatedAt: new Date()
  //       }
  //     ]
  //   }
  // ]

  useEffect(() => {
    dispatch(getModelsPacksShort())
  }, [])

  return (
    <ul className={styles.modelsPackList}>
      {
        modelsPacks.toSorted((a, b) => (a.id - b.id)).
          map(modelsPack => <ModelsPack
            name={modelsPack.name}
            id={modelsPack.id}
            models={modelsPack.models}
            key={modelsPack.id}
          />)
      }
    </ul>
  )
}