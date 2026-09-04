import type React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PropertyCard } from '@/components/PropertyCard'
import { getPayloadClient } from '@/lib/getPayloadClient'
import { formatPrice, planningStatusLabels, serviceCategoryLabels } from '@/lib/format'
import type { Media } from '@/payload-types'

function kv(label: string, value: React.ReactNode) {
  if (!value) return null
  return (
    <div
      style={{
        display: 'flex',
        padding: '14px 0',
        borderBottom: '1px solid var(--border)',
        gap: 24,
      }}
    >
      <span style={{ width: 220, flexShrink: 0, fontSize: 14, color: 'var(--text-muted)' }}>
        {label}
      </span>
      <span style={{ fontSize: 14.5, fontWeight: 500, flex: 1 }}>{value}</span>
    </div>
  )
}

export default async function DevelopmentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'properties',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const property = docs[0]
  if (!property) notFound()

  const { docs: related } = await payload.find({
    collection: 'properties',
    where: { slug: { not_equals: slug } },
    limit: 3,
    sort: '-createdAt',
  })

  const agent = property.agent && typeof property.agent === 'object' ? property.agent : null
  const heroImage = property.images?.[0]?.image
  const heroUrl = heroImage && typeof heroImage === 'object' ? (heroImage as Media).url : undefined
  const galleryImages = (property.images ?? []).slice(1, 5)
  const documents = property.documents ?? []

  return (
    <>
      <Header />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 1240,
            padding: '40px 24px 80px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ flex: '2 1 560px', display: 'flex', flexDirection: 'column', gap: 36, minWidth: 0 }}>
            {/* Gallery */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  height: 420,
                  borderRadius: 14,
                  overflow: 'hidden',
                  background: heroUrl
                    ? `url(${heroUrl}) center / cover no-repeat`
                    : 'linear-gradient(135deg, oklch(0.72 0.09 55), oklch(0.5 0.09 38))',
                }}
              />
              {galleryImages.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 10 }}>
                  {galleryImages.map((img, i) => {
                    const media = typeof img.image === 'object' ? (img.image as Media) : null
                    return (
                      <div
                        key={i}
                        style={{
                          height: 88,
                          borderRadius: 10,
                          background: media?.url
                            ? `url(${media.url}) center / cover no-repeat`
                            : 'linear-gradient(135deg, oklch(0.68 0.07 150), oklch(0.5 0.07 150))',
                        }}
                      />
                    )
                  })}
                </div>
              )}
            </div>

            {/* Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                paddingBottom: 28,
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span className="tag" style={{ background: 'var(--accent-bg)', color: 'var(--accent-dark)' }}>
                  {serviceCategoryLabels[property.serviceCategory]}
                </span>
                {property.planningStatus && (
                  <span className="tag" style={{ background: 'var(--accent-2-bg)', color: 'var(--accent-2)' }}>
                    {planningStatusLabels[property.planningStatus]}
                  </span>
                )}
              </div>
              <h1 style={{ fontSize: 32 }}>{property.title}</h1>
              <p style={{ fontSize: 14.5, color: 'var(--text-muted)' }}>
                {[property.addressLine1, property.town, property.postcode].filter(Boolean).join(', ')}
              </p>
            </div>

            {/* Description */}
            {property.description && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <h2 style={{ fontSize: 21 }}>Description</h2>
                <div style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  <RichText data={property.description} />
                </div>
              </div>
            )}

            {/* Key info */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: 21, marginBottom: 12 }}>Key information</h2>
              {kv('Tenure', property.tenure === 'freehold' ? 'Freehold' : property.tenure === 'leasehold' ? 'Leasehold' : null)}
              {kv('Financial contributions', property.financialContributions)}
              {kv('VAT', property.vatApplicable ? 'Applicable' : 'Not applicable')}
              {kv('Access', property.access)}
              {kv('Further information', property.furtherInformation)}
              <div style={{ display: 'flex', padding: '14px 0', gap: 24, alignItems: 'flex-start' }}>
                <span style={{ width: 220, flexShrink: 0, fontSize: 14, color: 'var(--text-muted)' }}>
                  Available documents
                </span>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {documents.length > 0 ? (
                    documents.map((doc, i) => (
                      <span key={i} style={{ fontSize: 14.5, fontWeight: 500 }}>
                        {doc.label}
                      </span>
                    ))
                  ) : (
                    <>
                      <p style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                        Sign in to view planning and title documents for this listing.
                      </p>
                      <Link
                        href="/admin"
                        className="btn"
                        style={{
                          background: 'var(--text)',
                          color: 'white',
                          width: 'auto',
                          alignSelf: 'flex-start',
                          padding: '10px 20px',
                          fontSize: 13.5,
                        }}
                      >
                        Sign up to view documents
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 8 }}>
                <h2 style={{ fontSize: 21 }}>Related developments</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 18 }}>
                  {related.map((r) => (
                    <PropertyCard key={r.id} property={r} size="sm" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{ flex: '1 1 320px', maxWidth: 360, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: 26,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span
                  className="tag"
                  style={{
                    background: property.listingSource === 'developer-direct' ? 'var(--accent)' : 'var(--text)',
                    color: 'white',
                  }}
                >
                  {property.listingSource === 'developer-direct' ? 'Developer direct' : 'Estate agent'}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ref. DP-{property.id}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span
                  style={{
                    fontSize: 12.5,
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Guide price
                </span>
                <span style={{ fontFamily: "'Newsreader', serif", fontSize: 32 }}>
                  {formatPrice(property)}
                </span>
              </div>
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                Enquire about this site
              </Link>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 10, paddingTop: 4 }}>
                {property.numberOfUnits ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 14, background: 'var(--bg-alt)', borderRadius: 10 }}>
                    <span style={{ fontFamily: "'Newsreader', serif", fontSize: 21 }}>{property.numberOfUnits}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Units proposed</span>
                  </div>
                ) : null}
                {property.proposedSqFt ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 14, background: 'var(--bg-alt)', borderRadius: 10 }}>
                    <span style={{ fontFamily: "'Newsreader', serif", fontSize: 21 }}>
                      {property.proposedSqFt.toLocaleString()}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Proposed sq ft</span>
                  </div>
                ) : null}
                {property.numberOfParkingSpaces ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 14, background: 'var(--bg-alt)', borderRadius: 10 }}>
                    <span style={{ fontFamily: "'Newsreader', serif", fontSize: 21 }}>
                      {property.numberOfParkingSpaces}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Parking spaces</span>
                  </div>
                ) : null}
                {property.numberOfGardens ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 14, background: 'var(--bg-alt)', borderRadius: 10 }}>
                    <span style={{ fontFamily: "'Newsreader', serif", fontSize: 21 }}>
                      {property.numberOfGardens}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Gardens</span>
                  </div>
                ) : null}
              </div>
            </div>

            {agent && (
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 22,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '100%',
                    background: 'linear-gradient(135deg, oklch(0.7 0.06 55), oklch(0.55 0.07 40))',
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 600 }}>{agent.name}</span>
                  {agent.role && <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{agent.role}</span>}
                  {agent.phone && (
                    <a href={`tel:${agent.phone}`} style={{ fontSize: 13, marginTop: 4 }}>
                      {agent.phone}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
