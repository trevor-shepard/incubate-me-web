import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Logo from 'components/Logo'
import Logout from 'components/Logout'
import ExpertsDisplay from 'components/experts/ExpertsDisplay'
import { Link } from 'react-router-dom'
import {Expert} from 'store/slices/expertsSlice'

const MobileHomepage: FunctionComponent = () => {
	const { username, services } = useSelector(
		(state: RootState) => state.user
	)

	const experts = useSelector((state: RootState) => Object.values(state.experts) as Expert[])
	return (
		<Container>
			<Logo />
			<Logout />
			<Header>
				Hi {username}, select the service&#40;s&#41; you would like to have
			</Header>
			<ServicesProgressContainer>
				<ProgressContainer>
					<ProgressIndicator registered={services.accounting} />
					<ProgressSeperator />
					<ProgressIndicator registered={services.humanResource} />
					<ProgressSeperator />
					<ProgressIndicator registered={services.stratigicFinance} />
					<ProgressSeperator />
					<ProgressIndicator registered={false} />
				</ProgressContainer>
				<ServicesContainer>
					<Service
						to={{
							pathname: '/service',
							state: {
								service: 'accounting'
							}
						}}
					>
						Online Accounting Service
					</Service>
					<Service
						to={{
							pathname: '/service',
							state: {
								service: 'humanResource'
							}
						}}
					>
						Online Human Resources Service
					</Service>
					<Service
						to={{
							pathname: '/service',
							state: {
								service: 'stratigicFinance'
							}
						}}
					>
						Online Strategic Finance Service
					</Service>
					<Service to="/">Online Accounting Service</Service>
				</ServicesContainer>
			</ServicesProgressContainer>
			<ExpertsContainer>
				<ExpertsHeader>Your Team of Experts</ExpertsHeader>
				{experts.length ? (
					<ExpertsDisplay experts={experts} />
				) : (
					<ExpertsEmptyMessage>
						You haven’t hired any experts for your business yet. Make your first
						hire!
					</ExpertsEmptyMessage>
				)}
			</ExpertsContainer>
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
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
`
const Service = styled(Link)`
	width: 100%;
	height: 51px;
	background: #ffffff;
	border: 1px solid #e4bf7a;
	box-sizing: border-box;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #696868;
	margin-bottom: 15%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
`

const ServicesProgressContainer = styled.div`
	display: flex;
`
const ServicesContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 80%;
`
const ProgressContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5%;
	margin-bottom: 15%;
	padding-left: 5%;
	padding-right: 5%;
`

interface ProgressIndicatorProps {
	registered: boolean
}

const ProgressIndicator = styled.div<ProgressIndicatorProps>`
	width: 14px;
	height: 14px;
	border-radius: 10px;
	border: 2px solid #e4bf7a;
	background-color: ${({ registered }) =>
		registered ? '#E4BF7A' : 'transparent'};
`
const ProgressSeperator = styled.div`
	height: 23%;
	border: 1px solid #c4c4c4;
	margin-top: 2.5px;
	margin-bottom: 2.5px;
`

const ExpertsContainer = styled.div`
	width: 100%;
	text-align: left;
	padding: 16px;
	padding-left: 0;
	margin-bottom: 10px;
`

const ExpertsHeader = styled.div`
	font-family: Open Sans;
	font-style: normal; 
	font-weight: 600;
	font-size: 16px;
	line-height: 22px;
	color: #696868;
	margin-bottom: 10px;
	padding-left: 16px;
`

const ExpertsEmptyMessage = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #696868;
	padding-right: 20px;
`

export default MobileHomepage
