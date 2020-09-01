export interface Service {
	name: string
	displayName: string
	plan: string
	price: string
	details: string[]
	expertIDs: string[]
}

export const accounting: Service = {
	name: 'accounting',
	displayName: 'Accounting',
	plan: 'online-accounting-service',
	price: '$100 per month',
	details: [
		'Dedicated expert team including your account manager, accountant, and a CPA or VP of Finance level advisor.',
		'Open and maintain your bank and credit card account(s), as well as bank transactions and reconciliation.',
		'Accrual or cash basis bookkeeping',
		'Income, balance sheet, and cash flow statements',
		'On-demand chat with your expert team',
		'One hour per month video session with your expert team'
	],
	expertIDs: [
		'Lbgz8QodrFNZDNMiOmRiVXZjZtZ2',
		'Q47HpkjiSmUoi0RLtzuVgSLpCtR2',
		'sN8IbYDXo3ZbyNWdyPtAhX8lEKz2'
	]
}

export const humanResource: Service = {
	name: 'humanResource',
	displayName: 'Human Resource',
	plan: 'online-human-resource-service',
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
	expertIDs: ['Z39gavNVVDY3pb2p5J8tz9I3Xva2', 'sN8IbYDXo3ZbyNWdyPtAhX8lEKz2']
}
export const strategicFinance: Service = {
	name: 'strategicFinance',
	displayName: 'Stratigic Finance',
	plan: 'online-stratigic-finance-service',
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
	expertIDs: [
		'sN8IbYDXo3ZbyNWdyPtAhX8lEKz2',
		'Lbgz8QodrFNZDNMiOmRiVXZjZtZ2',
		'Q47HpkjiSmUoi0RLtzuVgSLpCtR2'
	]
}

interface ServiceLibary {
	[serviceName: string]: Service
}

const library: ServiceLibary = {
	accounting,
	humanResource,
	strategicFinance
}

export const plans: ServiceLibary = {
	onlineaccountingservice: accounting,
	onlinehumanresourceservice: humanResource,
	onlinestrategicFinanceservice: strategicFinance
}

export default library
