import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/services/user/userSlice'
import revitConnectorReducer
  from '@/services/revitConnector/revitConnectorSlice'
import modelsPackReducer from '@/services/modelsPack/modelsPackSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      revitConnector: revitConnectorReducer,
      modelsPack: modelsPackReducer
    }
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredPaths: ['select.selectedFigures']
    //     }
    //   })
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
