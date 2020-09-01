import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { Chat } from 'store/slices/chatsSlice'
import ChatIcon from '../ChatIcon'
interface Props {
	chat: Chat
	handleSelect: () => void
	selected: boolean
}

const ChatListItem: FunctionComponent<Props> = ({
	chat: { participants, id },
	handleSelect,
	selected
}) => {
	const { uid } = useSelector((state: RootState) => state.user)

	const experts = useSelector((state: RootState) => state.experts)

	const conversation = useSelector(
		(state: RootState) => state.conversations[id]
	)

	const lastSeen = participants[uid as string]
	const unseen = conversation ? Object.values(conversation).filter(
		message => new Date(lastSeen) < new Date(message.date)
	) : []
	const expertIDs = Object.keys(participants)
		.filter(i => i !== uid)
		.sort((a, b) =>
			new Date(participants[a]) > new Date(participants[b])
				? -1
				: new Date(participants[a]) < new Date(participants[b])
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
		<Container onClick={handleSelect} selected={selected}>
			<ChatIcon experts={chatExperts} unseen={unseen.length} />
			<ExpertInfo>{expertsInfo}</ExpertInfo>
		</Container>
	)
}

interface StyleProps {
	selected: boolean
}

const Container = styled.div<StyleProps>`
	display: flex;
	flex-direction: row;
	align-items: center;
	height: 13%;
	padding: 5%;
	text-decoration: none;
	border-bottom: 1px solid
		${({ selected }) => (selected ? '#E4BF7A' : '#C4C4C4')};
	box-shadow: 1px solid
		${({ selected }) =>
			selected ? '#1px 26px 15px -5px rgba(228,191,122, 1)' : 'none'};
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
