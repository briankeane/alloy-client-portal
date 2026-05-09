import { useState } from 'react';
import { DATA } from '../data';
import { I } from '../Icons';
import { useAlloyNav } from '../useAlloyNav';
import { Donut, LegendRow } from './_shared';

export default function ProjectsPage() {
  const onNav = useAlloyNav();
  const [filter, setFilter] = useState('all');
  const filtered = DATA.projects.filter(
    (p) => filter === 'all' || p.status === filter || p.phase.toLowerCase().includes(filter),
  );
  const counts = {
    all: DATA.projects.length,
    'in-progress': DATA.projects.filter((p) => p.status === 'in-progress').length,
    review: DATA.projects.filter((p) => p.status === 'review').length,
    blocked: DATA.projects.filter((p) => p.status === 'blocked').length,
    live: DATA.projects.filter((p) => p.status === 'live').length,
  };
  const tabs: Array<{ id: string; label: string; n: number; hot?: boolean }> = [
    { id: 'all', label: 'All', n: counts.all },
    { id: 'in-progress', label: 'In progress', n: counts['in-progress'] },
    { id: 'review', label: 'Your review', n: counts.review, hot: true },
    { id: 'blocked', label: 'Blocked', n: counts.blocked },
    { id: 'live', label: 'Shipped', n: counts.live },
  ];
  return (
    <div className="content" data-screen-label="02 Projects">
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
            Live from Monday
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
            Projects
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 6, marginBottom: 0 }}>
            Everything Alloy is building, shipping, or queuing for your account — synced from Monday
            every 5 min.
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary">
            <I.Filter width={13} height={13} /> Filter
          </button>
          <button className="btn btn-primary" onClick={() => onNav('tickets')}>
            <I.Plus width={13} height={13} /> Request a project
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 6,
          marginBottom: 16,
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setFilter(tb.id)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px 8px 0 0',
              fontSize: 12.5,
              fontWeight: 700,
              color: filter === tb.id ? 'var(--alloy-pink)' : 'var(--fg-muted)',
              borderBottom:
                filter === tb.id ? '2px solid var(--alloy-pink)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'all .15s',
            }}
          >
            {tb.label} <span style={{ opacity: 0.7, marginLeft: 4 }}>({tb.n})</span>
            {tb.hot && tb.n > 0 ? (
              <span
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  background: 'var(--alloy-pink)',
                  borderRadius: 999,
                  marginLeft: 6,
                  verticalAlign: 'middle',
                }}
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            padding: '14px 18px',
            display: 'grid',
            gridTemplateColumns: '1.6fr 1fr 1fr 1fr 110px',
            gap: 16,
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '.1em',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--alloy-off-white)',
          }}
        >
          <div>Project</div>
          <div>Progress</div>
          <div>Status</div>
          <div>Due</div>
          <div>Team</div>
        </div>
        {filtered.map((p) => (
          <ProjectFullRow key={p.id} p={p} />
        ))}
      </div>

      <div className="col-3" style={{ marginTop: 24 }}>
        <div className="card card-pad">
          <div className="card-head">
            <span className="kicker">This quarter</span>
            <h3>What's planned</h3>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div className="donut">
              <Donut
                segments={[
                  { v: 5, c: 'var(--alloy-pink)' },
                  { v: 3, c: 'var(--alloy-blue)' },
                  { v: 2, c: 'var(--alloy-green)' },
                  { v: 2, c: 'var(--alloy-yellow)' },
                ]}
              />
              <div className="lbl">
                <div>
                  <div className="v">12</div>
                  <div className="t">Total</div>
                </div>
              </div>
            </div>
            <div className="legend">
              <LegendRow c="var(--alloy-pink)" name="BoardReach (Attract)" v="5" />
              <LegendRow c="var(--alloy-blue)" name="BoardMatch (Close)" v="3" />
              <LegendRow c="var(--alloy-green)" name="BoardRetain (Keep)" v="2" />
              <LegendRow c="var(--alloy-yellow)" name="L&D / Strategy" v="2" />
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <div className="card-head">
            <span className="kicker">Point budget</span>
            <h3>Quarterly capacity</h3>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 32,
                  fontWeight: 800,
                  color: 'var(--alloy-purple)',
                  lineHeight: 1,
                }}
              >
                78<span style={{ fontSize: 16, color: 'var(--fg-muted)' }}>/100 pts</span>
              </div>
            </div>
            <span className="tag tag-status-live">
              <span className="dot" />
              Healthy
            </span>
          </div>
          <div className="progress" style={{ marginTop: 14, height: 10 }}>
            <div
              className="bar"
              style={{
                width: '78%',
                background: 'linear-gradient(90deg, var(--alloy-pink), var(--alloy-yellow))',
              }}
            />
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 10, lineHeight: 1.5 }}>
            22 points still allocatable. Talk to your team to add a course, geo cluster, or proposal
            asset before quarter end.
          </div>
        </div>

        <div
          className="card card-pad"
          style={{
            background: 'linear-gradient(135deg, var(--alloy-purple) 0%, #1f0e30 100%)',
            color: '#fff',
            border: 'none',
          }}
        >
          <div className="card-head">
            <span className="kicker" style={{ color: 'var(--alloy-yellow)' }}>
              Next playbook
            </span>
            <h3 style={{ color: '#fff' }}>Q2 '26 drops Mar 28</h3>
          </div>
          <p
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.55,
              margin: '6px 0 14px',
            }}
          >
            Your Alloy team is assembling Q2 priorities now. Quarter theme:{' '}
            <strong style={{ color: '#fff' }}>Scale</strong> — geo expansion + premium proposal kit
            + board education.
          </p>
          <button className="btn" style={{ background: '#fff', color: 'var(--alloy-purple)' }}>
            <I.Calendar width={13} height={13} /> Add review session to calendar
          </button>
        </div>
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

function ProjectFullRow({ p }: { p: Project }) {
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
    <div className="project-row">
      <div className="title-cell">
        <div className="ttl">
          <span className={`tag ${phaseTag}`} style={{ fontSize: 9 }}>
            <span className="dot" />
            {p.phase}
          </span>
          {p.title}
        </div>
        <div className="meta">
          <span style={{ fontFamily: 'var(--font-mono)' }}>{p.id}</span> · {p.pulse}
        </div>
      </div>
      <div className="progress-cell">
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
        <div className="pct">{p.pct}%</div>
      </div>
      <div>
        <span className={`tag ${s.cls}`}>
          <span className="dot" />
          {s.label}
        </span>
      </div>
      <div className="due">
        {p.due}
        <span className="small">{p.dueRel}</span>
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
