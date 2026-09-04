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
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)' }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 11.5 12 4l9 7.5"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.5 10v9a1 1 0 0 0 1 1H9v-5.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V20h2.5a1 1 0 0 0 1-1v-9"
              stroke="var(--accent)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontFamily: "'Newsreader', serif", fontSize: 21, fontWeight: 600 }}>
            Development Properties
          </span>
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
