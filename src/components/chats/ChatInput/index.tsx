import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { sendMessage } from 'store/slices/conversationsSlice'
interface Props {
	
		id: string
	
}

const ChatInput: FunctionComponent<Props> = ({ id }) => {
	const dispatch = useDispatch()
	const [message, setMessage] = useState('')

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value)
	}

	const handleSubmit = () => {
		if (message.length > 0) dispatch(sendMessage(id, message))
		setMessage('')
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
	width: 100%;
	height: 50px;
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	align-self: flex-end;
	background: #ffffff;
	box-shadow: 0px -3px 4px rgba(202, 202, 202, 0.25);
`

const Input = styled.input`
	border: none;
	width: 80%;
	text-align: center;
	font-size: 16px;
	&:hover {
		outline: none;
	}
	&:focus::-webkit-input-placeholder {
		color: transparent;
	}
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
