import { DATA } from '../data';
import { I } from '../Icons';
import { useAlloyNav } from '../useAlloyNav';
import { TicketRow } from './_shared';

export default function DashboardPage() {
  const onNav = useAlloyNav();
  const tierClass = DATA.account.tier.toLowerCase();
  return (
    <div className="content" data-screen-label="01 Dashboard">
      <CelebrateBanner />

      <div className="hero-band">
        <div className="greet">Tuesday, March 17 · {DATA.account.company}</div>
        <h2>
          Welcome back, {DATA.user.name.split(' ')[0]}. You signed{' '}
          <span style={{ color: 'var(--alloy-yellow)' }}>3 new boards</span> this quarter — and the
          engine just keeps getting warmer.
        </h2>
        <p className="lead">
          $612K of contract value attributed to Alloy in the last 12 months on $84K invested. That's
          7.3× — and Q1 isn't done yet.
        </p>
        <div className="actions">
          <button className="btn btn-primary" onClick={() => onNav('roi')}>
            <I.Chart width={14} height={14} /> See the ROI breakdown
          </button>
          <button className="btn btn-secondary" onClick={() => onNav('playbook')}>
            View this quarter's playbook
          </button>
          <span
            className={`tier-pill ${tierClass}`}
            style={{ marginLeft: 'auto', alignSelf: 'center' }}
          >
            <span className="star">★</span> BoardSuite {DATA.account.tier} · {DATA.account.market}
          </span>
        </div>
      </div>

      <div className="col-4" style={{ marginBottom: 24 }}>
        {DATA.kpis.map((k, i) => (
          <KpiCard key={i} k={k} />
        ))}
      </div>

      <div className="col-2" style={{ marginBottom: 24 }}>
        <ProjectPulse onNav={onNav} />
        <div style={{ display: 'grid', gap: 16 }}>
          <RecentLeads />
          <ActivityFeed />
        </div>
      </div>

      <div className="col-2">
        <TicketSnapshot onNav={onNav} />
        <RecognitionSnapshot onNav={onNav} />
      </div>
    </div>
  );
}

function CelebrateBanner() {
  return (
    <div className="celebrate">
      <div className="trophy">
        <I.Trophy width={26} height={26} />
      </div>
      <div className="text">
        <div className="ann">🎉 New board signed · just now</div>
        <div className="ttl">Lakeway Villas — 12-month management contract</div>
        <div className="sub">Sourced via Groundwork · est. $54K/yr · attributed to Alloy</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn btn-dark btn-sm">Share with team</button>
        <button className="btn btn-ghost btn-sm">Mark as read</button>
      </div>
    </div>
  );
}

interface Kpi {
  label: string;
  value: string;
  trend: string;
  up: boolean;
  icon: string;
  tone: string;
}

function KpiCard({ k }: { k: Kpi }) {
  const iconMap: Record<string, JSX.Element> = {
    trophy: <I.Trophy width={15} height={15} />,
    phone: <I.Phone width={15} height={15} />,
    trend: <I.TrendUp width={15} height={15} />,
    star: <I.Star width={15} height={15} />,
  };
  return (
    <div className="stat-card">
      <div className="stat-label">
        <span className={`stat-icon stat-icon-${k.tone}`}>{iconMap[k.icon]}</span>
        {k.label}
      </div>
      <div className="stat-value">{k.value}</div>
      <div className={`stat-trend ${k.up ? '' : 'down'}`}>
        <I.TrendUp width={13} height={13} /> {k.trend} <span className="vs">vs last period</span>
      </div>
      <Sparkline tone={k.tone} />
    </div>
  );
}

function Sparkline({ tone = 'pink' }: { tone?: string }) {
  const colors: Record<string, string> = {
    pink: '#d9356e',
    yellow: '#b8881a',
    blue: '#2a6391',
    green: '#2c6e62',
  };
  const c = colors[tone] || '#d9356e';
  const path = 'M0 22 L8 18 L16 20 L24 14 L32 16 L40 10 L48 12 L56 6 L64 8';
  return (
    <svg className="spark" width="76" height="28" viewBox="0 0 76 28" fill="none">
      <path
        d={path}
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle cx="64" cy="8" r="3" fill={c} />
    </svg>
  );
}

function ProjectPulse({ onNav }: { onNav: (id: string) => void }) {
  const items = DATA.projects.slice(0, 4);
  return (
    <div className="card card-pad">
      <div className="card-head">
        <span className="kicker">In flight</span>
        <h3>Project pulse</h3>
        <div className="grow" />
        <a onClick={() => onNav('projects')} style={{ cursor: 'pointer' }}>
          Open Monday view →
        </a>
      </div>
      <div>
        {items.map((p) => (
          <ProjectMiniRow key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

interface Project {
  id: string;
  title: string;
  phase: string;
  pct: number;
  status: string;
  due: string;
  dueRel: string;
  owners: string[];
  pulse: string;
}

function ProjectMiniRow({ p }: { p: Project }) {
  const statusMap: Record<string, { label: string; cls: string }> = {
    'in-progress': { label: 'In progress', cls: 'tag-status-progress' },
    review: { label: 'Your review', cls: 'tag-status-review' },
    live: { label: 'Live', cls: 'tag-status-live' },
    blocked: { label: 'Blocked', cls: 'tag-status-block' },
  };
  const s = statusMap[p.status];
  const phaseTag =
    p.phase === 'BoardReach'
      ? 'tag-attract'
      : p.phase === 'BoardMatch'
        ? 'tag-close'
        : p.phase === 'BoardRetain'
          ? 'tag-keep'
          : 'tag-energy';
  return (
    <div
      className="row-item"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 110px 110px 70px',
        gap: 14,
        alignItems: 'center',
        padding: '14px 0',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className={`tag ${phaseTag}`}>
            <span className="dot" />
            {p.phase}
          </span>
          <span className="who">{p.title}</span>
        </div>
        <div className="meta" style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {p.id} · due {p.due} · {p.dueRel}
        </div>
      </div>
      <div>
        <div className="progress">
          <div
            className="bar"
            style={{
              width: `${p.pct}%`,
              background:
                p.status === 'live'
                  ? 'var(--alloy-green)'
                  : p.status === 'blocked'
                    ? '#e07c7c'
                    : 'var(--alloy-pink)',
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, fontWeight: 600 }}>
          {p.pct}%
        </div>
      </div>
      <div>
        <span className={`tag ${s.cls}`}>
          <span className="dot" />
          {s.label}
        </span>
      </div>
      <div className="avatars">
        {p.owners.map((o, i) => (
          <div
            key={i}
            className="av"
            style={{ background: ['var(--alloy-purple)', 'var(--alloy-pink)', '#2a6391'][i % 3] }}
          >
            {o}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentLeads() {
  const qualityMap: Record<string, { label: string; cls: string }> = {
    qualified: { label: 'Qualified', cls: 'tag-status-live' },
    hot: { label: 'Hot', cls: 'tag-pink' },
    review: { label: 'Reviewing', cls: 'tag-status-progress' },
  };
  return (
    <div className="card card-pad">
      <div className="card-head">
        <span className="kicker">WhatConverts · live</span>
        <h3>Recent leads</h3>
        <div className="grow" />
        <a style={{ cursor: 'pointer' }}>All leads →</a>
      </div>
      <div>
        {DATA.recentLeads.slice(0, 4).map((l, i) => (
          <div
            key={i}
            className="row-item"
            style={{
              display: 'grid',
              gridTemplateColumns: '22px 1fr 80px 90px',
              gap: 10,
              alignItems: 'center',
              padding: '12px 0',
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                display: 'grid',
                placeItems: 'center',
                background: l.type === 'call' ? 'var(--alloy-pink-tint)' : 'var(--alloy-blue-tint)',
                color: l.type === 'call' ? 'var(--alloy-pink)' : '#2a6391',
              }}
            >
              {l.type === 'call' ? (
                <I.Phone width={11} height={11} />
              ) : (
                <I.Mail width={11} height={11} />
              )}
            </span>
            <div>
              <div className="who" style={{ fontSize: 13 }}>
                {l.name}
              </div>
              <div className="meta">{l.source}</div>
            </div>
            <span className={`tag ${qualityMap[l.quality].cls}`}>
              {qualityMap[l.quality].label}
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--alloy-purple)' }}>
                {l.value}
              </div>
              <div className="meta" style={{ fontSize: 11 }}>
                {l.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityFeed() {
  const colorMap: Record<string, { bg: string; fg: string; icon: JSX.Element }> = {
    pink: {
      bg: 'var(--alloy-pink-tint)',
      fg: 'var(--alloy-pink)',
      icon: <I.Trophy width={14} height={14} />,
    },
    yellow: {
      bg: 'var(--alloy-yellow-tint)',
      fg: '#b8881a',
      icon: <I.Phone width={14} height={14} />,
    },
    blue: { bg: 'var(--alloy-blue-tint)', fg: '#2a6391', icon: <I.Send width={14} height={14} /> },
    green: {
      bg: 'var(--alloy-green-tint)',
      fg: '#2c6e62',
      icon: <I.Star width={14} height={14} />,
    },
    purple: {
      bg: 'var(--alloy-purple-tint)',
      fg: 'var(--alloy-purple)',
      icon: <I.Sparkle width={14} height={14} />,
    },
  };
  return (
    <div className="card card-pad">
      <div className="card-head">
        <span className="kicker">This week</span>
        <h3>Activity</h3>
      </div>
      <div className="activity-list">
        {DATA.activity.map((a, i) => {
          const c = colorMap[a.color];
          return (
            <div key={i} className="activity-item">
              <div className="ic" style={{ background: c.bg, color: c.fg }}>
                {c.icon}
              </div>
              <div className="body">
                <div className="head-line">{a.text}</div>
                <div className="meta">{a.meta}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TicketSnapshot({ onNav }: { onNav: (id: string) => void }) {
  const open = DATA.tickets.filter((t) => t.status !== 'answered').slice(0, 3);
  return (
    <div className="card card-pad">
      <div className="card-head">
        <span className="kicker">Zendesk · your queue</span>
        <h3>Open requests</h3>
        <div className="grow" />
        <a onClick={() => onNav('tickets')} style={{ cursor: 'pointer' }}>
          Inbox →
        </a>
      </div>
      <div className="ticket-list" style={{ margin: '0 -8px' }}>
        {open.map((t) => (
          <TicketRow key={t.id} t={t} compact />
        ))}
      </div>
      <button
        className="btn btn-secondary"
        style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
        onClick={() => onNav('tickets')}
      >
        <I.Plus width={13} height={13} /> Send a request to your Alloy team
      </button>
    </div>
  );
}

function RecognitionSnapshot({ onNav }: { onNav: (id: string) => void }) {
  const earned = DATA.badges.filter((b) => b.state === 'earned').length;
  const next = DATA.badges.find((b) => b.state === 'progress');
  return (
    <div className="card card-pad">
      <div className="card-head">
        <span className="kicker">Recognition</span>
        <h3>Your wins, made tangible</h3>
        <div className="grow" />
        <a onClick={() => onNav('rewards')} style={{ cursor: 'pointer' }}>
          All badges →
        </a>
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'center' }}
      >
        <ScoreRing
          pct={(earned / DATA.badges.length) * 100}
          value={earned}
          total={DATA.badges.length}
        />
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 800,
              color: 'var(--alloy-purple)',
              lineHeight: 1.2,
            }}
          >
            {earned} of {DATA.badges.length} badges earned
          </div>
          <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>
            You're in the top tier of Alloy clients this quarter. Three more wins unlock the{' '}
            <strong style={{ color: 'var(--alloy-pink)' }}>Ten Wins</strong> medal.
          </div>
        </div>
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 18 }}
      >
        {DATA.badges.slice(0, 4).map((b) => (
          <MiniBadge key={b.id} b={b} />
        ))}
      </div>
      {next ? (
        <div
          style={{
            marginTop: 16,
            padding: '14px 16px',
            background: 'var(--alloy-pink-tint)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: 'var(--alloy-pink)',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <I.Sparkle width={16} height={16} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#a82451',
                textTransform: 'uppercase',
                letterSpacing: '.1em',
              }}
            >
              Up next
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--alloy-purple)' }}>
              {next.name}
            </div>
            <div className="progress" style={{ marginTop: 6 }}>
              <div className="bar" style={{ width: `${next.pct}%` }} />
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              fontWeight: 800,
              color: 'var(--alloy-pink)',
            }}
          >
            {next.pct}%
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ScoreRing({ pct, value, total }: { pct: number; value: number; total: number }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="score-ring">
      <svg viewBox="0 0 88 88" width="88" height="88">
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="var(--alloy-light-gray)"
          strokeWidth="8"
        />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="var(--alloy-pink)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={off}
          transform="rotate(-90 44 44)"
        />
      </svg>
      <div className="center">
        <div>
          <div className="v">
            {value}
            <span style={{ fontSize: 13, color: 'var(--fg-muted)', fontWeight: 600 }}>
              /{total}
            </span>
          </div>
          <div className="t">earned</div>
        </div>
      </div>
    </div>
  );
}

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

function MiniBadge({ b }: { b: Badge }) {
  const colors: Record<string, string> = {
    pink: '#d9356e',
    yellow: '#f5d880',
    blue: '#a1c8e7',
    green: '#aed7d0',
    purple: '#381c4f',
  };
  const fg = colors[b.color];
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '10px 6px',
        border: '1px solid var(--border-subtle)',
        borderRadius: 10,
        opacity: b.state === 'locked' ? 0.4 : 1,
      }}
    >
      <BadgeMedalSmall color={fg} state={b.state} />
      <div
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: 'var(--alloy-purple)',
          marginTop: 6,
          lineHeight: 1.2,
        }}
      >
        {b.name}
      </div>
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
        <linearGradient id={`mg-${color}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor="#381c4f" />
        </linearGradient>
      </defs>
      <polygon
        points="22,4 28,8 35,7 37,14 42,18 39,25 40,32 33,34 30,40 22,38 14,40 11,34 4,32 5,25 2,18 7,14 9,7 16,8"
        fill={state === 'locked' ? '#e8e4ef' : `url(#mg-${color})`}
        stroke={state === 'locked' ? '#c9c1d6' : '#fff'}
        strokeWidth="1.2"
      />
      <circle cx="22" cy="22" r="9" fill="#fff" opacity="0.15" />
      {state === 'locked' ? (
        <g>
          <rect x="18" y="20" width="8" height="7" rx="1.4" fill="#fff" />
          <path d="M19 20v-2a3 3 0 0 1 6 0v2" fill="none" stroke="#fff" strokeWidth="1.4" />
        </g>
      ) : (
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
      )}
    </svg>
  );
}
