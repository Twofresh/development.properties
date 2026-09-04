import type { Property } from '@/payload-types'

export const serviceCategoryLabels: Record<Property['serviceCategory'], string> = {
  'land-with-planning': 'Land with planning',
  'portfolio-investment': 'Investment',
  'land-promotion': 'Land promotion',
}

export const planningStatusLabels: Record<
  NonNullable<Property['planningStatus']>,
  string
> = {
  'no-planning': 'No planning',
  'pre-application': 'Pre-application',
  'outline-permission': 'Outline permission granted',
  'full-permission': 'Full permission granted',
}

export function formatPrice(property: Pick<Property, 'price' | 'priceQualifier'>): string {
  if (property.priceQualifier === 'poa' || !property.price) {
    return 'POA'
  }

  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(property.price)

  if (property.priceQualifier === 'offers-over') return `Offers over ${formatted}`
  if (property.priceQualifier === 'guide') return `Guide price ${formatted}`
  return formatted
}
