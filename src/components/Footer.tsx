import Link from 'next/link'

export function Footer() {
  return (
    <footer
      style={{
        width: '100%',
        background: 'var(--bg-alt)',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'center',
        padding: '56px 24px 32px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1320, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 280 }}>
            <img
              src="/logo/development-properties-primary.svg"
              alt="development. properties"
              style={{ height: 34, width: 'auto' }}
            />
            <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              The marketplace for land, developments and planning-ready sites across the UK.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 80, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                }}
              >
                Company
              </span>
              <Link href="/about" style={{ fontSize: 14, color: 'var(--text)' }}>
                About
              </Link>
              <Link href="/#services" style={{ fontSize: 14, color: 'var(--text)' }}>
                Services
              </Link>
              <Link href="/contact" style={{ fontSize: 14, color: 'var(--text)' }}>
                Contact
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                }}
              >
                For members
              </span>
              <Link href="/admin" style={{ fontSize: 14, color: 'var(--text)' }}>
                Sign in
              </Link>
              <Link href="/list-a-development" style={{ fontSize: 14, color: 'var(--text)' }}>
                List a development
              </Link>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Development Properties. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
