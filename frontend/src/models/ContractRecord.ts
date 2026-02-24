export enum ContractStatus {
	ProprietaryProduct = 'Proprietary Product',
	NotActive = 'Not Active',
	Unappointed = 'Unappointed',
	Inactive = 'Inactive',
	ActiveRestricted = 'Active - Restricted',
	Active = 'Active'
}

export enum PlanType {
	NonQualified = 'Non Qualified',
	RothIRA = 'Roth IRA',
	TraditionalIRA = 'Traditional IRA',
	SepIRA = 'Sep IRA',
	SimpleIRA = 'Simple IRA'
}

export enum AccountType {
	Individual = 'Individual Account',
	JointOwned = 'Joint Owned Account',
	Trust = 'Trust Account',
	Entity = 'Entity Account'
}

export enum OwnershipType {
	Individual = 'Individual',
	JointOwned = 'Joint Owned',
	TrustOwned = 'Trust Owned',
	EntityOwned = 'Entity Owned',
	Custodial = 'Custodial',
	JointOwnedAccount = 'Joint Owned Account',
	TrustAccount = 'Trust Account',
	EntityAccount = 'Entity Account'
}

export interface ContractRecord {
	id: string | number
	carrierName: string
	productName: string
	contractNumber: string
	cusipNumber: string
	ownership: OwnershipType | string
	planType?: PlanType
	accountType?: AccountType
	ownerName?: string
	trailing: boolean
	withdrawalProgram: boolean
	contractStatus: ContractStatus
	dtccResolved?: boolean
	selected?: boolean
}
