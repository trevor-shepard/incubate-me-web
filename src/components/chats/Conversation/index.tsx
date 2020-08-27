import React, { FunctionComponent, useRef, useEffect } from 'react'
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
		.sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : new Date(a.date) > new Date(b.date) ? 1 : 0))
		.map((message, i) => (
			<MessageComponent key={`message-${i}`} message={message} />
		))

	const myRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (myRef.current !== null) {
			const el = myRef.current
			el.scrollTop = el.scrollHeight
		}
	}, [myRef, messages])

	return (
		<Container ref={myRef}>
			<Begenning>This is the beginning of your chat</Begenning>

			{messages}
		</Container>
	)
}

const Container = styled.div`
	height: 75%;
	overflow: scroll;
`
const Begenning = styled.div`
	margin-top: 2%;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 22px;
	/* identical to box height, or 169% */

	letter-spacing: -0.408px;

	color: #696868;
`

export default Conversation
