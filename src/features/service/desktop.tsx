import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import SERVICE_DETAILS from 'assets/data/servicesDetails'
import { checkmark } from 'assets/icons'
import ExpertsDisplay from 'components/experts/ExpertsDisplay'
import Back from 'components/navigation/Back'
import ChargeBee from 'components/ChargeBee'
interface LocationState {
	state: {
		service: string
	}
}

const DesktopService: FunctionComponent = () => {
	const { services } = useSelector((state: RootState) => state.user)
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

	const { displayName, price, details, expertIDs, plan } = SERVICE_DETAILS[
		service
	]

	const experts = Object.values(allExperts).filter(expert =>
		expertIDs.includes(expert.id)
	)

	const detailDisplays = details.map((detail, i) => (
		<Detail key={`${i}-key`}>
			<Checkmark src={checkmark} alt="checkmark" />
			<DetailContent>{detail}</DetailContent>
		</Detail>
	))

	const unsubscribed =
		services[service as 'accounting' | 'humanResource' | 'stratigicFinance'] !==
		undefined

	return (
		<Container>
			<Left>
				<Back />
				<Header>Online {displayName} Service</Header>
				<Pricing>{price}</Pricing>
				<SubHeader>Our Online {displayName} Service includes:</SubHeader>
				<DetailsContainer>{detailDisplays}</DetailsContainer>
				{unsubscribed ? (
					<ChargeBee subscriptionPlan={plan}>Purchase</ChargeBee>
				) : (
					<div> footer </div>
				)}
			</Left>
			<Right>
				<ExpertsContainer>
					<ExpertsHeader>Recommended Accounting Service Experts</ExpertsHeader>
					<ExpertsDisplay experts={experts} />
				</ExpertsContainer>
			</Right>
		</Container>
	)
}
const Container = styled.div`
	position: relative;
	height: calc(100vh - 60px);
	overflow: none;
	display: flex;
	flex-direction: row;
`

const Left = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 5%;
	padding-left: 5%;
	padding-right: 5%;
`

const Right = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-right: 5%;
	padding-top: 5%;
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
	margin-top: 3%;
`
const Pricing = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #696868;
	margin-bottom: 3%;
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
	height: auto;
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
	margin-bottom: 3%;
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

export default DesktopService
