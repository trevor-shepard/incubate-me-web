import React, { useEffect, FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import {
	Message,
	Conversation,
	recieveConversation
} from 'store/slices/conversationsSlice'

import { convertTimestamp, Timestamp } from 'utils/dateUtils'
import { db } from 'utils/firebase'
import ConversationComponent from 'components/chats/Conversation'
import Logo from 'components/Logo'
import Back from 'components/navigation/Back'
import ChatIcon from 'components/chats/ChatIcon'

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

	const experts = useSelector((state: RootState) => state.experts)
	const chat = useSelector((state: RootState) => state.chats[id])
	const { uid } = useSelector((state: RootState) => state.user)

	const [loading, setLoading] = useState(chat !== undefined)

	useEffect(() => {
		if (chat !== undefined) setLoading(false)
	}, [chat])

	useEffect(() => {
		const unsubscribe = db
			.collection('chats')
			.doc(id)
			.collection('conversation')
			.onSnapshot(qureySnapsot => {
				const conversation: Conversation = {}
				if (qureySnapsot.docs.length > 0) {
					qureySnapsot.forEach(doc => {
						const message = doc.data() as Message

						conversation[message.id] = {
							...message,
							date: convertTimestamp((message.date as unknown) as Timestamp)
						}
					})
				}

				dispatch(
					recieveConversation({
						[id]: conversation
					})
				)
			})

		return unsubscribe
	}, [dispatch, id])

	if (loading) return <>loading</>

	const expertIDs = Object.keys(chat.participants)
		.filter(i => i !== uid)
		.sort((a, b) =>
			chat.participants[a] > chat.participants[b]
				? -1
				: chat.participants[a] < chat.participants[b]
				? 1
				: 0
		)
	const chatExperts = expertIDs.map(expertID => experts[expertID])

	const expertsInfo =
		expertIDs.length === 1
			? `${experts[expertIDs[0]].name} ${experts[expertIDs[0]].title}`
			: chatExperts.reduce((acc, curr) => acc + `${curr.name} `, '')

	return (
		<Container>
			<Logo />
			<Header>
				<Back absolute={false} text={false} />
				<ChatIcon expertIDs={expertIDs} />
				<ExpertInfo>{expertsInfo}</ExpertInfo>
			</Header>
			<ConversationComponent chatID={id} />
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
`
const Header = styled.div`
	height: 10%;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	border-bottom: 1px solid #c4c4c4;
	padding: 2%;
`

const ExpertInfo = styled.div`
	font-family: Arimo;
	font-style: normal;
	font-weight: normal;
	font-size: 17px;
	line-height: 22px;
	/* identical to box height, or 129% */

	letter-spacing: -0.408px;

	color: #000000;
`

export default Chat
