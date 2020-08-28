import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import {useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import ExpertProfilePictures from 'assets/images/experts'
import { addExpert } from 'store/slices/expertsSlice'
interface Props {
	id: string
}

const MobileService: FunctionComponent<Props> = ({ id }) => {
	const allExperts = useSelector((state: RootState) => state.experts)
	const dispatch = useDispatch()
	const { expertIDs } = useSelector((state: RootState) => state.user)
	const history = useHistory()

	const { name, title, location, bio, linkedInProfile, expertise } = allExperts[
		id
	]

	const expertiseTags = expertise.map((expertise, i) => (
		<ExpertExpertise key={`${i}- key`}>{expertise}</ExpertExpertise>
	))

	const photo = ExpertProfilePictures[id]

	const handlePurchase = async () => {
		await dispatch(addExpert(id))

		history.push('/')
	}

	return (
		<Container>
			<ExpertDisplay>
				<ProfilePic src={photo} alt="" />

				<ExpertName>{name}</ExpertName>
				<ExpertTitle>{title}</ExpertTitle>
				<ExpertLocation>Located in {location}</ExpertLocation>
			</ExpertDisplay>
			<SubHeader>Bio</SubHeader>
			<ExpertBio>{bio}</ExpertBio>
			{linkedInProfile && <SubHeader>Experience</SubHeader>}
			{linkedInProfile && (
				<ExpertExperiance>{linkedInProfile}</ExpertExperiance>
			)}
			<SubHeader>Expertise</SubHeader>
			<ExpertExpertiseList>{expertiseTags}</ExpertExpertiseList>
			{!expertIDs.includes(id) && (
				<PurchaseButton onClick={handlePurchase}>
					Add to My Expert Team
				</PurchaseButton>
			)}
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
	text-align: left;
	padding-top: 18;
	position: relative;
`
const SubHeader = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #696868;
	margin: 3%;
`

const ProfilePic = styled.img`
	border-radius: 50%;
	height: 90px;
	width: 90px;
`

const ExpertDisplay = styled.div`
	width: 100%;
	border-bottom: 1px solid #c4c4c4;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 12%;
`
const ExpertName = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 13px;
	line-height: 22px;
	/* or 169% */

	text-align: center;
	letter-spacing: -0.408px;

	color: #222222;
`
const ExpertTitle = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 22px;
	text-align: center;
	letter-spacing: -0.408px;
	color: #222222;
`
const ExpertLocation = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 10px;
	line-height: 22px;
	text-align: center;
	letter-spacing: -0.408px;
	color: #696868;
`
const ExpertBio = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 22px;
	/* or 169% */
	margin-left: 3%;
	margin-right: 3%;
	letter-spacing: -0.408px;

	color: #000000;
`
const ExpertExperiance = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #e4bf7a;
	margin-left: 3%;
	margin-right: 3%;
`
const ExpertExpertiseList = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
`
const ExpertExpertise = styled.div`
	background: #dadada;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 17px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #000000;
	padding: 5px;
	margin-left: 3%;
	margin-top: 5%;
`

const PurchaseButton = styled.div`
	font-family: Open Sans;
	background: #e4bf7a;
	border: 1px solid #dedede;
	box-sizing: border-box;
	width: 343px;
	height: 50px;
	font-style: normal;
	font-weight: bold;
	font-size: 17px;
	line-height: 22px;
	color: #ffffff;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	margin: 0 auto;
	margin-bottom: 22px;
	margin-top: 25px;
`

export default MobileService
