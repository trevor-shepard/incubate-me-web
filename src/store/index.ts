import { configureStore, getDefaultMiddleware, Action } from '@reduxjs/toolkit'
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	createTransform
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'

// const SetTransform = createTransform(
//   // transform state on its way to being serialized and persisted.
//   (inboundState: RootState, key) => {
//     const {
// 		chats,
// 		conversations,
// 	} = inboundState

// 	const transformedConversations = Object.keys(conversations).reduce((acc, conversationID) => {
// 		const conversation = conversations[conversationID]
// 		return {
// 			...acc,
// 			[conversationID]: Object.keys(conversation).reduce((acc2, messageID) => {
// 				const message = conversation[messageID]
// 				return {
// 					...acc2,
// 					[messageID]: {
// 						...message,
// 						date: new Date(message.date)
// 					}
// 				}
// 			}, {})
// 		}
// 	}, {})

// 	const transformedChats = Object.keys(chats).reduce((acc, chatID) => {
// 		const chat = chats[chatID]
// 		const participants = Object.keys(chat.participants).reduce((acc, participantID) => {
// 			return {
// 				...acc,
// 				[participantID]: new Date(chat.participants[participantID])
// 			}
// 		}, {})

// 		return {
// 			...chat,
// 			participants
// 		}
// 	}, {})

//     return {...inboundState, conversations: transformedConversations, chats: transformedChats};
//   },
//   // transform state being rehydrated
//   (outboundState: RootState, key) => {
// 	// convert mySet back to a Set.
// 	const {
// 		chats,
// 		conversations,
// 	} = outboundState

// 	const transformedConversations = Object.keys(conversations).reduce((acc, conversationID) => {
// 		const conversation = conversations[conversationID]
// 		return {
// 			...acc,
// 			[conversationID]: Object.keys(conversation).reduce((acc2, messageID) => {
// 				const message = conversation[messageID]
// 				return {
// 					...acc2,
// 					[messageID]: {
// 						...message,
// 						date: new Date(message.date)
// 					}
// 				}
// 			}, {})
// 		}
// 	}, {})

// 	const transformedChats = Object.keys(chats).reduce((acc, chatID) => {
// 		const chat = chats[chatID]
// 		const participants = Object.keys(chat.participants).reduce((acc, participantID) => {
// 			return {
// 				...acc,
// 				[participantID]: new Date(chat.participants[participantID])
// 			}
// 		}, {})

// 		return {
// 			...chat,
// 			participants
// 		}
// 	}, {})

//     return {...outboundState, conversations: transformedConversations, chats: transformedChats};
//   },
//   { whitelist: ['root']}
// );

const persistConfig = {
	key: 'root',
	version: 1,
	storage
	// transforms: [SetTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
		}
	})
})

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./rootReducer', () => {
		const newRootReducer = require('./rootReducer').default
		store.replaceReducer(newRootReducer)
	})
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

export default store
