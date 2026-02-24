export interface StatusHistoryItem {
  status: string
  timestamp: string
  notes?: string
}

export interface PolicyDetails {
  cusip: string
  'product-name': string
  'owner-ssn': string
  'owner-name': string
  'annuity-type': string
  'account-type': string
  'issue-state': string
  'custodial-indicator': string
}

export interface BrokerInfo {
  'broker-id': string
  'broker-name': string
  'crd-number': string
  npn?: string
}

export interface BrokerDetails {
  'receiving-broker': BrokerInfo
  'delivering-broker': BrokerInfo
}

export interface ValidationChecks {
  'licensing-check': string
  'appointment-check': string
  'suitability-check': string
  'policy-rules-check': string
}

export interface CarrierValidationDetails {
  'validation-result': string
  'validation-checks': ValidationChecks
  'validated-at': string
  'rejection-reason'?: string
}

export interface ValidationRequirements {
  'requires-licensing-check': boolean
  'requires-appointment-check': boolean
  'requires-suitability-check': boolean
  'state-specific-rules': boolean
}

export interface BdChangeRequest {
  pk: string
  sk: string
  'transaction-id': string
  'policy-id': string
  'carrier-id': string
  'receiving-broker-id': string
  'delivering-broker-id': string
  'request-timestamp': string
  'current-status': string
  'status-history': StatusHistoryItem[]
  'effective-date': string
  'policy-details': PolicyDetails
  'broker-details': BrokerDetails
  'validation-requirements': ValidationRequirements
  'carrier-validation-details'?: CarrierValidationDetails
}

export type TransactionStatus =
  | 'MANIFEST_REQUESTED'
  | 'MANIFEST_RECEIVED'
  | 'DUE_DILIGENCE_COMPLETE'
  | 'CARRIER_VALIDATION_PENDING'
  | 'CARRIER_APPROVED'
  | 'CARRIER_REJECTED'
  | 'TRANSFER_INITIATED'
  | 'TRANSFER_PROCESSING'
  | 'TRANSFER_CONFIRMED'
  | 'COMPLETE'

export type CarrierTable = 'carrier' | 'carrier-2'
