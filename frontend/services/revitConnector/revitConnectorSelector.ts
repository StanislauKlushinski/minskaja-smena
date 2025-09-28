import { RootState } from '../store'

export const isRevitSelector = (state: RootState) => state.revitConnector.isRevit
