import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'
import { createChat } from 'store/slices/chatsSlice'
import { recieveUser, User } from 'store/slices/userSlice'
export interface Expert {
	bio: string
	id: string
	name: string
	email: string
	title: string
	linkedInProfile?: string
	location: string
	expertise: string[]
	chatIDs: string[]
}

export interface ExpertState {
	[id: string]: Expert
}

const initialState: ExpertState = {}

const experts = createSlice({
	name: 'experts',
	initialState: initialState,
	reducers: {
		recieveExperts(state, action: PayloadAction<ExpertState>) {
			return action.payload
		},
		recieveExpert(state, action: PayloadAction<Expert>) {
			const expert = action.payload
			return {
				...state,
				[expert.id]: expert
			}
		},
		clearExperts() {
			return {}
		}
	}
})

export const { recieveExperts, recieveExpert, clearExperts } = experts.actions

export const fetchExperts = (): AppThunk => async dispatch => {
	try {
		const experts: ExpertState = await db
			.collection('experts')
			.get()
			.then(querySnapshot => {
				const values: ExpertState = {}
				querySnapshot.forEach(doc => {
					const expert = doc.data() as Expert
					values[expert.id] = expert
				})

				return values
			})
		dispatch(recieveExperts(experts))
	} catch (e) {
		console.log('error retreiving experts')
	}
}

export const addExpert = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const { user, experts } = getState()
		const { expertIDs, uid } = user
		const expert = experts[id]

		await db
			.collection('users')
			.doc(uid as string)
			.update({
				expertIDs: [...expertIDs, id]
			})
		dispatch(
			recieveUser({
				...(user as User),
				expertIDs: [...expertIDs, id]
			})
		)
		await dispatch(createChat([expert]))
	} catch (error) {}
}

export const fetchUserAsExpert = (uid: string): AppThunk => async (
	dispatch,
	getState
) => {
	try {
		const { experts } = getState()

		if (experts[uid] !== undefined) return null

		const { username, email, chatIDs } = (await db
			.collection('users')
			.doc(uid)
			.get()
			.then(doc => doc.data())) as User
		
		dispatch(
			recieveExpert({
				bio: '',
				id: uid,
				name: username,
				email,
				title: '',
				linkedInProfile: '',
				location: '',
				expertise: [],
				chatIDs
			})
		)
	} catch (error) {}
}

export default experts.reducer
