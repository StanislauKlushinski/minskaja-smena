import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/services/user/userSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredPaths: ['select.selectedFigures']
        }
      })
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
