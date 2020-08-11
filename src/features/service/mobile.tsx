import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import SERVICE_DETAILS from 'assets/data/servicesDetails'
import { checkmark } from 'assets/icons'
import ExpertsDisplay from 'components/experts/ExpertsDisplay'
import Back from 'components/navigation/Back'

interface LocationState {
	state: {
		service: string
	}
}

const MobileService: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user)
	const allExperts = useSelector((state: RootState) => state.experts)
	const history = useHistory()
	const { state } = useLocation() as LocationState

	if (
		!state ||
		!state.service ||
		!Object.keys(SERVICE_DETAILS).includes(state.service)
	)
		history.push('/')

	const { service } = state
	if (!Object.keys(SERVICE_DETAILS).includes(service))
		console.log(SERVICE_DETAILS)

	const { displayName, price, details, expertIds } = SERVICE_DETAILS[service]

	const experts = Object.values(allExperts).filter((expert) => expertIds.includes(expert.id))
	

	const detailDisplays = details.map(detail => (
		<Detail>
			<Checkmark src={checkmark} alt="checkmark" />
			<DetailContent>{detail}</DetailContent>
		</Detail>
	))

	// debugger
	return (
		<Container>
			<Back />
			<Header>{displayName}</Header>
			<Pricing>{price}</Pricing>
			<SubHeader>Our {displayName} includes:</SubHeader>
			<DetailsContainer>{detailDisplays}</DetailsContainer>
			<ExpertsContainer>
				<ExpertsHeader>Recommended Accounting Service Experts</ExpertsHeader>
				<ExpertsDisplay experts={experts} />
			</ExpertsContainer>
			<PurchaseButton>Purchase</PurchaseButton>
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

const Header = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	width: 90%;
	padding: 16px;
	text-align: left;
	margin-top: 10%;
	margin-bottom: 34px;
`
const Pricing = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #696868;
	margin-bottom: 29px;
	padding-left: 16px;
`
const SubHeader = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 14px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #222222;
	padding-left: 16px;
`
const DetailsContainer = styled.div`
	padding-left: 16px;
`

const Detail = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 14px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #000000;
	display: flex;
	flex-direction: row;
	margin-bottom: 25px;
`
const DetailContent = styled.div`
	text-align: left;
`

const Checkmark = styled.img`
	width: 15px;
	height: 10.94px;
	padding-top: 6px;
	padding-right: 5px;
`

const ExpertsContainer = styled.div`
	width: 100%;
	text-align: left;
`

const ExpertsHeader = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 22px;
	color: #696868;
	margin-bottom: 20px;
	padding-left: 10px;
`

const PurchaseButton = styled.div`
	font-family: Open Sans;
	background: #E4BF7A;
	border: 1px solid #DEDEDE;
	box-sizing: border-box;
	width: 343px;
	height: 50px;
	font-style: normal;
	font-weight: bold;
	font-size: 17px;
	line-height: 22px;
	color: #FFFFFF;
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
