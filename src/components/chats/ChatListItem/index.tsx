import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Chat } from 'store/slices/chatsSlice'
import { Link } from 'react-router-dom'
import ChatIcon from '../ChatIcon'
interface Props {
	chat: Chat
}

const ChatListItem: FunctionComponent<Props> = ({
	chat: { participants, id }
}) => {
	const { uid } = useSelector((state: RootState) => state.user)

	const experts = useSelector((state: RootState) => state.experts)

	const conversation = useSelector(
		(state: RootState) => state.conversations[id]
	)

	const lastSeen = participants[uid as string]

	const unseen = Object.values(conversation).filter(
		message => lastSeen < message.date
	)

	debugger

	const expertIDs = Object.keys(participants)
		.filter(i => i !== uid)
		.sort((a, b) =>
			participants[a] > participants[b]
				? -1
				: participants[a] < participants[b]
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
		<Container
			to={{
				pathname: '/chat',
				state: {
					id
				}
			}}
		>
			<ChatIcon expertIDs={expertIDs} unseen={unseen.length} />
			<ExpertInfo>{expertsInfo}</ExpertInfo>
		</Container>
	)
}
const Container = styled(Link)`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 13%;
	padding: 5%;
	text-decoration: none;
`
const ExpertInfo = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 1rem;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #000000;
	margin-left: 5%;
`

export default ChatListItem
