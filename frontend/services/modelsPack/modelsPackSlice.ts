import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { url } from '@/utils/chek-response'
import {
  IDBElement,
  IDBPointCloud,
  IElementsPostData,
  IModelFull,
  IModelPostData,
  IModelShort,
  IModelsPackPostData,
  IModelsPackShort
} from '@/utils/interface'
import { getModel } from '@/utils/elementsZip'

interface IInitialState {
  modelsPacksShort: IModelsPackShort[]
  modelFull: IModelFull | null
  isError: boolean
}

const initialState: IInitialState = {
  modelsPacksShort: [],
  modelFull: null,
  isError: false
}

export const addModelsPackRequest = createAsyncThunk(
  `modelsPack/addModelsPackRequest`,
  async (
    data: IModelsPackPostData,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await fetch(`${url}/add-models-pack`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!res.ok) {
      return rejectWithValue(false)
    }

    const responseJson: IModelsPackShort = await res.json()

    return fulfillWithValue(responseJson)
  }
)

async function postElements (data: IElementsPostData) {
  return await fetch(`${url}/add-elements`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const addModelRequest = createAsyncThunk(
  `modelsPack/addModelRequest`,
  async (
    data: IModelPostData,
    { fulfillWithValue, rejectWithValue }
  ) => {
    if (!browserEvent) {
      return rejectWithValue(false)
    }
    const res = await fetch(`${url}/add-model`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        modelsPackId: data.modelsPackId,
        name: data.name,
        description: data.description
      })
    })

    const responseJson: IModelShort = await res.json()

    if (!res.ok) {
      return rejectWithValue(false)
    }
    const modelIds: number[] = JSON.parse(
      await browserEvent.getIds())

    const encoder = new TextEncoder()
    const maxSizeBytes = 10_000_000
    let elementsToPost: IDBElement[] = []
    let pointClouds: IDBPointCloud[] = []

    for await (const elements of getModel(modelIds)) {
      const json = JSON.stringify(elementsToPost)
      const size = encoder.encode(json).length
      if (size < maxSizeBytes) {
        elementsToPost.push(...elements)
      } else {
        pointClouds.push(...elementsToPost.filter(
          (e) => e.type === 'PointCloud'))
        const otherElements: Exclude<IDBElement, IDBPointCloud>[] = elementsToPost.filter(
          (e) => e.type !== 'PointCloud')

        const body: IElementsPostData = {
          id: responseJson.id,
          elements: otherElements
        }
        const res = await postElements(body)
        if (!res.ok) {
          return rejectWithValue(false)
        }

        elementsToPost = []
      }
    }

    if (elementsToPost.length !== 0) {
      const body: IElementsPostData = {
        id: responseJson.id,
        elements: elementsToPost
      }
      const res = await postElements(body)
      if (!res.ok) {
        return rejectWithValue(false)
      }
    }

    for (const pointCloud of pointClouds) {
      if (pointCloud.data.length > 50000) {
        const chunkSize = 50000
        for (let i = 0; i < pointCloud.data.length; i += chunkSize) {
          const chunk = pointCloud.data.slice(i, i + chunkSize)

          const pointCloudPostData: IDBPointCloud = {
            type: 'PointCloud',
            data: chunk
          }

          const body: IElementsPostData = {
            id: responseJson.id,
            elements: [pointCloudPostData]
          }
          const res = await postElements(body)
          if (!res.ok) {
            return rejectWithValue(false)
          }
        }
      } else {
        const body: IElementsPostData = {
          id: responseJson.id,
          elements: [pointCloud]
        }
        const res = await postElements(body)
        if (!res.ok) {
          return rejectWithValue(false)
        }
      }
    }

    return fulfillWithValue(responseJson)
  }
)

export const getModelRequest = createAsyncThunk(
  `modelsPack/getModelRequest`,
  async (
    data: { slug: string },
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await fetch(`${url}/get-model`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      return rejectWithValue(false)
    }

    const responseJson: IModelFull = await res.json()

    return fulfillWithValue(responseJson)
  }
)

export const getModelsPacksShort = createAsyncThunk(
  `modelsPack/getModelsPacksShort`,
  async (
    _,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await fetch(`${url}/get-models-packs-short`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      return rejectWithValue(false)
    }

    const responseJson: IModelsPackShort[] = await res.json()

    return fulfillWithValue(responseJson)
  }
)

export const delModelsPack = createAsyncThunk(
  `modelsPack/delModelsPack`,
  async (
    data: {
      id: number
    },
    { fulfillWithValue }
  ) => {
    const res = await fetch(`${url}/del-models-pack`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return fulfillWithValue(data.id)
  }
)

export const delModel = createAsyncThunk(
  `modelsPack/delModel`,
  async (
    data: {
      id: number
    },
    { fulfillWithValue }
  ) => {
    const res = await fetch(`${url}/del-model`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const json: {
      success: true
      modelsPackId: number
      id: number
    } = await res.json()

    return fulfillWithValue(json)
  }
)

export const modelsPackSlice = createSlice({
  name: 'modelsPack',
  initialState,
  reducers: {
    setIsError: (state, actin: PayloadAction<boolean>) => {
      state.isError = actin.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addModelsPackRequest.fulfilled, (state, actin) => {
      state.modelsPacksShort.push(actin.payload)
    }).addCase(addModelsPackRequest.rejected, (state) => {
      state.isError = true
    }).addCase(addModelRequest.fulfilled, (state, actin) => {
      const modelsPackIndex = state.modelsPacksShort.findIndex(
        (value) => (value.id === actin.payload.modelsPackId))
      state.modelsPacksShort[modelsPackIndex].models.push(actin.payload)
    }).addCase(addModelRequest.rejected, (state) => {
      state.isError = true
    }).addCase(getModelsPacksShort.fulfilled, (state, actin) => {
      state.modelsPacksShort = actin.payload
    }).addCase(getModelsPacksShort.rejected, (state) => {
      state.isError = true
    }).addCase(getModelRequest.fulfilled, (state, actin) => {
      state.modelFull = actin.payload
    }).addCase(getModelRequest.rejected, (state) => {
      state.isError = true
    }).addCase(delModelsPack.fulfilled, (state, action) => {
      state.modelsPacksShort = state.modelsPacksShort.filter(
        modelsPack => modelsPack.id !== action.payload)
    }).addCase(delModel.fulfilled, (state, action) => {
      const modelsPackIndex = state.modelsPacksShort.findIndex(
        modelsPack => modelsPack.id === action.payload.modelsPackId)
      state.modelsPacksShort[modelsPackIndex].models = state.modelsPacksShort[modelsPackIndex].models.filter(
        model => model.id !== action.payload.id)
    })
  }
})
export const { setIsError } = modelsPackSlice.actions
export default modelsPackSlice.reducer