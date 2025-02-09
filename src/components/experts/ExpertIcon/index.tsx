import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Expert } from 'store/slices/expertsSlice'

interface ExpertIconProps {
	expert: Expert
}

const ExpertIcon: FunctionComponent<ExpertIconProps> = ({
	expert: { id, name, title, image }
}) => {
	const photo = image

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
	flex-direction: column;
	align-items: center;

	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	line-height: 15px;
	/* or 150% */

	text-align: center;
	letter-spacing: -0.408px;

	color: #000000;
`

const ProfilePic = styled.img`
	border-radius: 50%;
	height: 60px;
	width: 60px;
`

export default ExpertIcon
