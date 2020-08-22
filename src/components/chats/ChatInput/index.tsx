import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sendMessage } from 'store/slices/conversationsSlice'
interface LocationState {
	state: {
		id: string
	}
}

const ChatInput: FunctionComponent = () => {
	const { state } = useLocation() as LocationState
	const history = useHistory()
	const dispatch = useDispatch()
	const [message, setMessage] = useState('')

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value)
	}

	if (!state || !state.id) history.goBack()

	const { id } = state

	const handleSubmit = () => {
		if (message.length > 0) dispatch(sendMessage(id, message))
	}

	return (
		<Container>
			<Input
				value={message}
				onChange={handleInput}
				placeholder="Write your message here"
			/>

			<Submit onClick={handleSubmit}>Submit</Submit>
		</Container>
	)
}

const Container = styled.div`
	height: 50px;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	align-self: flex-end;
`

const Input = styled.input`
	border: none;
	width: 80%;
	text-align: center;
	font-size: 16px;
`

const Submit = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #2970f1;
`

export default ChatInput
