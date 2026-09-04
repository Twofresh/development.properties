import Link from 'next/link'

import type { Media, Property } from '@/payload-types'
import { formatPrice, planningStatusLabels, serviceCategoryLabels } from '@/lib/format'

const GRADIENTS = [
  'linear-gradient(135deg, oklch(0.62 0.05 55), oklch(0.42 0.05 50))',
  'linear-gradient(135deg, oklch(0.58 0.04 60), oklch(0.38 0.04 55))',
  'linear-gradient(135deg, oklch(0.65 0.05 70), oklch(0.45 0.05 60))',
  'linear-gradient(135deg, oklch(0.6 0.045 45), oklch(0.4 0.045 45))',
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
  const isFullConsent = property.planningStatus === 'full-permission'

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
            className={isFullConsent ? 'tag tag-consent' : 'tag'}
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              background: isFullConsent ? undefined : 'var(--surface)',
              fontSize: size === 'lg' ? 12 : 11,
            }}
          >
            {planningStatusLabels[property.planningStatus]}
          </span>
        )}
      </div>
      <div style={{ padding: size === 'sm' ? 16 : size === 'lg' ? 24 : 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <h3 style={{ fontSize: size === 'lg' ? 21 : size === 'sm' ? 16.5 : 18 }}>{property.title}</h3>
          {size === 'lg' && <span className="price" style={{ fontSize: 19 }}>{formatPrice(property)}</span>}
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
            <span className="price" style={{ fontSize: size === 'sm' ? 14.5 : 15 }}>
              {formatPrice(property)}
            </span>
            {size === 'md' && <span className="tag">{serviceCategoryLabels[property.serviceCategory]}</span>}
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
              <span className="data" style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                {property.numberOfUnits} units proposed
              </span>
            ) : null}
            {property.proposedSqFt ? (
              <span className="data" style={{ fontSize: 13.5, color: 'var(--text-muted)' }}>
                {property.proposedSqFt.toLocaleString()} sq ft
              </span>
            ) : null}
            <span className="tag" style={{ marginLeft: 'auto' }}>
              {serviceCategoryLabels[property.serviceCategory]}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
