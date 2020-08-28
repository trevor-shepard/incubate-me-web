import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import Logout from 'components/Logout'
import Logo from 'components/Logo'
import SERVICE_DETAILS from 'assets/data/servicesDetails'
import { Expert } from 'store/slices/expertsSlice'
import Select from 'components/inputs/select'
import ExpertList from 'components/experts/ExpertsList'

const Experts: FunctionComponent = () => {
	const [serviceName, setService] = useState('accounting')

	const allExperts = useSelector(
		(state: RootState) => Object.values(state.experts) as Expert[]
	)

	const SERVICES = [
		{ value: 'accounting', display: 'Accounting experts' },
		{ value: 'humanResource', display: 'Human Resource experts' },
		{ value: 'stratigicFinance', display: 'Stratigic Finance experts' }
	]

	const { expertIDs, displayName } = SERVICE_DETAILS[serviceName]

	const experts = Object.values(allExperts).filter(expert =>
		expertIDs.includes(expert.id)
	)

	return (
		<Container>
			<Logo />
			<Logout />
			<Header>Discover Experts</Header>
			<StyledSelect
				handleSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
					setService(
						e.target.value as
							| 'accounting'
							| 'humanResource'
							| 'stratigicFinance'
					)
				}
				value={serviceName}
				options={SERVICES}
				leftMargin={'3%'}
			/>

			<SubHeader>{displayName} Experts</SubHeader>
			<ExpertList experts={experts} />
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
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
	color: #696868;
`

const SubHeader = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #696868;
	text-align: left;
	padding: 16px;
`

const StyledSelect = styled(Select)`
	margin-left: 3%;
`

export default Experts
