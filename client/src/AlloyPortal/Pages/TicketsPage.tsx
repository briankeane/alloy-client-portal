import { useState } from 'react';
import { DATA } from '../data';
import { I } from '../Icons';
import { TicketRow } from './_shared';

interface Ticket {
  id: string;
  title: string;
  priority: string;
  status: string;
  agent: string;
  time: string;
  excerpt: string;
}

export default function TicketsPage() {
  const [activeId, setActiveId] = useState(DATA.tickets[0].id);
  const [filter, setFilter] = useState('open');
  const [composing, setComposing] = useState(false);
  const filtered = DATA.tickets.filter((tk) => {
    if (filter === 'open') return tk.status !== 'answered';
    if (filter === 'answered') return tk.status === 'answered';
    return true;
  });
  const active = DATA.tickets.find((t) => t.id === activeId);

  return (
    <div className="content" data-screen-label="04 Support">
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
            Zendesk · live thread
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
            Talk to your Alloy team
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 6, marginBottom: 0 }}>
            One thread for everything you need from us. Avg first response:{' '}
            <strong style={{ color: 'var(--alloy-purple)' }}>1h 12m</strong>.
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary">
            <I.Calendar width={13} height={13} /> Book strategy call
          </button>
          <button className="btn btn-primary" onClick={() => setComposing(true)}>
            <I.Plus width={13} height={13} /> New request
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: 0,
          border: '1px solid var(--border-subtle)',
          borderRadius: 14,
          overflow: 'hidden',
          background: '#fff',
          minHeight: 620,
        }}
      >
        <div
          style={{
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 14px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: 6,
              alignItems: 'center',
              background: 'var(--alloy-off-white)',
            }}
          >
            <button
              onClick={() => setFilter('open')}
              className="btn btn-sm"
              style={{
                background: filter === 'open' ? 'var(--alloy-purple)' : 'transparent',
                color: filter === 'open' ? '#fff' : 'var(--alloy-purple)',
                padding: '5px 11px',
              }}
            >
              Open ({DATA.tickets.filter((t) => t.status !== 'answered').length})
            </button>
            <button
              onClick={() => setFilter('answered')}
              className="btn btn-sm"
              style={{
                background: filter === 'answered' ? 'var(--alloy-purple)' : 'transparent',
                color: filter === 'answered' ? '#fff' : 'var(--alloy-purple)',
                padding: '5px 11px',
              }}
            >
              Resolved
            </button>
            <button
              onClick={() => setFilter('all')}
              className="btn btn-sm"
              style={{
                background: filter === 'all' ? 'var(--alloy-purple)' : 'transparent',
                color: filter === 'all' ? '#fff' : 'var(--alloy-purple)',
                padding: '5px 11px',
              }}
            >
              All
            </button>
            <div style={{ flex: 1 }} />
            <I.Filter width={15} height={15} style={{ color: 'var(--fg-muted)' }} />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map((tk) => (
              <TicketRow
                key={tk.id}
                t={tk}
                onClick={() => setActiveId(tk.id)}
                active={activeId === tk.id}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {composing ? (
            <ComposeRequest onCancel={() => setComposing(false)} />
          ) : active ? (
            <TicketDetail t={active} />
          ) : null}
        </div>
      </div>

      <div className="section-title">
        <span className="pip" />
        Common requests <a style={{ cursor: 'pointer' }}>See all templates →</a>
      </div>
      <div className="col-4">
        {[
          {
            icon: <I.Doc width={16} height={16} />,
            title: 'Update site copy',
            desc: 'Headline tweaks, page edits, footer info.',
          },
          {
            icon: <I.Sparkle width={16} height={16} />,
            title: 'Add a blog post',
            desc: 'Suggest a topic or share a draft.',
          },
          {
            icon: <I.Trophy width={16} height={16} />,
            title: 'Case study request',
            desc: 'We have a board win to celebrate.',
          },
          {
            icon: <I.Phone width={16} height={16} />,
            title: 'Schedule a check-in',
            desc: 'Book time with your strategist.',
          },
        ].map((r, i) => (
          <button
            key={i}
            className="card card-pad"
            style={{
              textAlign: 'left',
              display: 'block',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
            }}
            onClick={() => setComposing(true)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: [
                    'var(--alloy-pink-tint)',
                    'var(--alloy-yellow-tint)',
                    'var(--alloy-blue-tint)',
                    'var(--alloy-green-tint)',
                  ][i],
                  color: ['var(--alloy-pink)', '#7a5a14', '#2a6391', '#2c6e62'][i],
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {r.icon}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  fontWeight: 700,
                  color: 'var(--alloy-purple)',
                }}
              >
                {r.title}
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--fg-muted)', lineHeight: 1.45 }}>
              {r.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TicketDetail({ t }: { t: Ticket }) {
  const messages = [
    {
      from: 'you',
      name: DATA.user.name,
      avatar: DATA.user.initials,
      text: t.excerpt,
      time: t.time,
    },
    {
      from: 'alloy',
      name: t.agent,
      avatar: t.agent
        .split(' ')
        .map((s) => s[0])
        .join(''),
      text: "Got it — pulling this into our queue now. Cameron will own the rollout and we'll have it live before EOD tomorrow. Mind if we batch this with the GBP listings update we mentioned last week?",
      time: '8 min ago',
    },
    {
      from: 'you',
      name: DATA.user.name,
      avatar: DATA.user.initials,
      text: 'Perfect — yes please batch them. Appreciate the speed!',
      time: '5 min ago',
    },
  ];
  return (
    <>
      <div
        style={{
          padding: '16px 22px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span
              style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)' }}
            >
              {t.id}
            </span>
            <span className="tag tag-status-progress">
              <span className="dot" />
              Awaiting Alloy
            </span>
            <span className="tag tag-outline" style={{ textTransform: 'uppercase' }}>
              {t.priority}
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 800,
              color: 'var(--alloy-purple)',
            }}
          >
            {t.title}
          </div>
        </div>
        <button className="btn btn-secondary btn-sm">Mark resolved</button>
      </div>
      <div
        style={{
          padding: '22px 22px',
          flex: 1,
          overflowY: 'auto',
          background: 'var(--alloy-off-white)',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {messages.map((m, i) => (
          <Message key={i} m={m} />
        ))}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--fg-muted)',
            fontSize: 11,
            alignSelf: 'center',
            padding: '6px 12px',
            background: '#fff',
            borderRadius: 999,
            border: '1px dashed var(--border-subtle)',
          }}
        >
          <I.Sparkle width={12} height={12} style={{ color: 'var(--alloy-pink)' }} /> Auto-routed to
          Cameron · also notifying #alloy-rise on Slack
        </div>
      </div>
      <div
        style={{
          padding: '14px 22px',
          borderTop: '1px solid var(--border-subtle)',
          background: '#fff',
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
          <textarea
            className="input"
            rows={2}
            placeholder="Reply to your team…"
            style={{ resize: 'none', minHeight: 60 }}
          />
          <button className="btn btn-primary">
            <I.Send width={13} height={13} /> Send
          </button>
        </div>
        <div
          style={{ marginTop: 8, display: 'flex', gap: 10, fontSize: 11, color: 'var(--fg-muted)' }}
        >
          <span>📎 Attach</span>
          <span>🔗 Link a project</span>
          <span>⚡ Insert template</span>
        </div>
      </div>
    </>
  );
}

interface Msg {
  from: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
}

function Message({ m }: { m: Msg }) {
  const isYou = m.from === 'you';
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        flexDirection: isYou ? 'row-reverse' : 'row',
        maxWidth: '85%',
        alignSelf: isYou ? 'flex-end' : 'flex-start',
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 999,
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          fontFamily: 'var(--font-display)',
          fontSize: 11,
          fontWeight: 800,
          background: isYou
            ? 'linear-gradient(135deg, var(--alloy-yellow), var(--alloy-pink))'
            : 'var(--alloy-purple)',
          color: isYou ? 'var(--alloy-purple)' : '#fff',
        }}
      >
        {m.avatar}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            marginBottom: 4,
            flexDirection: isYou ? 'row-reverse' : 'row',
          }}
        >
          <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--alloy-purple)' }}>
            {m.name}
          </span>
          <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{m.time}</span>
        </div>
        <div
          style={{
            padding: '12px 14px',
            background: isYou ? 'var(--alloy-purple)' : '#fff',
            color: isYou ? '#fff' : 'var(--fg-3)',
            borderRadius: 10,
            fontSize: 13.5,
            lineHeight: 1.5,
            border: isYou ? 'none' : '1px solid var(--border-subtle)',
          }}
        >
          {m.text}
        </div>
      </div>
    </div>
  );
}

function ComposeRequest({ onCancel }: { onCancel: () => void }) {
  return (
    <div style={{ padding: '22px 26px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
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
            New request
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 800,
              color: 'var(--alloy-purple)',
              marginTop: 2,
            }}
          >
            What can your Alloy team do for you?
          </div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-ghost btn-sm" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.1em',
              color: 'var(--fg-muted)',
            }}
          >
            Type
          </label>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {[
              'Site update',
              'Content request',
              'Strategy question',
              'Bug / fix',
              'New project',
              'Other',
            ].map((tp, i) => (
              <button
                key={tp}
                className="tag"
                style={{
                  cursor: 'pointer',
                  border:
                    i === 0 ? '1px solid var(--alloy-pink)' : '1px solid var(--border-subtle)',
                  background: i === 0 ? 'var(--alloy-pink-tint)' : '#fff',
                  color: i === 0 ? '#a82451' : 'var(--alloy-purple)',
                  padding: '7px 12px',
                }}
              >
                {tp}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.1em',
              color: 'var(--fg-muted)',
            }}
          >
            Subject
          </label>
          <input
            className="input"
            defaultValue="Update phone number on every site footer"
            style={{ marginTop: 6 }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.1em',
              color: 'var(--fg-muted)',
            }}
          >
            Tell us what you need
          </label>
          <textarea
            className="input"
            rows={6}
            style={{ marginTop: 6, minHeight: 160, resize: 'vertical' }}
            defaultValue="Hi team — we just changed our main 800 number to 855-555-0144. Can you push it everywhere it shows on our site, including the GBP listings, footer, and contact page? No rush, but ideally before Friday since we're sending out a mailer."
          />
        </div>
        <div>
          <label
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '.1em',
              color: 'var(--fg-muted)',
            }}
          >
            Priority
          </label>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            {[
              { l: 'Low', c: 'var(--alloy-blue)' },
              { l: 'Normal', c: 'var(--alloy-yellow)' },
              { l: 'Urgent', c: 'var(--alloy-pink)' },
            ].map((p, i) => (
              <button
                key={p.l}
                className="tag"
                style={{
                  cursor: 'pointer',
                  border: i === 1 ? `1.5px solid ${p.c}` : '1px solid var(--border-subtle)',
                  background: i === 1 ? 'var(--alloy-yellow-tint)' : '#fff',
                  color: i === 1 ? '#7a5a14' : 'var(--alloy-purple)',
                  padding: '7px 14px',
                }}
              >
                {p.l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 18,
          paddingTop: 14,
          borderTop: '1px solid var(--border-subtle)',
        }}
      >
        <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
          <I.Send width={13} height={13} /> Send to Alloy team
        </button>
        <button className="btn btn-secondary">Save draft</button>
      </div>
    </div>
  );
}
