import { getPayload } from 'payload'

import config from '../src/payload.config'

async function seed() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const agent = await payload.create({
    collection: 'agents',
    data: {
      name: 'James Whitfield',
      role: 'Land & New Homes',
      email: 'james@developmentproperties.co.uk',
      phone: '01483 000 000',
    },
  })

  const listings = [
    {
      title: 'Meadow Rise, Guildford',
      slug: 'meadow-rise-guildford',
      serviceCategory: 'land-with-planning' as const,
      listingSource: 'developer-direct' as const,
      planningStatus: 'outline-permission' as const,
      price: 1200000,
      priceQualifier: 'guide' as const,
      addressLine1: 'Meadow Rise',
      town: 'Guildford',
      postcode: 'GU1 1AA',
      numberOfUnits: 12,
      proposedSqFt: 18500,
      numberOfParkingSpaces: 14,
      numberOfGardens: 6,
      tenure: 'freehold' as const,
      financialContributions: 'S106 contributions apply — see documents',
      vatApplicable: true,
      access: 'Direct access from the B2035',
      furtherInformation: 'Full planning documents available on request',
      featured: true,
      agent: agent.id,
    },
    {
      title: 'Harbour Court, Bristol',
      slug: 'harbour-court-bristol',
      serviceCategory: 'portfolio-investment' as const,
      listingSource: 'estate-agent' as const,
      price: 2450000,
      priceQualifier: 'fixed' as const,
      addressLine1: 'Harbour Court',
      town: 'Bristol',
      postcode: 'BS1 5TT',
      tenure: 'freehold' as const,
      featured: true,
      agent: agent.id,
    },
    {
      title: 'Orchard Fields, Taunton',
      slug: 'orchard-fields-taunton',
      serviceCategory: 'land-with-planning' as const,
      listingSource: 'developer-direct' as const,
      planningStatus: 'full-permission' as const,
      price: 680000,
      priceQualifier: 'guide' as const,
      addressLine1: 'Orchard Fields',
      town: 'Taunton',
      postcode: 'TA1 2BB',
      numberOfUnits: 6,
      featured: true,
      agent: agent.id,
    },
    {
      title: 'Nine Acres, Didcot',
      slug: 'nine-acres-didcot',
      serviceCategory: 'land-promotion' as const,
      listingSource: 'developer-direct' as const,
      planningStatus: 'pre-application' as const,
      priceQualifier: 'poa' as const,
      addressLine1: 'Nine Acres',
      town: 'Didcot',
      postcode: 'OX11 7CC',
      agent: agent.id,
    },
    {
      title: 'The Sidings, Derby',
      slug: 'the-sidings-derby',
      serviceCategory: 'portfolio-investment' as const,
      listingSource: 'estate-agent' as const,
      price: 1050000,
      priceQualifier: 'guide' as const,
      addressLine1: 'The Sidings',
      town: 'Derby',
      postcode: 'DE1 3DD',
      numberOfUnits: 8,
      agent: agent.id,
    },
  ]

  for (const listing of listings) {
    await payload.create({ collection: 'properties', data: listing })
    console.log(`created: ${listing.title}`)
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
