import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'
import { Expert } from 'store/slices/expertsSlice'
import { convertTimestampToString, Timestamp } from 'utils/dateUtils'
import {
	recieveConversation,
	fetchConversation
} from 'store/slices/conversationsSlice'

export interface Chat {
	id: string
	participants: {
		[userID: string]: string
	}
}

export interface DatabaseChat {
	id: string
	participants: {
		[userID: string]: Timestamp
	}
}

export interface ChatsState {
	[id: string]: Chat
}

const chat = createSlice({
	name: 'chats',
	initialState: {} as ChatsState,
	reducers: {
		recieveChat(state, action: PayloadAction<Chat>) {
			const chat = action.payload
			return {
				...state,
				[chat.id]: chat
			}
		},
		recieveChats(state, action: PayloadAction<ChatsState>) {
			debugger
			return {
				...state,
				...action.payload
			}
		},
		clearChats() {
			return {}
		}
	}
})

export const { recieveChat, recieveChats, clearChats } = chat.actions

export const fetchChat = (chatID: string): AppThunk => async dispatch => {
	try {
		const chat: Chat = await db
			.collection('chats')
			.doc(chatID)
			.get()
			.then(doc => {
				const value = doc.data() as DatabaseChat
				const participants = Object.keys(value.participants).reduce(
					(acc, id) => {
						return {
							...acc,
							[id]: convertTimestampToString(value.participants[id])
						}
					},
					{}
				)

				return {
					...value,
					participants
				}
			})

		dispatch(recieveChat(chat))
	} catch (e) {
		console.log('error retreiving chat')
	}
}

export const fetchChats = (chatIDs: string[]): AppThunk => async dispatch => {
	try {
		if (chatIDs.length === 0) return
		const chats = await db
			.collection('chats')
			.where('id', 'in', chatIDs)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const chat = doc.data() as DatabaseChat
					const participants = Object.keys(chat.participants).reduce(
						(acc, id) => {
							return {
								...acc,
								[id]: co(chat.participants[id])
							}
						},
						{}
					)
					dispatch(fetchConversation(chat.id))
					dispatch(
						recieveChat({
							...chat,
							participants
						})
					)
				})
			})
	} catch (error) {

	}
}

export const createChat = (experts: Expert[]): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const { user } = getState()
		const ref = await db.collection('chats').doc()

		const { id } = ref

		const participants = experts.reduce(
			(acc, expert) => {
				return {
					...acc,
					[expert.id]: new Date()
				}
			},
			{ [user.uid as string]: new Date() }
		)

		const chat = {
			id,
			participants
		}
		await ref.set(chat)

		await db
			.collection('users')
			.doc(user.uid as string)
			.update({
				chatIDs: [...user.chatIDs, id]
			})

		for await (const expert of experts) {
			await db
				.collection('experts')
				.doc(expert.id)
				.update({
					chatIDs: [...expert.chatIDs, id]
				})
		}

		dispatch(recieveChat(chat))
		dispatch(recieveConversation({ [chat.id]: {} }))
	} catch (e) {}
}

export const seeChat = (chatID: string): AppThunk => async (
	dispatch,
	getState
) => {
	const {
		user: { uid },
		chats
	} = getState()
	const chat = chats[chatID]
	const { participants } = chat

	await db
		.collection('chats')
		.doc(chatID)
		.update({
			participants: {
				...participants,
				[uid as string]: new Date()
			}
		})

	dispatch(
		recieveChat({
			...chat,
			participants: {
				...participants,
				[uid as string]: new Date()
			}
		})
	)
}
export default chat.reducer
