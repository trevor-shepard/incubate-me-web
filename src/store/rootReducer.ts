import { combineReducers } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import experts from './slices/expertsSlice'
const rootReducer = combineReducers({
	user,
	experts
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
