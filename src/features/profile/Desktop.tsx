import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RootState } from 'store/rootReducer'
import { update, logout, User } from 'store/slices/userSlice'
import TextInput from 'components/inputs/text'
import SelectInput from 'components/inputs/select'
import Checkbox from 'components/inputs/checkbox'

const Profile: FunctionComponent = () => {
	const user = useSelector((state: RootState) => state.user as User)
	const dispatch = useDispatch()
	const history = useHistory()

	const [linkedIn, linkedInSet] = useState(user.linkedIn)
	const [companyUrl, companyUrlSet] = useState(user.companyUrl)
	const [fundingStage, fundingStageSet] = useState<
		'self/family' | 'bank' | 'angel' | 'seed' | 'series-a' | 'other'
	>(user.fundingStage)

	const { neededExpertise } = user

	const [bookKeeping, bookKeepingSet] = useState(neededExpertise.bookKeeping)
	const [accounting, accountingSet] = useState(neededExpertise.accounting)
	const [cpa, cpaSet] = useState(false)
	const [tresauryManagment, tresauryManagmentSet] = useState(
		neededExpertise.tresauryManagment
	)
	const [paymentManagement, paymentManagementSet] = useState(
		neededExpertise.paymentManagement
	)
	const [receivablesManagment, receivablesManagmentSet] = useState(
		neededExpertise.receivablesManagment
	)
	const [
		fluxAnalysisOfMonthlyFinancialStatements,
		fluxAnalysisOfMonthlyFinancialStatementsSet
	] = useState(neededExpertise.fluxAnalysisOfMonthlyFinancialStatements)
	const [budgetingPlanning, budgetingPlanningSet] = useState(
		neededExpertise.budgetingPlanning
	)
	const [financialModeling, financialModelingSet] = useState(
		neededExpertise.financialModeling
	)
	const [
		alternativeFinancingGovFinancing,
		alternativeFinancingGovFinancingSet
	] = useState(neededExpertise.alternativeFinancingGovFinancing)
	const [CFOAdvisory, CFOAdvisorySet] = useState(neededExpertise.CFOAdvisory)
	const [Management1099, Management1099Set] = useState(
		neededExpertise.Management1099
	)
	const [w2Onboarding, w2OnboardingSet] = useState(neededExpertise.w2Onboarding)
	const [payrollManagment, payrollManagmentSet] = useState(
		neededExpertise.payrollManagment
	)
	const [healthcareManagment, healthcareManagmentSet] = useState(
		neededExpertise.healthcareManagment
	)

	const [error, setError] = useState('')

	const isURL = (str: string) => {
		var pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		) // fragment locator
		return pattern.test(str)
	}

	const handleUpdate = async () => {
		let payload = {}

		if (linkedIn !== user.linkedIn) payload = { ...payload, linkedIn }
		if (companyUrl !== user.companyUrl) {
			if (!isURL(companyUrl)) return setError('please provide a valid url')
			payload = { ...payload, companyUrl }
		}
		if (fundingStage !== user.fundingStage)
			payload = { ...payload, fundingStage }

		type Expertise =
			| 'bookKeeping'
			| 'accounting'
			| 'cpa'
			| 'tresauryManagment'
			| 'paymentManagement'
			| 'receivablesManagment'
			| 'fluxAnalysisOfMonthlyFinancialStatements'
			| 'budgetingPlanning'
			| 'financialModeling'
			| 'alternativeFinancingGovFinancing'
			| 'CFOAdvisory'
			| 'Management1099'
			| 'w2Onboarding'
			| 'payrollManagment'
			| 'healthcareManagment'

		const neededExpertiseUpdate = {
			bookKeeping,
			accounting,
			cpa,
			tresauryManagment,
			paymentManagement,
			receivablesManagment,
			fluxAnalysisOfMonthlyFinancialStatements,
			budgetingPlanning,
			financialModeling,
			alternativeFinancingGovFinancing,
			CFOAdvisory,
			Management1099,
			w2Onboarding,
			payrollManagment,
			healthcareManagment
		}

		const expertiseKeys = Object.keys(neededExpertise) as Expertise[]

		const expertiseUpdate = expertiseKeys.some(
			expertise =>
				neededExpertise[expertise] !== neededExpertiseUpdate[expertise]
		)

		if (expertiseUpdate)
			payload = {
				...payload,
				neededExpertise: {
					...neededExpertiseUpdate
				}
			}

		if (Object.keys(payload).length > 0)
			await dispatch(update(user.uid, payload))

		history.push('/')
	}
	const FUNDING_STAGES = [
		{ value: 'self/family', display: 'Self / Friends & Family Funded,' },
		{ value: 'bank', display: 'Bank Funded' },
		{ value: 'angel', display: 'Angel Funded' },
		{ value: 'seed', display: 'Seed Funded' },
		{ value: 'series-a', display: 'Series A Funded' },
		{ value: 'other', display: 'Other' }
	]

	return (
		<Container>
			<LogoutButton />
			<Header>Update your profile</Header>
			<SubHeader>
				Create your profile to make yourself discoverable by experts
			</SubHeader>
			{error && <Error>{error}</Error>}

			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					linkedInSet(e.target.value)
				}
				value={linkedIn}
				label={'Share a link to your LinkedIn profile'}
			/>
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					companyUrlSet(e.target.value)
				}
				value={companyUrl}
				label={"Your company's URL"}
			/>
			<SelectInput
				handleSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
					fundingStageSet(
						e.target.value as
							| 'self/family'
							| 'bank'
							| 'angel'
							| 'seed'
							| 'series-a'
							| 'other'
					)
				}
				value={fundingStage}
				options={FUNDING_STAGES}
				label="Funding stage of your startup"
			/>
			<InputContainer>
				<Label>Business expertise you are seeking *</Label>
				<Checkbox
					label="Book-keeping / General Ledger"
					isSelected={bookKeeping}
					onCheckboxChange={() => bookKeepingSet(!bookKeeping)}
				/>
				<Checkbox
					label="Accounting / Banking Reconciliation"
					isSelected={accounting}
					onCheckboxChange={() => accountingSet(!accounting)}
				/>
				<Checkbox
					label="Accounting / Banking Reconciliation"
					isSelected={cpa}
					onCheckboxChange={() => cpaSet(!cpa)}
				/>
				<Checkbox
					label="Treasury Management"
					isSelected={tresauryManagment}
					onCheckboxChange={() => tresauryManagmentSet(!tresauryManagment)}
				/>
				<Checkbox
					label="Payment Management (AP)"
					isSelected={paymentManagement}
					onCheckboxChange={() => paymentManagementSet(!paymentManagement)}
				/>
				<Checkbox
					label="Receivables Management (AR)"
					isSelected={receivablesManagment}
					onCheckboxChange={() =>
						receivablesManagmentSet(!receivablesManagment)
					}
				/>
				<Checkbox
					label="Flux Analysis of Monthly Financial Statements"
					isSelected={fluxAnalysisOfMonthlyFinancialStatements}
					onCheckboxChange={() =>
						fluxAnalysisOfMonthlyFinancialStatementsSet(
							!fluxAnalysisOfMonthlyFinancialStatements
						)
					}
				/>
				<Checkbox
					label="Budgeting / Planning"
					isSelected={budgetingPlanning}
					onCheckboxChange={() => budgetingPlanningSet(!budgetingPlanning)}
				/>
				<Checkbox
					label="Financial Modeling"
					isSelected={financialModeling}
					onCheckboxChange={() => financialModelingSet(!financialModeling)}
				/>
				<Checkbox
					label="Alternative Financing / Gov Financing"
					isSelected={alternativeFinancingGovFinancing}
					onCheckboxChange={() =>
						alternativeFinancingGovFinancingSet(
							!alternativeFinancingGovFinancing
						)
					}
				/>
				<Checkbox
					label="VP Finance / CFO Advisory"
					isSelected={CFOAdvisory}
					onCheckboxChange={() => CFOAdvisorySet(!CFOAdvisory)}
				/>
				<Checkbox
					label="Contractors (1099) Management"
					isSelected={Management1099}
					onCheckboxChange={() => Management1099Set(!Management1099)}
				/>
				<Checkbox
					label="W-2 &amp; Onboarding"
					isSelected={w2Onboarding}
					onCheckboxChange={() => w2OnboardingSet(!w2Onboarding)}
				/>
				<Checkbox
					label="Payroll Management"
					isSelected={payrollManagment}
					onCheckboxChange={() => payrollManagmentSet(!payrollManagment)}
				/>
				<Checkbox
					label="Healthcare Management"
					isSelected={healthcareManagment}
					onCheckboxChange={() => healthcareManagmentSet(!healthcareManagment)}
				/>
			</InputContainer>

			{error && <Error>{error}</Error>}
			<SubmitContainer>
				<SubmitButton onClick={handleUpdate}>Submit</SubmitButton>
			</SubmitContainer>
		</Container>
	)
}

const Container = styled.div`
	padding: 20px;
	overflow: scroll;
	color: #696868;
	padding-left: 2%;
	height: 100%;
	display: relative;
`
const Error = styled.div`
	border-radius: 2px;
	background: #cc3b3b
		url(//assets.squarespace.com/universal/images-v6/standard/icon_close_7_light.png)
		no-repeat 9px 50%;
	color: #fff;
	display: inline-block;
	font-size: 13px;
	line-height: 23px;
	margin: 12px 0;
	padding: 5px 15px 3px 25px;
`

const InputContainer = styled.div`
	width: 90%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const Header = styled.h3`
	font-family: Poppins;
	font-style: normal;
	font-size: calc(1.44vh + 1rem);
	line-height: 1.3328;
	letter-spacing: -0.408px;
	color: #404040;
	width: 90%;
	text-align: left;
	margin-top: 2%;
	margin-bottom: 20px;
`

const SubHeader = styled.div`
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #9f9f9f;
	width: 90%;
	margin-top: none;
	text-align: left;
	margin-bottom: 20px;
`

const Label = styled.label`
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
`

const SubmitButton = styled.button`
	background: transparent !important;
	color: #000 !important;
	border: 2px solid #000 !important;
	font-family: Poppins;
	font-weight: 400;
	font-style: normal;
	letter-spacing: 0em;
	text-transform: none;
	line-height: 1.9em;
	font-size: calc(0vh + 1rem) !important;
	padding: 0.8em 1.336em;
	margin-bottom: 20px;
`

const SubmitContainer = styled.div`
	width: 90%;
	display: flex;
	justify-content: flex-start;
	margin-top: 20px;
	padding-bottom: 20px;
	margin-bottom: 5%;
`

const LogoutButton: FunctionComponent = () => {
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logout())
	}
	return <Logout onClick={handleLogout}>logout</Logout>
}

const Logout = styled.div`
	margin-left: 90%;
	font-family: Open Sans;
	font-style: normal;
	font-weight: normal;
	font-size: 13px;
	line-height: 22px;
	letter-spacing: -0.408px;
	color: #00000;
`
export default Profile
