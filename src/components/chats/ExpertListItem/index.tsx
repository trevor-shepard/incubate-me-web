import React, { FunctionComponent, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ChatIcon from '../ChatIcon'

interface Props {
	expertID: string
	selected: boolean
	onCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ChatListItem: FunctionComponent<Props> = ({
	expertID,
	selected,
	onCheckboxChange
}) => {
	const expert = useSelector((state: RootState) => state.experts[expertID])

	if (!expert) return null

	const expertsInfo = `${expert.name} ${expert.title}`

	return (
		<Container>
			<ExpertInfoContainer>
				<ChatIcon experts={[expert]} />
				<ExpertInfo>{expertsInfo}</ExpertInfo>
			</ExpertInfoContainer>

			<Input
				type="checkbox"
				checked={selected}
				onChange={onCheckboxChange}
				className="form-check-input"
			/>
		</Container>
	)
}
const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: 13%;
	padding: 5%;
	text-decoration: none;
`
const ExpertInfoContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
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

const Input = styled.input`
	border: 1px solid #9f9f9f;
	box-sizing: border-box;
	border-radius: 50%;
`

export default ChatListItem
