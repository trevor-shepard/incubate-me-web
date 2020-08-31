import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'
import { Expert, fetchUserAsExpert } from 'store/slices/expertsSlice'
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
				const value = doc.data() as Chat

				return value
			})

		dispatch(recieveChat(chat))
	} catch (e) {
		console.log('error retreiving chat')
	}
}

export const fetchChats = (chatIDs: string[]): AppThunk => async dispatch => {
	try {
		if (chatIDs.length === 0) return
		await db
			.collection('chats')
			.where('id', 'in', chatIDs)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					const chat = doc.data() as Chat

					dispatch(fetchConversation(chat.id))
					dispatch(recieveChat(chat))
				})
			})
	} catch (error) {
		console.log('error', error)
	}
}

export const fetchUserExpertChats = (chatIDs: string[]): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const { experts } = getState()
		const expertIDs = Object.keys(experts)
		if (chatIDs.length === 0) return
		const chats: Chat[] = await db
			.collection('chats')
			.where('id', 'in', chatIDs)
			.get()
			.then(querySnapshot => {
				const values:Chat[] = []
				querySnapshot.forEach(async doc => {
					const chat = doc.data() as Chat
					values.push(chat)
				})
				return values
			})
		for (const chat of chats) {
			const { participants } = chat

			for (const participantID of Object.keys(participants)) {
				if (!expertIDs.includes(participantID))
					
					await dispatch(fetchUserAsExpert(participantID))
			}

			dispatch(fetchConversation(chat.id))
			dispatch(recieveChat(chat))
		}
	} catch (error) {
		console.log('error', error)
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
					[expert.id]: new Date().toString()
				}
			},
			{ [user.uid as string]: new Date().toString() }
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
				[uid as string]: new Date().toString()
			}
		})

	dispatch(
		recieveChat({
			...chat,
			participants: {
				...participants,
				[uid as string]: new Date().toString()
			}
		})
	)
}
export default chat.reducer
