import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '..'
import { db } from 'utils/firebase'

export interface Expert {
	bio: string
	id: string
	name: string
	email: string
	title: string
}

export interface ExpertState {
	[id: string]: Expert
}

const initialState: ExpertState = {

}

const experts = createSlice({
	name: 'experts',
	initialState: initialState,
	reducers: {
		recieveExperts(state, action: PayloadAction<ExpertState>) {
			return action.payload
		},
		logout() {
			return {}
		}
	}
})

export const { recieveExperts } = experts.actions

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

export default experts.reducer