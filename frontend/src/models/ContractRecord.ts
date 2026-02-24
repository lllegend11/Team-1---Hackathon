export enum ContractStatus {
	ProprietaryProduct = 'Proprietary Product',
	NotActive = 'Not Active',
	Unappointed = 'Unappointed',
	Inactive = 'Inactive',
	ActiveRestricted = 'Active - Restricted',
	Active = 'Active'
}

export interface ContractRecord {
	id: string | number
	carrierName: string
	productName: string
	contractNumber: string
	cusipNumber: string
	ownership: string
	trailing: boolean
	withdrawalProgram: boolean
	contractStatus: ContractStatus
}
