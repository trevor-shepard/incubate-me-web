import React, { FunctionComponent, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RootState } from 'store/rootReducer'
import ExpertComponent from 'components/chats/ExpertListItem'
import { Expert } from 'store/slices/expertsSlice'
import { createChat } from 'store/slices/chatsSlice'

const CreateGroupChat: FunctionComponent = () => {
	const dispatch = useDispatch()
	const history = useHistory()
	const allExperts = useSelector((state: RootState) => state.experts)
	const { expertIDs } = useSelector((state: RootState) => state.user)
	const [selectedExperts, setSelectedExperts] = useState<string[]>([])

	const selected: { [id: string]: boolean } = {}
	for (const id of expertIDs) {
		selected[id] = selectedExperts.includes(id)
	}

	const userExperts = expertIDs.map((id: string) => (
		<ExpertComponent
			expertID={id}
			selected={selected[id]}
			onCheckboxChange={(e: ChangeEvent<HTMLInputElement>) => {
				if (selectedExperts.includes(id)) {
					const filtered = selectedExperts.filter(item => item !== id)
					setSelectedExperts(filtered)
				} else {
					setSelectedExperts([...selectedExperts, id])
				}
			}}
		/>
	))

	const handleCreate = async () => {
		const experts: Expert[] = selectedExperts.map(
			(id: string) => allExperts[id]
		)

		await dispatch(createChat(experts))

		history.push('/chats')
	}

	return (
		<Container onClick={(e) => e.stopPropagation()}>
			<Header>
				<HeaderTitle>Your experts</HeaderTitle>
				<ChatStart onClick={handleCreate}>Create Chat</ChatStart>
			</Header>
			<List>{userExperts}</List>
		</Container>
	)
}

const Container = styled.div`
    position: absolute; 
	background: #FFFFFF;
	border: 1px solid #F0F0F0;
	box-sizing: border-box;
	box-shadow: 0px 2px 4px rgba(183, 178, 178, 0.25);
	border-radius: 3px;
    left: 0; 
    right: 0; 
	top: 10%;
    margin-left: auto; 
    margin-right: auto; 
	width: 449px;
    height: 416px;
    z-index: 100;

`
const Header = styled.div`
	height: 10%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding: 5%;
	border-bottom: 1px solid #c4c4c4;
`
const HeaderTitle = styled.div`
	font-family: Arimo;
	font-style: normal;
	font-weight: normal;
	font-size: 1.2rem;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #000000;
`
const ChatStart = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: bold;
	font-size: 13px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #222222;
`

const List = styled.div`
	display: flex;
	flex-direction: column;
`

export default CreateGroupChat
