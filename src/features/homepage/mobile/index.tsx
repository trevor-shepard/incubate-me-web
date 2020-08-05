import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Logo from 'components/Logo'
import Logout from 'components/Logout'
const MobileHomepage: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user)
	return (
		<>
			<Logo />
			<Logout />
			<Header>
				Hi {user.username}, select the service&#40;s&#41; you would like to have
			</Header>
			<ServicesProgressContainer>
				<ProgressContainer>
					<ProgressIndicator />
					<ProgressSeperator />
					<ProgressIndicator />
					<ProgressSeperator />
					<ProgressIndicator />
					<ProgressSeperator />
					<ProgressIndicator />
				</ProgressContainer>
				<ServicesContainer>
					<Service>
						Online Accounting Service
					</Service>
					<Service>
						Online Human Resources Service
					</Service>
					<Service>
						Online Strategic Finance Service
					</Service>
					<Service>
						Online Accounting Service
					</Service>
				</ServicesContainer>
			</ServicesProgressContainer>
		</>
	)
}

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
	margin-top: 20px;
`
const Service = styled.div`
	width: 100%;
	height: 51px;
	background: #FFFFFF;
	border: 1px solid #E4BF7A;
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
	margin-bottom: 40px;
	display: flex;
	align-items: center;
	justify-content: center;
`

const ServicesProgressContainer = styled.div`
	display: flex;

`
const ServicesContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 70%;
`
const ProgressContainer = styled.div`
	display: flex;
    flex-direction: column;
	align-items: center;
	margin-top: 17px;
	margin-bottom: 17px;
	padding-left: 20px;
	padding-right: 20px;
`
const ProgressIndicator = styled.div`
	width: 14px;
	height: 14px;
	border-radius: 10px;
	border: 2px solid #C4C4C4;
	
`
const ProgressSeperator = styled.div`
	height: 70px;
	border: 1px solid #C4C4C4;
	
`

export default MobileHomepage
