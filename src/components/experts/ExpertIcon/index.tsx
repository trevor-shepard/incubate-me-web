import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Expert } from 'store/slices/expertsSlice'

import ExpertProfilePictures from 'assets/images/experts'

interface ExpertIconProps {
	expert: Expert
}

const ExpertIcon: FunctionComponent<ExpertIconProps> = ({
	expert: { id, name, title }
}) => {
	const photo = ExpertProfilePictures[id]

	return (
		<ExpertIconContainer>
			<ProfilePic src={photo} alt="" />
			<div>{name}</div>
			<div>{title}</div>
		</ExpertIconContainer>
	)
}

const ExpertIconContainer = styled.div`
	height: 80px;
	width: 90px;
	display: flex;
	justify-content: space-between;
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 10px;
	line-height: 15px;
	text-align: center;
	letter-spacing: -0.408px;
	color: #000000;
	flex-direction: column;
	align-items: center;
`

const ProfilePic = styled.img`
	border-radius: 50%;
	height: 60px;
	width: 60px;
`

export default ExpertIcon
