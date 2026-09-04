import Link from 'next/link'

export function Header() {
  return (
    <header
      style={{
        width: '100%',
        height: 84,
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1320,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/logo/development-properties-primary.svg"
            alt="development. properties"
            style={{ height: 42, width: 'auto' }}
          />
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
          <Link href="/about" style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--text)' }}>
            About
          </Link>
          <Link
            href="/developments"
            style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--text)' }}
          >
            Developments
          </Link>
          <Link
            href="/list-a-development"
            style={{ fontSize: 14.5, fontWeight: 500, color: 'var(--text)' }}
          >
            List a development
          </Link>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <button className="btn btn-primary" type="button">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  )
}
