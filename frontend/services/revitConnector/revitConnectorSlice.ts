import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  isRevit: boolean
}

const initialState: IInitialState = {
  isRevit: false
}

export const revitConnectorSlice = createSlice({
  name: 'revitConnector',
  initialState,
  reducers: {
    setIsRevit: (state) => {
      state.isRevit = true
    }
  }
})
export const { setIsRevit } = revitConnectorSlice.actions
export default revitConnectorSlice.reducer
