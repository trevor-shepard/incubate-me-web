import React, { FunctionComponent, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { signup } from 'store/slices/userSlice'
import TextInput from 'components/inputs/text'
import SelectInput from 'components/inputs/select'
import Checkbox from 'components/inputs/checkbox'
import Logo from 'components/Logo'

const SignUp: FunctionComponent = () => {
	const dispatch = useDispatch()
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password1, setPassword1] = useState('')
	const [password2, setPassword2] = useState('')
	const [linkedIn, linkedInSet] = useState('')
	const [companyUrl, companyUrlSet] = useState('')
	const [fundingStage, fundingStageSet] = useState<
		'self/family' | 'bank' | 'angel' | 'seed' | 'series-a' | 'other'
	>('self/family')

	const [bookKeeping, bookKeepingSet] = useState(false)
	const [accounting, accountingSet] = useState(false)
	const [cpa, cpaSet] = useState(false)
	const [tresauryManagment, tresauryManagmentSet] = useState(false)
	const [paymentManagement, paymentManagementSet] = useState(false)
	const [receivablesManagment, receivablesManagmentSet] = useState(false)
	const [
		fluxAnalysisOfMonthlyFinancialStatements,
		fluxAnalysisOfMonthlyFinancialStatementsSet
	] = useState(false)
	const [budgetingPlanning, budgetingPlanningSet] = useState(false)
	const [financialModeling, financialModelingSet] = useState(false)
	const [
		alternativeFinancingGovFinancing,
		alternativeFinancingGovFinancingSet
	] = useState(false)
	const [CFOAdvisory, CFOAdvisorySet] = useState(false)
	const [Management1099, Management1099Set] = useState(false)
	const [w2Onboarding, w2OnboardingSet] = useState(false)
	const [payrollManagment, payrollManagmentSet] = useState(false)
	const [healthcareManagment, healthcareManagmentSet] = useState(false)

	const [error, setError] = useState('')
	const handleSignUp = () => {
		if (!username) return setError('Your Name (First Last) is required')
		if (!email) return setError('Your Email is required')
		if (password1 !== password2) return setError('passwords do not match')
		dispatch(
			signup(
				{
					email,
					username,
					linkedIn,
					companyUrl,
					fundingStage,
					neededExpertise: {
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
					},
					services: {
						accounting: false,
						humanResource: false,
						stratigicFinance: false
					},
					experts: []
				},
				password1
			)
		)
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
			<Logo />
			<Header>
				Sign up to get help on optimizing your business bottomline.
			</Header>
			<SubHeader>
				Solve all your finance and HR needs at your fingertip, with a flexible
				and connected team of accounting, HR, and finance experts accessible
				on-demand. Try it for FREE.
			</SubHeader>
			{error && <Error>{error}</Error>}
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setUsername(e.target.value)
				}
				value={username}
				label={'Your Name (First Last) *'}
			/>
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setEmail(e.target.value)
				}
				value={email}
				label={'Your Email *'}
			/>
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
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword1(e.target.value)
				}
				type="password"
				value={password1}
				label={'Password *'}
			/>
			<TextInput
				handleInput={(e: React.ChangeEvent<HTMLInputElement>) =>
					setPassword2(e.target.value)
				}
				type="password"
				value={password2}
				label={'Confirm Password *'}
			/>
			{error && <Error>{error}</Error>}
			<SubmitContainer>
				<SubmitButton onClick={handleSignUp}>Submit</SubmitButton>
			</SubmitContainer>
		</Container>
	)
}

const Container = styled.div`
	padding: 20px;
	height: 100vh;
	overflow: scroll;
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
	margin-top: 40px;
	margin-bottom: 20px;
`

const SubHeader = styled.div`
	font-family: Poppins;
	font-style: normal;
	font-size: 15px;
	line-height: 25px;
	letter-spacing: -0.408px;
	color: #404040;
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
`

export default SignUp
