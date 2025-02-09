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
import { seeChat } from 'store/slices/chatsSlice'

import { db } from 'utils/firebase'
import ConversationComponent from 'components/chats/Conversation'
import ChatInput from 'components/chats/ChatInput'
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
	const conversation = useSelector(
		(state: RootState) => state.conversations[id]
	)
	const { uid } = useSelector((state: RootState) => state.user)

	const [loading, setLoading] = useState(chat !== undefined)

	useEffect(() => {
		if (chat !== undefined) {
			setLoading(false)
		}
	}, [chat])

	useEffect(() => {
		dispatch(seeChat(id))
	}, [conversation, id, dispatch])

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

						conversation[message.id] = message
					})

					dispatch(
						recieveConversation({
							[id]: conversation
						})
					)
				}
			})

		return unsubscribe
	}, [dispatch, id])

	if (loading) return <>loading</>

	const expertIDs = Object.keys(chat.participants)
		.filter(i => i !== uid)
		.sort((a, b) =>
			new Date(chat.participants[a]) > new Date(chat.participants[b])
				? -1
				: new Date(chat.participants[a]) < new Date(chat.participants[b])
				? 1
				: 0
		)
	const chatExperts = expertIDs.map(expertID => experts[expertID])

	const expertsInfo =
		expertIDs.length === 1
			? `${experts[expertIDs[0]].name} ${experts[expertIDs[0]].title}`
			: chatExperts.reduce(
					(acc, curr, i) => acc + `${i !== 0 ? ', ' : ''}${curr.name}`,
					''
			  )

	return (
		<Container>
			<Logo />
			<Header>
				<Back absolute={false} text={false} />
				<ChatIcon height={'30px'} experts={chatExperts} />
				<ExpertInfo>{expertsInfo}</ExpertInfo>
			</Header>
			<ConversationComponent chatID={id} />
			<ChatInput id={id} />
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
	letter-spacing: -0.408px;
	color: #000000;
	margin-left: 2%;
	padding-bottom: 4px;
`

export default Chat
