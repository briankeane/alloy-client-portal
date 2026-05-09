import { DATA } from '../data';
import { I } from '../Icons';

export default function PlaybookPage() {
  return (
    <div className="content" data-screen-label="05 Playbook">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 18,
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
            Quarterly playbook · Q1 2026
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
            Your two-year roadmap
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 6, marginBottom: 0 }}>
            Where you've been, what's shipping now, and what your Alloy team is queuing next.
            Updated every quarter.
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary">
            <I.Doc width={13} height={13} /> Download playbook PDF
          </button>
          <button className="btn btn-primary">
            <I.Calendar width={13} height={13} /> Q2 review · Mar 28
          </button>
        </div>
      </div>

      <div className="roadmap">
        {DATA.roadmap.map((q, i) => (
          <div key={i} className="roadmap-col" data-state={q.state}>
            <div className="qhead">
              <div className="q">{q.q}</div>
              <div className="qsub">
                {q.state === 'now'
                  ? '● Now'
                  : q.state === 'done'
                    ? '✓ Done'
                    : q.state === 'next'
                      ? 'Next'
                      : 'Future'}
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 800,
                  color: 'var(--alloy-purple)',
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                }}
              >
                {q.title}
              </div>
            </div>
            {q.items.map((it, j) => (
              <div key={j} className={`pchip ${it.lane}`}>
                <span className="ic">{it.kind}</span>
                {it.t}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="col-3" style={{ marginTop: 24 }}>
        <PhaseCard
          lane="attract"
          title="BoardReach"
          subtitle="Attract"
          desc="Your visibility engine — local SEO, paid, content, reputation."
          stat="412 leads"
          sub="last 12 months"
          pct={72}
        />
        <PhaseCard
          lane="close"
          title="BoardMatch"
          subtitle="Close"
          desc="The proposal & sales kit that turns boards into signed contracts."
          stat="9 signed"
          sub="of 24 proposals"
          pct={37}
        />
        <PhaseCard
          lane="keep"
          title="BoardRetain"
          subtitle="Keep"
          desc="The retention layer — onboarding, education, churn detection."
          stat="0 churn"
          sub="this quarter"
          pct={94}
        />
      </div>

      <div className="card card-pad-lg" style={{ marginTop: 24 }}>
        <div className="card-head">
          <span className="kicker">Total transparency</span>
          <h3>Your BoardSuite Accelerate plan</h3>
          <div className="grow" />
          <span className="tier-pill accelerate">
            <span className="star">★</span> Accelerate · $7K/mo
          </span>
        </div>
        <div className="col-3" style={{ gap: 16 }}>
          <PlanLimit
            label="Quarterly point budget"
            used={78}
            total={100}
            unit="pts"
            hint="22 pts free · room for a course or 5 blog posts"
          />
          <PlanLimit
            label="Locations covered"
            used={1}
            total={1}
            unit="locations"
            hint="Add another for $1.5K/mo"
            cta="Add location"
          />
          <PlanLimit
            label="Quality backlinks (Q1)"
            used={1}
            total={1}
            unit="links"
            hint="Need more? Cost-plus add-on available"
            cta="Order more"
          />
        </div>
        <div
          style={{
            marginTop: 18,
            padding: '14px 18px',
            background: 'var(--alloy-purple-tint)',
            border: '1px solid var(--alloy-light-gray)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: 'var(--alloy-purple)',
              color: 'var(--alloy-yellow)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <I.Sparkle width={16} height={16} />
          </div>
          <div
            style={{
              flex: 1,
              fontSize: 13,
              color: 'var(--alloy-purple)',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            <strong>Want to push faster?</strong> Ascend tier unlocks 2 markets, accelerated
            execution and competitive lost-deal analysis.
          </div>
          <button className="btn btn-dark btn-sm">See Ascend benefits →</button>
        </div>
      </div>
    </div>
  );
}

function PhaseCard({
  lane,
  title,
  subtitle,
  desc,
  stat,
  sub,
  pct,
}: {
  lane: string;
  title: string;
  subtitle: string;
  desc: string;
  stat: string;
  sub: string;
  pct: number;
}) {
  const colors: Record<string, string> = {
    attract: 'var(--alloy-pink)',
    close: 'var(--alloy-blue)',
    keep: 'var(--alloy-green)',
  };
  const c = colors[lane];
  return (
    <div className="card card-pad" style={{ borderLeft: `4px solid ${c}` }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '.12em',
          color: c,
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 800,
          color: 'var(--alloy-purple)',
          marginTop: 4,
        }}
      >
        {title}
      </div>
      <p style={{ fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.5, margin: '8px 0 14px' }}>
        {desc}
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 24,
              fontWeight: 800,
              color: 'var(--alloy-purple)',
              lineHeight: 1,
            }}
          >
            {stat}
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontWeight: 600, marginTop: 2 }}>
            {sub}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 800, color: c }}>
          {pct}%
        </div>
      </div>
      <div className="progress">
        <div className="bar" style={{ width: `${pct}%`, background: c }} />
      </div>
    </div>
  );
}

function PlanLimit({
  label,
  used,
  total,
  unit,
  hint,
  cta,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
  hint: string;
  cta?: string;
}) {
  const pct = (used / total) * 100;
  return (
    <div
      style={{ padding: '14px 16px', border: '1px solid var(--border-subtle)', borderRadius: 10 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div
          style={{
            fontSize: 11,
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            fontWeight: 700,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 800,
            color: 'var(--alloy-purple)',
          }}
        >
          {used}
          <span style={{ color: 'var(--fg-muted)', fontWeight: 500 }}>
            /{total} {unit}
          </span>
        </div>
      </div>
      <div className="progress" style={{ marginTop: 10 }}>
        <div className="bar yellow" style={{ width: `${pct}%` }} />
      </div>
      <div style={{ fontSize: 11.5, color: 'var(--fg-muted)', marginTop: 8, lineHeight: 1.4 }}>
        {hint}
      </div>
      {cta ? (
        <button className="btn btn-ghost btn-sm" style={{ marginTop: 8, padding: '4px 0' }}>
          {cta} →
        </button>
      ) : null}
    </div>
  );
}
