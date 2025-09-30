import img1 from '@/assets/structures/1.jpg'
import img8 from '@/assets/structures/8.png'
import img7 from '@/assets/structures/7.png'
import img6 from '@/assets/structures/6.png'
import img5 from '@/assets/structures/5.png'
import img4 from '@/assets/structures/4.jpg'
import img3 from '@/assets/structures/3.png'
import img2 from '@/assets/structures/2.png'
import { StaticImageData } from 'next/image'

export const structuresFounded: IStructure[] = [
  {
    type: 'founded',
    name: 'храм в д. дуброво',
    date: 'конец XVI - начало XVIII вв',
    location: '15 км от города Раков',
    historicalValue: 'историко-культурная ценность 3-й категории',
    src: img1
  },
  {
    type: 'founded',
    name: 'Костёл святого антония',
    date: 'XVIII век',
    location: '15 км от города Могилёва',
    historicalValue: 'не имеет историко-культурной ценности',
    src: img2
  }
]
export const structuresInDev: IStructure[] = [
  {
    type: 'inDev',
    name: 'минское замчище',
    date: 'конец XI – начало XII века',
    location: 'Минск',
    historicalValue: '-',
    src: img3
  },
  {
    type: 'inDev',
    name: 'Мельница в Лошицком усадебно-парковом комплексе',
    date: 'конец XIX – начало XX века',
    location: 'конец XIX – начало XX века',
    historicalValue: '-',
    src: img4
  }
]
export const structuresToDev: IStructure[] = [
  {
    type: 'toDev',
    name: 'ЧАСОВНЯ-УСЫПАЛЬНИЦА ПРУШИНСКИХ',
    date: 'XVIII век',
    location: 'Минск',
    historicalValue: '-',
    src: img5
  },
  {
    type: 'toDev',
    name: 'Водонапорная башня',
    date: 'XX век',
    location: 'Минск',
    historicalValue: '-',
    src: img6
  },
  {
    type: 'toDev',
    name: 'Археологический комплекс на реке Менке',
    date: 'X–XII века',
    location: '10 км от г. Минск',
    historicalValue: '-',
    src: img7
  },
  {
    type: 'toDev',
    name: 'Пищаловский замок (Минский тюремный замок)',
    date: 'XIX век',
    location: 'Минск',
    historicalValue: '-',
    src: img8
  }
]

export type TStructureType = 'founded' | 'inDev' | 'toDev'

export interface IStructure {
  type: TStructureType
  name: string
  date: string
  location: string
  historicalValue: string
  src: StaticImageData
}