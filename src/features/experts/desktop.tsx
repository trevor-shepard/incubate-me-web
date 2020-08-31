import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import SERVICE_DETAILS from 'assets/data/servicesDetails'
import Select from 'components/inputs/select'
import ExpertList from 'components/experts/ExpertsList'
import ExpertDisplay from 'components/experts/ExpertDisplay'

const Experts: FunctionComponent = () => {
	const [serviceName, setService] = useState('accounting')
	const [selectedExpert, setSelectedExpert] = useState('')
	const allExperts = useSelector((state: RootState) => state.experts)

	const handleSelect = (expertID: string) => () => {
		setSelectedExpert(expertID)
	}

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
			<Left>
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
				<ExpertList handleSelect={handleSelect} experts={experts} />
			</Left>
			<Right>
				{allExperts[selectedExpert] !== undefined && (
					<ExpertDisplay id={selectedExpert} />
				)}
			</Right>
		</Container>
	)
}

const Container = styled.div`
	height: calc(100vh - 60px);
	overflow: scroll;
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
	padding-top: 2%;
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
