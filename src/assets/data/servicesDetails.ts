import {Expert} from 'store/slices/expertsSlice'


export interface Service {
	name: string
	displayName: string
	price: string
	details: string[]
	experts: Expert[]
}

export const accounting: Service = {
	name: 'accounting',
	displayName: 'Online Accounting Service',
	price: '$100 per month',
	details: [
		'Dedicated expert team including your account manager, accountant, and a CPA or VP of Finance level advisor.',
		'Open and maintain your bank and credit card account(s), as well as bank transactions and reconciliation.',
		'Accrual or cash basis bookkeeping',
		'Income, balance sheet, and cash flow statements',
		'On-demand chat with your expert team',
		'One hour per month video session with your expert team'
	],
	experts: [
		{
			bio:'CFO, CFA for various startups and SMBs. MBA from University of Michigan, BSc from Columbia University. Had a baby during COVID19.',
			id: 'Lbgz8QodrFNZDNMiOmRiVXZjZtZ2',
			name: 'Manny Song',
			email: 'me.song@gmail.com',
			title: 'CFO, CFA'
		},
		{
			bio:'Controller & CPA for various startups & SMBs. Started as an accounting and tax specialist at KPMG. BS from San Jose State University. Does needlepoint in her spare time.',
			id: 'Q47HpkjiSmUoi0RLtzuVgSLpCtR2',
			name: 'Amy Marcoccia',
			email: 'amy@amaccountancy.com',
			title: 'Controller & CPA'
		},
		{
			bio:'Founder of Incubate-me. Previously VP of Finance & HR at Premise; MBA from Wharton Business School. A wannabe yogi, meditator and foodie.',
			id: 'TGJ3tIDZn9dC84rKRYTfn6uyNYv2',
			name: 'Alice Zhang',
			email: 'alice4zhang@gmail.com',
			title: 'VP of Finance'
		},
	]
}

export const humanResource: Service = {
	name: 'humanResource',
	displayName: 'Online Human Resource Service',
	price: '$100 per month',
	details: [
		'Dedicated expert team including your account manager, HR specialist, and a HR manager or above level advisor.',
		'Manage your contractor contract.',
		'Manage your W-2 contract, employee handbook, and on-boarding',
		'Manage hiring and firing',
		'Manage payroll',
		'Manage benefits including healthcare, insurance, (401)K etc.',
		'On-demand chat with your expert team',
		'One hour per month video session with your expert team'
	],
	experts: [
		{
			bio:'CFO, CFA for various startups and SMBs. MBA from University of Michigan, BSc from Columbia University. Had a baby during COVID19.',
			id: 'Lbgz8QodrFNZDNMiOmRiVXZjZtZ2',
			name: 'Manny Song',
			email: 'me.song@gmail.com',
			title: 'CFO, CFA'
		},
		{
			bio:'Controller & CPA for various startups & SMBs. Started as an accounting and tax specialist at KPMG. BS from San Jose State University. Does needlepoint in her spare time.',
			id: 'Q47HpkjiSmUoi0RLtzuVgSLpCtR2',
			name: 'Amy Marcoccia',
			email: 'amy@amaccountancy.com',
			title: 'Controller & CPA'
		},
		{
			bio:'Founder of Incubate-me. Previously VP of Finance & HR at Premise; MBA from Wharton Business School. A wannabe yogi, meditator and foodie.',
			id: 'TGJ3tIDZn9dC84rKRYTfn6uyNYv2',
			name: 'Alice Zhang',
			email: 'alice4zhang@gmail.com',
			title: 'VP of Finance'
		},
	]
}
export const stratigicFinance: Service = {
	name: 'stratigicFinance',
	displayName: 'Online Stratigic Finance Service',
	price: '$250 per month',
	details: [
		'Dedicated expert team including your account manager, FP&A analyst, and a VP of Finance or CFO level advisor.',
		'Review AR and AP and suggest saving opportunities ',
		'Review financial statements and suggest saving opportunities',
		'Budgeting ',
		'Manage alternative financing if applicable',
		'Manage investor communication if applicable',
		'On-demand chat with your expert team',
		'One hour per month video session with your expert team'
	],
	experts: [
		{
			bio:'CFO, CFA for various startups and SMBs. MBA from University of Michigan, BSc from Columbia University. Had a baby during COVID19.',
			id: 'Lbgz8QodrFNZDNMiOmRiVXZjZtZ2',
			name: 'Manny Song',
			email: 'me.song@gmail.com',
			title: 'CFO, CFA'
		},
		{
			bio:'Controller & CPA for various startups & SMBs. Started as an accounting and tax specialist at KPMG. BS from San Jose State University. Does needlepoint in her spare time.',
			id: 'Q47HpkjiSmUoi0RLtzuVgSLpCtR2',
			name: 'Amy Marcoccia',
			email: 'amy@amaccountancy.com',
			title: 'Controller & CPA'
		},
		{
			bio:'Founder of Incubate-me. Previously VP of Finance & HR at Premise; MBA from Wharton Business School. A wannabe yogi, meditator and foodie.',
			id: 'TGJ3tIDZn9dC84rKRYTfn6uyNYv2',
			name: 'Alice Zhang',
			email: 'alice4zhang@gmail.com',
			title: 'VP of Finance'
		},
	]
}

interface ServiceLibary {
	[serviceName: string]: Service
}

const library: ServiceLibary = {
	accounting,
	humanResource,
	stratigicFinance
}

export default library
