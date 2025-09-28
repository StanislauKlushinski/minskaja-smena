import { RootState } from '../store'

export const isAuthSelector = (state: RootState) => state.user.isAuth
export const isAuthCheckSelector = (state: RootState) => state.user.isAuthCheck
export const currentUserIdSelector = (state: RootState) => state.user.currentUserId
export const refreshSelector = (state: RootState) => state.user.refresh