import { combineReducers } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import experts from './slices/expertsSlice'
import chats from './slices/chatsSlice'
import conversations from './slices/conversationsSlice'

const rootReducer = combineReducers({
	user,
	experts,
	chats,
	conversations
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
