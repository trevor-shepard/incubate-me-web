import React, { useEffect, FunctionComponent, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { backArrow } from 'assets/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { recieveChat } from 'store/slices/chatsSlice'
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

	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db
			.collection('chats')
			.doc(id)
			.onSnapshot(doc => dispatch(doc.data()))
		return unsubscribe
	}, [dispatch, id])

	return <div></div>
}

export default Chat
