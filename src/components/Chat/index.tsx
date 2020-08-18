import React, { useEffect, FunctionComponent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { backArrow } from 'assets/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { recieveChat, DatabaseChat } from 'store/slices/chatsSlice'
import { convertTimestamp } from 'utils/dateUtils'
import { db } from 'utils/firebase'

interface LocationState {
	state: {
		id: string
	}
}

const Chat: FunctionComponent = () => {
	const dispatch = useDispatch()
	// do not render if no id provided
	const history = useHistory()
	const { state } = useLocation() as LocationState
	if (!state || !state.id) history.goBack()

	const { id } = state

	const chat = useSelector((state: RootState) => state.chats[id])

	const [loading, setLoading] = useState(chat !== undefined)

	useEffect(() =>  {
		const unsubscribe = db
		.collection('chats')
		.doc(id)
		.onSnapshot(doc => {
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

			dispatch(recieveChat({
				...value,
				participants
			}))
		})

	return unsubscribe
	}, [])

	

	return <div></div>
}

export default Chat
