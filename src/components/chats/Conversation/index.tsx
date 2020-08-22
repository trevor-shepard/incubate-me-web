import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import MessageComponent from './Message'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

interface Props {
	chatID: string
}

const Conversation: FunctionComponent<Props> = ({ chatID }) => {
	const conversation = useSelector(
		(state: RootState) => state.conversations[chatID]
	)
	const messages = Object.values(conversation)
		.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
		.map((message, i) => (
			<MessageComponent key={`message-${i}`} message={message} />
		))

	return (
		<Container>
			{messages.length > 0 ? messages : 'This is the beginning of your chat'}
		</Container>
	)
}

const Container = styled.div``

export default Conversation
