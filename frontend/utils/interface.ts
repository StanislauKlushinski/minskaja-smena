export interface IOptions {
  method: string
  mode?: string
  credentials?: string
  headers?:
    | {
    [name: string]: string
  }
    | {
    Authorization: string | null
    'Content-Type': 'application/json;charset=utf-8'
  }
    | {
    Authorization: string | null
  }

  body?: string | null
}

export interface IModelsPackShort {
  id: number
  name: string
  models: IModelShort[]
}

export interface IModelsPackPostData {
  name: string
}

export interface IDate {
  date: string
  timezone_type: number
  timezone: string
}

export interface IModelShort {
  id: number
  modelsPackId: number
  name: string
  createdAt: IDate
  updatedAt: IDate
  description?: string
}

export interface IModelFull {
  id: number
  modelsPackId: number
  name: string
  createdAt: IDate
  updatedAt: IDate
  description?: string
  elements: IDBElement[]
}

export interface IModelPostData {
  modelsPackId: number
  name: string
  description: string
}

export interface IElementsPostData {
  id: number
  elements: IDBElement[]
}

export type IDBElement =
  IDBUnknown
  | IDBArc
  | IDBCircle
  | IDBEllipse
  | IDBLine
  | IDBPoint
  | IDBPointCloud
  | IDBVector
  | IDBMesh

export interface IDBUnknown {
  type: 'UNKNOWN'
}

export interface IDBMesh {
  type: 'Mesh'
  //[Vertices, Faces, Color, Opacity]
  data: [Array<number>, Array<number>, [number, number, number], number]
}

export interface IDBArc {
  type: 'Arc'
  //[StartPoint, MidPoint, EndPoint]
  data: [IDBPoint, IDBPoint, IDBPoint]
}

export interface IDBCircle {
  type: 'Circle'
  //[Center, Normal, Radius]
  data: [IDBPoint, IDBVector, number]
}

export interface IDBEllipse {
  type: 'Ellipse'
  //[Center, SemiAxisXEnd, SemiAxisYEnd, IsClosed]
  data: [IDBPoint, IDBPoint, IDBPoint, boolean]
}

export interface IDBLine {
  type: 'Line'
  data: Array<IDBPoint>
}

export interface IDBPoint {
  type: 'Point'
  //[X, Y, Z]
  data: [number, number, number]
}

export interface IDBPointCloud {
  type: 'PointCloud'
  data: Array<IDBPoint>
}

export interface IDBVector {
  type: 'Vector'
  //[X, Y, Z]
  data: [number, number, number]
}