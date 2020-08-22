import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'

export interface Message {
	senderID: string
	text: string
	date: Date
	id: string
}

export interface Conversation {
	[id: string]: Message
}

export interface ConversationsState {
	[id: string]: Conversation
}

const conversations = createSlice({
	name: 'conversation',
	initialState: {} as ConversationsState,
	reducers: {
		recieveConversation(state, action: PayloadAction<ConversationsState>) {
			return {
				...state,
				...action.payload
			}
		},
		clearConversations() {
			return {}
		}
	}
})

export const { recieveConversation, clearConversations } = conversations.actions

export const fetchConversation = (
	chatID: string
): AppThunk => async dispatch => {
	const conversation: Conversation = await db
		.collection('chats')
		.doc(chatID)
		.collection('friendsSubcollection')
		.get()
		.then(qureySnapsot => {
			const messages: { [id: string]: Message } = {}
			if (qureySnapsot.docs.length > 0) {
				qureySnapsot.forEach(doc => {
					const message = doc.data() as Message

					messages[message.id] = message
				})
			}

			

			return messages
		})

	
	dispatch(
		recieveConversation({
			[chatID]: conversation
		})
	)
}

export default conversations.reducer
