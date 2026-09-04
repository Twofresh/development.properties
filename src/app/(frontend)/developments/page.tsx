import type { Where } from 'payload'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PropertyCard } from '@/components/PropertyCard'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { serviceCategoryLabels } from '@/lib/format'

export default async function DevelopmentsPage({
  searchParams,
}: {
  searchParams: Promise<{ location?: string; serviceCategory?: string }>
}) {
  const { location, serviceCategory } = await searchParams
  const payload = await getPayloadClient()

  const where: Where = { and: [] }
  if (location) {
    ;(where.and as Where[]).push({
      or: [
        { town: { contains: location } },
        { postcode: { contains: location } },
        { addressLine1: { contains: location } },
      ],
    })
  }
  if (serviceCategory) {
    ;(where.and as Where[]).push({ serviceCategory: { equals: serviceCategory } })
  }

  const { docs: listings } = await payload.find({
    collection: 'properties',
    where: (where.and as Where[]).length > 0 ? where : undefined,
    limit: 50,
    sort: '-createdAt',
  })

  return (
    <>
      <Header />
      <section style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '56px 24px 80px' }}>
        <div style={{ width: '100%', maxWidth: 1320, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <h1 style={{ fontSize: 32 }}>Developments</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
              {listings.length} listing{listings.length === 1 ? '' : 's'}
              {location ? ` in "${location}"` : ''}
              {serviceCategory
                ? ` · ${serviceCategoryLabels[serviceCategory as keyof typeof serviceCategoryLabels]}`
                : ''}
            </p>
          </div>

          {listings.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>
              No developments match your search. Try a different location or listing type.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
              {listings.map((property) => (
                <PropertyCard key={property.id} property={property} size="md" />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}
