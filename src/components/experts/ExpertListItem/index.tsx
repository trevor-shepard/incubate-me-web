import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Expert } from 'store/slices/expertsSlice'
import { Link } from 'react-router-dom'

import ExpertProfilePictures from 'assets/images/experts'

interface ExpertIconProps {
	expert: Expert
}

const ExpertIcon: FunctionComponent<ExpertIconProps> = ({
	expert: { id, name, title }
}) => {
	const photo = ExpertProfilePictures[id]

	return (
		<ExpertListItemContainer
			to={{
				pathname: '/expert',
				state: {
					id
				}
			}}
		>
			<ProfilePic src={photo} alt="" />
			<ExpertInfo>
				<ExpertName>{name}</ExpertName>
				<ExpertTitle>{title}</ExpertTitle>
			</ExpertInfo>
		</ExpertListItemContainer>
	)
}

const ExpertListItemContainer = styled(Link)`
	display: flex;
	justify-content: flex-start;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 75px;
	border-bottom: 1px solid #dadada;
	text-decoration: none;
`

const ExpertInfo = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 10px;
	line-height: 15px;
	letter-spacing: -0.408px;
	color: #000000;
	display: flex;
	flex-direction: column-reverse;
	margin-left: 6%;
	text-align: left;
`

const ProfilePic = styled.img`
	border-radius: 40px;
	height: 60px;
	width: 60px;
	margin-left: 2%;
`

const ExpertTitle = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 22px;
	/* or 169% */

	letter-spacing: -0.408px;

	color: #222222;
`
const ExpertName = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 22px;
	/* or 169% */

	letter-spacing: -0.408px;

	color: #222222;
`

export default ExpertIcon
