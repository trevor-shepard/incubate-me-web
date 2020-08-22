import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppThunk } from '..'

import firebase, { auth, db } from 'utils/firebase'
import { fetchExperts, clearExperts } from './expertsSlice'
import { fetchChats, clearChats } from './chatsSlice'
import { clearConversations } from './conversationsSlice'

export interface UserState {
	username: string | null
	email: string | null
	uid: string | null
	linkedIn: string | null
	companyUrl: string | null
	fundingStage:
		| 'self/family'
		| 'bank'
		| 'angel'
		| 'seed'
		| 'series-a'
		| 'other'
		| null
	services: {
		accounting: boolean
		humanResource: boolean
		stratigicFinance: boolean
	}
	neededExpertise: {
		bookKeeping: boolean
		accounting: boolean
		cpa: boolean
		tresauryManagment: boolean
		paymentManagement: boolean
		receivablesManagment: boolean
		fluxAnalysisOfMonthlyFinancialStatements: boolean
		budgetingPlanning: boolean
		financialModeling: boolean
		alternativeFinancingGovFinancing: boolean
		CFOAdvisory: boolean
		Management1099: boolean
		w2Onboarding: boolean
		payrollManagment: boolean
		healthcareManagment: boolean
	}
	expertIDs: string[]
	chatIDs: string[]
	error: string | null
}

export interface User {
	username: string
	uid: string
	email: string
	linkedIn: string
	companyUrl: string
	fundingStage: 'self/family' | 'bank' | 'angel' | 'seed' | 'series-a' | 'other'
	services: {
		accounting: boolean
		humanResource: boolean
		stratigicFinance: boolean
	}
	neededExpertise: {
		bookKeeping: boolean
		accounting: boolean
		cpa: boolean
		tresauryManagment: boolean
		paymentManagement: boolean
		receivablesManagment: boolean
		fluxAnalysisOfMonthlyFinancialStatements: boolean
		budgetingPlanning: boolean
		financialModeling: boolean
		alternativeFinancingGovFinancing: boolean
		CFOAdvisory: boolean
		Management1099: boolean
		w2Onboarding: boolean
		payrollManagment: boolean
		healthcareManagment: boolean
	}
	expertIDs: string[]
	chatIDs: string[]
}

interface UserWithoutId {
	username: string
	email: string
	linkedIn: string
	fundingStage: 'self/family' | 'bank' | 'angel' | 'seed' | 'series-a' | 'other'
	companyUrl: string
	services: {
		accounting: boolean
		humanResource: boolean
		stratigicFinance: boolean
	}
	neededExpertise: {
		bookKeeping: boolean
		accounting: boolean
		cpa: boolean
		tresauryManagment: boolean
		paymentManagement: boolean
		receivablesManagment: boolean
		fluxAnalysisOfMonthlyFinancialStatements: boolean
		budgetingPlanning: boolean
		financialModeling: boolean
		alternativeFinancingGovFinancing: boolean
		CFOAdvisory: boolean
		Management1099: boolean
		w2Onboarding: boolean
		payrollManagment: boolean
		healthcareManagment: boolean
	}
	chatIDs: string[]
	expertIDs: string[]
}

interface UserUpdate {
	linkedIn?: string
	fundingStage?:
		| 'self/family'
		| 'bank'
		| 'angel'
		| 'seed'
		| 'series-a'
		| 'other'
	companyUrl?: string
	neededExpertise?: {
		bookKeeping: boolean
		accounting: boolean
		cpa: boolean
		tresauryManagment: boolean
		paymentManagement: boolean
		receivablesManagment: boolean
		fluxAnalysisOfMonthlyFinancialStatements: boolean
		budgetingPlanning: boolean
		financialModeling: boolean
		alternativeFinancingGovFinancing: boolean
		CFOAdvisory: boolean
		Management1099: boolean
		w2Onboarding: boolean
		payrollManagment: boolean
		healthcareManagment: boolean
	}
}

const initialState: UserState = {
	username: null,
	email: null,
	uid: null,
	error: null,
	linkedIn: null,
	companyUrl: null,
	fundingStage: null,
	services: {
		accounting: false,
		humanResource: false,
		stratigicFinance: false
	},
	neededExpertise: {
		bookKeeping: false,
		accounting: false,
		cpa: false,
		tresauryManagment: false,
		paymentManagement: false,
		receivablesManagment: false,
		fluxAnalysisOfMonthlyFinancialStatements: false,
		budgetingPlanning: false,
		financialModeling: false,
		alternativeFinancingGovFinancing: false,
		CFOAdvisory: false,
		Management1099: false,
		w2Onboarding: false,
		payrollManagment: false,
		healthcareManagment: false
	},
	chatIDs: [],
	expertIDs: []
}

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		recieveUser(state, action: PayloadAction<User>) {
			return {
				...action.payload,
				error: null
			}
		},
		clear() {
			firebase.auth().signOut()
			return {
				username: null,
				email: null,
				uid: null,
				error: null,
				linkedIn: null,
				fundingStage: null,
				companyUrl: null,
				services: {
					accounting: false,
					humanResource: false,
					stratigicFinance: false
				},
				neededExpertise: {
					bookKeeping: false,
					accounting: false,
					cpa: false,
					tresauryManagment: false,
					paymentManagement: false,
					receivablesManagment: false,
					fluxAnalysisOfMonthlyFinancialStatements: false,
					budgetingPlanning: false,
					financialModeling: false,
					alternativeFinancingGovFinancing: false,
					CFOAdvisory: false,
					Management1099: false,
					w2Onboarding: false,
					payrollManagment: false,
					healthcareManagment: false
				},
				expertIDs: [],
				chatIDs: []
			}
		},
		updateUser(state, action: PayloadAction<UserUpdate>) {
			return {
				...state,
				...action.payload
			}
		},
		userError(state, action: PayloadAction<string>) {
			state.error = action.payload
			return state
		}
	}
})

export const { recieveUser, userError, clear, updateUser } = user.actions

export default user.reducer

export const login = (
	email: string,
	password: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.signInWithEmailAndPassword(email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})
		dispatch(fetchExperts())
		const user = (await db
			.collection('users')
			.doc(uid)
			.get()
			.then(doc => doc.data())) as User

		dispatch(fetchChats(user.chatIDs))
		dispatch(recieveUser(user))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const signup = (
	user: UserWithoutId,
	password: string
): AppThunk => async dispatch => {
	try {
		const uid = await auth
			.createUserWithEmailAndPassword(user.email, password)
			.then(resp => {
				if (resp === null || resp.user === null) {
					throw new Error('user not found')
				} else {
					return resp.user.uid
				}
			})
		dispatch(fetchExperts())
		await db
			.collection('users')
			.doc(uid)
			.set({
				...user,
				uid
			})
		dispatch(
			recieveUser({
				...user,
				uid
			})
		)
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const update = (
	id: string,
	update: UserUpdate
): AppThunk => async dispatch => {
	try {
		await db
			.collection('users')
			.doc(id)
			.update(update)
		dispatch(updateUser(update))
	} catch (error) {
		dispatch(userError(error.message))
	}
}

export const logout = (): AppThunk => async dispatch => {
	dispatch(clear())
	dispatch(clearChats())
	dispatch(clearConversations())
	dispatch(clearExperts())
}
