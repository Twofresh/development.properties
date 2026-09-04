import Link from 'next/link'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PropertyCard } from '@/components/PropertyCard'
import { getPayloadClient } from '@/lib/getPayloadClient'

const SERVICES = [
  {
    title: 'Land & buildings with planning',
    description:
      'List sites and buildings that already have planning permission secured, ready for the next developer to take forward.',
    iconBg: 'var(--accent-bg)',
    iconColor: 'var(--accent-dark)',
  },
  {
    title: 'Portfolios & investments',
    description:
      'Sell a block of flats or a wider property portfolio to serious investors and developers, in one clean listing.',
    iconBg: 'var(--accent-2-bg)',
    iconColor: 'var(--accent-2)',
  },
  {
    title: 'Planning & land promotion',
    description:
      'Get support taking raw land through the planning process, to unlock and prove its development value.',
    iconBg: 'var(--accent-bg)',
    iconColor: 'var(--accent-dark)',
  },
]

export default async function HomePage() {
  const payload = await getPayloadClient()

  const { docs: featured } = await payload.find({
    collection: 'properties',
    where: { featured: { equals: true } },
    limit: 5,
    sort: '-createdAt',
  })

  const listings =
    featured.length > 0
      ? featured
      : (
          await payload.find({
            collection: 'properties',
            limit: 5,
            sort: '-createdAt',
          })
        ).docs

  return (
    <>
      <Header />

      {/* HERO */}
      <section style={{ width: '100%', position: 'relative', height: 620, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, oklch(0.58 0.1 55) 0%, oklch(0.4 0.08 40) 55%, oklch(0.28 0.05 35) 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, oklch(0.2 0.03 40) 0%, transparent 45%)',
            }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            maxWidth: 1320,
            margin: '0 auto',
            height: '100%',
            padding: '0 24px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 22,
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: 54,
              lineHeight: 1.08,
              maxWidth: 760,
              fontWeight: 500,
            }}
          >
            Find land, developments &amp; planning-ready sites
          </h1>
          <p style={{ color: 'oklch(0.95 0.01 70)', fontSize: 17.5, maxWidth: 560, lineHeight: 1.5 }}>
            The marketplace connecting agents and developers with genuine opportunities — land,
            buildings and portfolios, ready to move forward.
          </p>
        </div>
        <form
          action="/developments"
          style={{
            position: 'absolute',
            bottom: -34,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(1160px, calc(100% - 48px))',
            background: 'var(--surface)',
            borderRadius: 14,
            boxShadow: '0 18px 40px -12px oklch(0.3 0.05 40 / 0.35)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            padding: 10,
            gap: 8,
          }}
        >
          <div
            style={{
              flex: '2 1 220px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '8px 18px',
              borderRight: '1px solid var(--border)',
            }}
          >
            <label
              htmlFor="location"
              style={{
                fontSize: 11.5,
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Town, city or postcode"
              style={{ border: 'none', outline: 'none', fontSize: 15, background: 'transparent' }}
            />
          </div>
          <div
            style={{
              flex: '1.4 1 180px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '8px 18px',
              borderRight: '1px solid var(--border)',
            }}
          >
            <label
              htmlFor="serviceCategory"
              style={{
                fontSize: 11.5,
                color: 'var(--text-muted)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Listing type
            </label>
            <select
              id="serviceCategory"
              name="serviceCategory"
              defaultValue=""
              style={{ border: 'none', outline: 'none', fontSize: 15, background: 'transparent' }}
            >
              <option value="">Any type</option>
              <option value="land-with-planning">Land with planning</option>
              <option value="portfolio-investment">Portfolios &amp; investments</option>
              <option value="land-promotion">Land promotion</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: '0 30px', flex: '0 0 auto' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            Search
          </button>
        </form>
      </section>

      {/* BLURB */}
      <section
        style={{
          width: '100%',
          background: 'var(--bg-alt)',
          display: 'flex',
          justifyContent: 'center',
          padding: '100px 24px 68px',
        }}
      >
        <div style={{ width: '100%', maxWidth: 1320, display: 'flex', flexWrap: 'wrap', gap: 40 }}>
          <div style={{ flex: '1 1 420px', display: 'flex', flexDirection: 'column', gap: 22 }}>
            <span className="tag" style={{ background: 'var(--accent-bg)', color: 'var(--accent-dark)', alignSelf: 'flex-start' }}>
              What we do
            </span>
            <h2 style={{ fontSize: 34, lineHeight: 1.2, maxWidth: 520 }}>
              Built for developers, by people who understand land
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--text-muted)', maxWidth: 540 }}>
              We connect agents and developers with land, buildings and portfolios that already
              have planning permission secured — so you can move from opportunity to delivery
              faster. List your first development free while we&apos;re in beta.
            </p>
            <Link href="/developments" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8, color: 'white' }}>
              Browse Land &amp; Developments
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        style={{ width: '100%', background: 'var(--bg)', display: 'flex', justifyContent: 'center', padding: '76px 24px' }}
      >
        <div style={{ width: '100%', maxWidth: 1320, display: 'flex', flexDirection: 'column', gap: 34 }}>
          <h2 style={{ fontSize: 28 }}>Our services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 22 }}>
            {SERVICES.map((service) => (
              <div
                key={service.title}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 10,
                    background: service.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: service.iconColor,
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {service.title.charAt(0)}
                </span>
                <h3 style={{ fontSize: 19 }}>{service.title}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS */}
      <section
        style={{ width: '100%', background: 'var(--bg-alt)', display: 'flex', justifyContent: 'center', padding: '76px 24px' }}
      >
        <div style={{ width: '100%', maxWidth: 1320, display: 'flex', flexDirection: 'column', gap: 34 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <h2 style={{ fontSize: 28 }}>Featured developments</h2>
            <Link href="/developments" style={{ fontSize: 14.5, fontWeight: 600 }}>
              View all
            </Link>
          </div>
          {listings.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>
              No developments listed yet — check back soon, or{' '}
              <Link href="/admin/collections/properties/create">add the first one</Link>.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 22 }}>
              {listings.map((property, index) => (
                <div key={property.id} style={index === 0 ? { gridColumn: 'span 2' } : undefined}>
                  <PropertyCard property={property} size={index === 0 ? 'lg' : 'md'} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA SPLIT */}
      <section style={{ width: '100%', background: 'var(--bg)', display: 'flex', justifyContent: 'center', padding: '84px 24px' }}>
        <div style={{ width: '100%', maxWidth: 1320, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
          <div
            style={{
              background: 'linear-gradient(135deg, oklch(0.6 0.1 45), oklch(0.46 0.09 42))',
              borderRadius: 16,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3 style={{ color: 'white', fontSize: 24 }}>Have land or a development to sell?</h3>
            <p style={{ color: 'oklch(0.95 0.02 45)', fontSize: 14.5, lineHeight: 1.6, maxWidth: 400 }}>
              List your first development for free — no listing fees while we&apos;re in beta.
            </p>
            <Link
              href="/list-a-development"
              className="btn"
              style={{ background: 'white', color: 'var(--accent-dark)', alignSelf: 'flex-start', marginTop: 8 }}
            >
              List a Development
            </Link>
          </div>
          <div
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              padding: 40,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <h3 style={{ fontSize: 24 }}>Get new opportunities first</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.6, maxWidth: 400 }}>
              Join our newsletter for new land and development listings, straight to your inbox.
            </p>
            <form style={{ display: 'flex', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="you@company.com"
                aria-label="Email address"
                style={{
                  flex: '1 1 200px',
                  border: '1.5px solid var(--border)',
                  borderRadius: 8,
                  padding: '12px 16px',
                  fontSize: 14.5,
                }}
              />
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
