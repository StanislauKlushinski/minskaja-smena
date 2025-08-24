import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { url } from '@/utils/chek-response'
import {
  IModelFull,
  IModelPostData,
  IModelShort,
  IModelsPackPostData,
  IModelsPackShort
} from '@/utils/interface'

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

export const addModelRequest = createAsyncThunk(
  `modelsPack/addModelRequest`,
  async (
    data: IModelPostData,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await fetch(`${url}/add-model`, {
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

    const responseJson: IModelShort = await res.json()

    return fulfillWithValue(responseJson)
  }
)

export const getModelRequest = createAsyncThunk(
  `modelsPack/getModelRequest`,
  async (
    data: { id: number },
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
    console.log(res)
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
    })
  }
})
export const { setIsError } = modelsPackSlice.actions
export default modelsPackSlice.reducer