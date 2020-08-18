import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'
import { User } from './userSlice'
import { Expert } from './expertsSlice'
import { convertTimestamp, Timestamp } from 'utils/dateUtils'
export interface Message {
	senderID: string
	text: string
	sent: Date
}

export interface Chat {
	id: string
	conversation: Message[]
	participants: {
		[userID: string]: Date
	}
}

export interface DatabaseChat {
	id: string
	conversation: Message[]
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
		}
	}
})

export const { recieveChat, recieveChats } = chat.actions

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
				const values = {} as ChatsState
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

					values[chat.id] = {
						...chat,
						participants
					}
				})

				return values
			})

		debugger
		dispatch(recieveChats(chats))
	} catch (e) {}
}

export const createChat = (
	user: User,
	experts: Expert[]
): AppThunk => async dispatch => {
	try {
		const ref = await db.collection('chats').doc()

		const { id } = ref

		const participants = experts.reduce(
			(acc, expert) => {
				return {
					...acc,
					[expert.id]: new Date()
				}
			},
			{ [user.uid]: new Date() }
		)

		const chat = {
			conversation: [],
			id,
			participants
		}
		await ref.set(chat)

		await db
			.collection('users')
			.doc(user.uid)
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

export default chat.reducer
