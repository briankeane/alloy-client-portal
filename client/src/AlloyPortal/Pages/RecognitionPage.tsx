import { DATA } from '../data';
import { I } from '../Icons';

interface Badge {
  id: string;
  name: string;
  desc: string;
  state: string;
  earned?: string;
  color: string;
  category: string;
  pct?: number;
}

export default function RecognitionPage() {
  const earned = DATA.badges.filter((b) => b.state === 'earned');
  const inprog = DATA.badges.filter((b) => b.state === 'progress');
  const locked = DATA.badges.filter((b) => b.state === 'locked');

  return (
    <div className="content" data-screen-label="07 Recognition">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.12em',
              color: 'var(--alloy-pink)',
            }}
          >
            Recognition &amp; rewards
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--alloy-purple)',
              margin: '4px 0 0',
              letterSpacing: '-0.01em',
            }}
          >
            Wins, made tangible
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 6, marginBottom: 0 }}>
            Real milestones — not vanity points. Every badge maps to a number that matters: signed
            boards, pipeline crossed, reputation built.
          </p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span className="tier-pill accelerate" style={{ fontSize: 12, padding: '7px 14px' }}>
            <span className="star">★</span> BoardSuite Accelerate
          </span>
        </div>
      </div>

      <div
        className="card card-pad-lg"
        style={{
          marginBottom: 24,
          background: 'linear-gradient(120deg, var(--alloy-purple) 0%, #1f0e30 100%)',
          color: '#fff',
          border: 'none',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -100,
            top: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,216,128,0.2) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr 1fr 1fr',
            gap: 32,
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <BadgeMedalSmall color="#f5d880" state="earned" />
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 800,
                color: 'var(--alloy-yellow)',
                marginTop: 10,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
              }}
            >
              Authority
              <br />
              tier
            </div>
          </div>
          <SummaryStat
            n={String(earned.length)}
            l="Badges earned"
            sub={`of ${DATA.badges.length} total`}
          />
          <SummaryStat n="32 days" l="Login streak" sub="🔥 best yet" />
          <SummaryStat n="$612K" l="Lifetime impact" sub="Alloy-attributed" />
        </div>
      </div>

      <div className="section-title">
        <span className="pip" />
        Earned ({earned.length}) <a style={{ cursor: 'pointer' }}>Share to LinkedIn →</a>
      </div>
      <div className="badge-grid">
        {earned.map((b) => (
          <BigBadge key={b.id} b={b} />
        ))}
      </div>

      <div className="section-title">
        <span className="pip" style={{ background: 'var(--alloy-yellow)' }} />
        In progress ({inprog.length})
      </div>
      <div className="badge-grid">
        {inprog.map((b) => (
          <BigBadge key={b.id} b={b} />
        ))}
      </div>

      <div className="section-title">
        <span className="pip" style={{ background: 'var(--alloy-light-gray)' }} />
        Up next ({locked.length})
      </div>
      <div className="badge-grid">
        {locked.map((b) => (
          <BigBadge key={b.id} b={b} />
        ))}
      </div>

      <div className="section-title" style={{ marginTop: 36 }}>
        <span className="pip" style={{ background: 'var(--alloy-pink)' }} />
        Real rewards <a style={{ cursor: 'pointer' }}>Browse all →</a>
      </div>
      <div className="col-3">
        {[
          {
            label: 'Authority Tier perk',
            title: 'Annual swag drop',
            desc: 'RISE-branded gear, an Alloy field guide, and a hand-written note from your team.',
            cta: 'Claim',
            icon: <I.Heart width={18} height={18} />,
            tone: 'pink',
            earned: false,
          },
          {
            label: 'Five Wins reward',
            title: '$500 ad credit',
            desc: "Auto-applied to next quarter's PPC spend when you cross 5 boards.",
            cta: 'Earned',
            icon: <I.Bolt width={18} height={18} />,
            tone: 'yellow',
            earned: true,
          },
          {
            label: 'Ten Wins reward',
            title: 'Day with the partners',
            desc: 'A full strategy day in Austin with Skyler, Justin & Cameron. On us.',
            cta: '1 win away',
            icon: <I.Sparkle width={18} height={18} />,
            tone: 'purple',
            earned: false,
          },
        ].map((r, i) => (
          <div
            key={i}
            className="card card-pad"
            style={{ position: 'relative', overflow: 'hidden' }}
          >
            {r.earned ? (
              <div style={{ position: 'absolute', top: 14, right: 14 }}>
                <span className="tag tag-status-live">
                  <span className="dot" />
                  Earned
                </span>
              </div>
            ) : null}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                background:
                  r.tone === 'pink'
                    ? 'var(--alloy-pink-tint)'
                    : r.tone === 'yellow'
                      ? 'var(--alloy-yellow-tint)'
                      : 'var(--alloy-purple-tint)',
                color:
                  r.tone === 'pink'
                    ? 'var(--alloy-pink)'
                    : r.tone === 'yellow'
                      ? '#7a5a14'
                      : 'var(--alloy-purple)',
                display: 'grid',
                placeItems: 'center',
                marginBottom: 12,
              }}
            >
              {r.icon}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.1em',
                color: 'var(--fg-muted)',
              }}
            >
              {r.label}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 800,
                color: 'var(--alloy-purple)',
                marginTop: 4,
              }}
            >
              {r.title}
            </div>
            <p
              style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: '8px 0 14px' }}
            >
              {r.desc}
            </p>
            <button className="btn btn-secondary btn-sm" disabled={r.earned}>
              {r.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryStat({ n, l, sub }: { n: string; l: string; sub: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--alloy-yellow)',
          marginTop: 8,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.1em',
        }}
      >
        {l}
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function BigBadge({ b }: { b: Badge }) {
  const colors: Record<string, string> = {
    pink: '#d9356e',
    yellow: '#f5d880',
    blue: '#a1c8e7',
    green: '#aed7d0',
    purple: '#604a74',
  };
  return (
    <div className={`badge-card ${b.state === 'locked' ? 'locked' : ''}`}>
      {b.state === 'earned' ? (
        <span
          className="tag tag-status-live"
          style={{ position: 'absolute', top: 10, right: 10, fontSize: 9 }}
        >
          <span className="dot" />
          Earned
        </span>
      ) : null}
      <div className="badge-medal">
        <BigBadgeMedal color={colors[b.color]} state={b.state} />
      </div>
      <div className="name">{b.name}</div>
      <div className="desc">{b.desc}</div>
      {b.state === 'earned' ? <div className="earned">{b.earned}</div> : null}
      {b.state === 'progress' ? (
        <div style={{ marginTop: 10 }}>
          <div className="progress">
            <div className="bar" style={{ width: `${b.pct}%`, background: colors[b.color] }} />
          </div>
          <div
            style={{
              fontSize: 10,
              color: 'var(--fg-muted)',
              fontWeight: 700,
              marginTop: 4,
              textTransform: 'uppercase',
              letterSpacing: '.08em',
            }}
          >
            {b.pct}% there
          </div>
        </div>
      ) : null}
      {b.state === 'locked' ? (
        <div className="earned" style={{ color: 'var(--fg-muted)' }}>
          Locked
        </div>
      ) : null}
    </div>
  );
}

function BadgeMedalSmall({
  color = '#d9356e',
  state = 'earned',
}: {
  color?: string;
  state?: string;
}) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" style={{ margin: '0 auto', display: 'block' }}>
      <defs>
        <linearGradient id={`mg-rec-${color}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#381c4f" />
        </linearGradient>
      </defs>
      <polygon
        points="22,4 28,8 35,7 37,14 42,18 39,25 40,32 33,34 30,40 22,38 14,40 11,34 4,32 5,25 2,18 7,14 9,7 16,8"
        fill={state === 'locked' ? '#e8e4ef' : `url(#mg-rec-${color})`}
        stroke={state === 'locked' ? '#c9c1d6' : '#fff'}
        strokeWidth="1.2"
      />
      <circle cx="22" cy="22" r="9" fill="#fff" opacity="0.15" />
      <text
        x="22"
        y="26"
        textAnchor="middle"
        fontSize="11"
        fontWeight="900"
        fill="#fff"
        fontFamily="var(--font-display)"
      >
        ★
      </text>
    </svg>
  );
}

function BigBadgeMedal({
  color = '#d9356e',
  state = 'earned',
}: {
  color?: string;
  state?: string;
}) {
  const safeColor = color.replace('#', '');
  return (
    <svg viewBox="0 0 78 78" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`bg-${safeColor}-${state}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#381c4f" />
        </linearGradient>
        <radialGradient id={`bg-shine-${safeColor}`} cx="0.3" cy="0.3" r="0.6">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <polygon
        points="39,5 47,11 56,9 60,18 68,22 64,32 67,42 57,46 53,55 39,52 25,55 21,46 11,42 14,32 10,22 18,18 22,9 31,11"
        fill={state === 'locked' ? '#e8e4ef' : `url(#bg-${safeColor}-${state})`}
        stroke={state === 'locked' ? '#c9c1d6' : '#fff'}
        strokeWidth="1.5"
      />
      <polygon
        points="39,5 47,11 56,9 60,18 68,22 64,32 67,42 57,46 53,55 39,52 25,55 21,46 11,42 14,32 10,22 18,18 22,9 31,11"
        fill={`url(#bg-shine-${safeColor})`}
      />
      <circle cx="39" cy="32" r="13" fill="#fff" opacity="0.18" />
      {state === 'locked' ? (
        <g>
          <rect x="33" y="29" width="13" height="11" rx="2" fill="#fff" />
          <path d="M35 29v-4a4.5 4.5 0 0 1 9 0v4" fill="none" stroke="#fff" strokeWidth="2" />
        </g>
      ) : (
        <text
          x="39"
          y="38"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
          fill="#fff"
          fontFamily="var(--font-display)"
        >
          ★
        </text>
      )}
      {state === 'earned' ? (
        <g>
          <path
            d="M27 56 L31 70 L35 65 L39 70 L43 65 L47 70 L51 56"
            fill="#fff"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
      ) : null}
    </svg>
  );
}
