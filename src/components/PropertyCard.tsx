import Link from 'next/link'

import type { Media, Property } from '@/payload-types'
import { formatPrice, planningStatusLabels, serviceCategoryLabels } from '@/lib/format'

const GRADIENTS = [
  'linear-gradient(135deg, oklch(0.72 0.09 55), oklch(0.55 0.09 38))',
  'linear-gradient(135deg, oklch(0.68 0.07 150), oklch(0.5 0.07 150))',
  'linear-gradient(135deg, oklch(0.75 0.06 70), oklch(0.58 0.08 50))',
  'linear-gradient(135deg, oklch(0.7 0.08 40), oklch(0.52 0.08 35))',
]

function imageUrl(property: Property): string | undefined {
  const first = property.images?.[0]?.image
  if (first && typeof first === 'object') {
    return (first as Media).url ?? undefined
  }
  return undefined
}

export function PropertyCard({
  property,
  size = 'md',
}: {
  property: Property
  size?: 'lg' | 'md' | 'sm'
}) {
  const image = imageUrl(property)
  const gradient = GRADIENTS[property.id % GRADIENTS.length]
  const imageHeight = size === 'lg' ? 280 : size === 'md' ? 200 : 120

  return (
    <Link
      href={`/developments/${property.slug}`}
      className="card-fold"
      style={{ display: 'flex', flexDirection: 'column', color: 'var(--text)' }}
    >
      <div
        style={{
          height: imageHeight,
          position: 'relative',
          background: image ? `url(${image}) center / cover no-repeat` : gradient,
        }}
      >
        {property.planningStatus && size !== 'sm' && (
          <span
            className="tag"
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: 'var(--accent-2-bg)',
              color: 'var(--accent-2)',
              fontSize: size === 'lg' ? 12.5 : 11.5,
            }}
          >
            {planningStatusLabels[property.planningStatus]}
          </span>
        )}
      </div>
      <div style={{ padding: size === 'sm' ? 16 : size === 'lg' ? 24 : 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{ fontSize: size === 'lg' ? 21 : size === 'sm' ? 16.5 : 18 }}>{property.title}</h3>
          {size === 'lg' && (
            <span style={{ fontSize: 19, fontWeight: 600, fontFamily: "'Newsreader', serif" }}>
              {formatPrice(property)}
            </span>
          )}
        </div>
        <p style={{ fontSize: size === 'sm' ? 13.5 : 14, color: 'var(--text-muted)' }}>
          {property.town}
        </p>
        {size !== 'lg' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginTop: 4,
            }}
          >
            <span style={{ fontSize: size === 'sm' ? 14.5 : 15, fontWeight: 600, fontFamily: "'Newsreader', serif" }}>
              {formatPrice(property)}
            </span>
            {size === 'md' && (
              <span className="tag" style={{ background: 'var(--accent-2-bg)', color: 'var(--accent-2)' }}>
                {serviceCategoryLabels[property.serviceCategory]}
              </span>
            )}
          </div>
        )}
        {size === 'lg' && (
          <div
            style={{
              display: 'flex',
              gap: 18,
              marginTop: 6,
              paddingTop: 14,
              borderTop: '1px solid var(--border)',
              alignItems: 'center',
            }}
          >
            {property.numberOfUnits ? (
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                {property.numberOfUnits} units proposed
              </span>
            ) : null}
            {property.proposedSqFt ? (
              <span style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                {property.proposedSqFt.toLocaleString()} sq ft
              </span>
            ) : null}
            <span
              className="tag"
              style={{ background: 'var(--accent-bg)', color: 'var(--accent-dark)', marginLeft: 'auto' }}
            >
              {serviceCategoryLabels[property.serviceCategory]}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
