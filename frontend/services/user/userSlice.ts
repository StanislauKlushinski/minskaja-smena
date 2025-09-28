import checkResponse, { url } from '@/utils/chek-response'
import { IOptions } from '@/utils/interface'
import {
  createAsyncThunk,
  createSlice,
  ThunkDispatch,
  UnknownAction
} from '@reduxjs/toolkit'

interface IInitialState {
  currentUserId: number
  isAuthCheck: boolean
  isAuth: boolean
  refresh: boolean
}

const initialState: IInitialState = {
  currentUserId: -1,
  isAuthCheck: false,
  isAuth: false,
  refresh: false
}

export const currentUserRequest = createAsyncThunk(
  `user/currentUserRequest`,
  async (_, { fulfillWithValue, dispatch }) => {
    const data = await fetchWithRefresh(`${url}/check_token`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include'
    }, dispatch)

    if (data.success) {
      return fulfillWithValue(data)
    }
    throw new Error('Network response was not ok')
  }
)

const refreshToken = async (dispatch: ThunkDispatch<unknown, unknown, UnknownAction>) => {
  const res = await fetch(`${url}/token_refresh`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include'
  })
  if (!res.ok) {
    dispatch(logoutUserRequest())
    console.error('Error in response:', res.status, res.statusText)
    const err = await res.json()
    return await Promise.reject(err)
  }
}

export const fetchWithRefresh = async (
  url: string, options: IOptions,
  dispatch: ThunkDispatch<unknown, unknown, UnknownAction>) => {
  try {
    const res = await fetch(url, options as RequestInit)

    return await checkResponse(res)
  } catch (err: any) {
    if (err.message) {
      await refreshToken(dispatch)

      const res = await fetch(url, options as RequestInit)
      return await checkResponse(res)
    } else {
      return Promise.reject(err)
    }
  }
}

export const authUserRequest = createAsyncThunk(
  `user/authUserRequest`,
  async (
    dataLogin: { username: string; password: string },
    { fulfillWithValue }
  ) => {
    const res = await fetch(`${url}/login_check`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataLogin)
    })

    return fulfillWithValue(res.ok)
  }
)

export const logoutUserRequest = createAsyncThunk(
  `user/logoutUserRequest `,
  async (_, { fulfillWithValue }) => {
    const data = await fetch(`${url}/logout`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include'
    })

    const responseData = await checkResponse(data)

    return fulfillWithValue(responseData)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startAuthCheck: (state) => {
      state.isAuthCheck = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(currentUserRequest.fulfilled, (state, actin) => {
      state.isAuth = true
      state.currentUserId = actin.payload.user
    }).addCase(authUserRequest.fulfilled, (state, action) => {
      state.isAuth = action.payload
    }).addCase(logoutUserRequest.fulfilled, (state) => {
      state.isAuth = false
    }).addCase(currentUserRequest.pending, (state) => {
      state.refresh = false
    }).addMatcher(
      (action) =>
        action.type.endsWith('/fulfilled') && action.type.startsWith('user/'),
      (state) => {
        state.isAuthCheck = true
      }
    ).addMatcher(
      (action) =>
        action.type.endsWith('/rejected') && action.type.startsWith('user/'),
      (state) => {
        state.isAuthCheck = true
        state.isAuth = false
      }
    ).addMatcher(
      (action) =>
        action.type.endsWith('/rejected'),
      (state, action: any) => {
        if (action.error.message === 'JWT Token not found') {
          state.refresh = true
        }
      }
    )
  }
})
export const { startAuthCheck } = userSlice.actions
export default userSlice.reducer
