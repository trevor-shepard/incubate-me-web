import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'
import { Expert } from './expertsSlice'
import { convertTimestamp, Timestamp } from 'utils/dateUtils'
import { Message } from 'store/slices/conversationsSlice'

export interface Chat {
	id: string
	participants: {
		[userID: string]: Date
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
							[id]: convertTimestamp(value.participants[id])
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
		const chats = await db
			.collection('chats')
			.where('id', 'in', chatIDs)
			.get()
			.then(querySnapshot => {
				const values: Chat[] = []
				querySnapshot.forEach(doc => {
					const chat = doc.data() as DatabaseChat
					const participants = Object.keys(chat.participants).reduce(
						(acc, id) => {
							return {
								...acc,
								[id]: convertTimestamp(chat.participants[id])
							}
						},
						{}
					)
					values.push({
						...chat,
						participants
					})
				})

				return values
			})

		for (const chat of chats) {
			db.collection('chats')
				.doc(chat.id)
				.collection('conversation')
				.get()
				.then(querySnapshot => {
					const messages: Message[] = []

					querySnapshot.forEach(doc => {
						const message = doc.data() as Message

						messages.push(message)
					})

					dispatch(
						recieveChat({
							...chat
						})
					)
				})
		}
	} catch (e) {}
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
	} catch (e) {}
}

export const seenChat = (chatID: string): AppThunk => async (
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
