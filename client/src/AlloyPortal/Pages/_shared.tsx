import { I } from '../Icons';

interface Ticket {
  id: string;
  title: string;
  priority: string;
  status: string;
  agent: string;
  time: string;
  excerpt: string;
}

const STATUS_MAP: Record<string, { label: string; cls: string }> = {
  open: { label: 'Awaiting Alloy', cls: 'tag-status-progress' },
  'in-progress': { label: 'In progress', cls: 'tag-status-live' },
  answered: { label: 'Answered', cls: 'tag-status-done' },
};

interface TicketRowProps {
  t: Ticket;
  compact?: boolean;
  onClick?: () => void;
  active?: boolean;
}

export function TicketRow({ t, onClick, active }: TicketRowProps) {
  const priorityCls = `priority-${t.priority === 'high' ? 'high' : t.priority === 'med' ? 'med' : 'low'}`;
  const s = STATUS_MAP[t.status];
  return (
    <div className={`ticket-item ${priorityCls} ${active ? 'active' : ''}`} onClick={onClick}>
      <div className="priority-bar" />
      <div>
        <div className="title-line">{t.title}</div>
        <div className="meta-line">
          <span className="id">{t.id}</span>
          <span className="sep" />
          {t.agent}
          <span className="sep" />
          {t.time}
        </div>
      </div>
      <span className={`tag ${s.cls}`}>{s.label}</span>
      <span className="tag tag-outline" style={{ textTransform: 'uppercase' }}>
        {t.priority}
      </span>
      <I.Arrow width={14} height={14} />
    </div>
  );
}

interface DonutSegment {
  v: number;
  c: string;
}

export function Donut({ segments }: { segments: DonutSegment[] }) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  const r = 56;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg viewBox="0 0 130 130" width="130" height="130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="var(--alloy-light-gray)" strokeWidth="14" />
      {segments.map((s, i) => {
        const len = (s.v / total) * c;
        const dash = `${len} ${c - len}`;
        const dashOff = -off;
        off += len;
        return (
          <circle
            key={i}
            cx="65"
            cy="65"
            r={r}
            fill="none"
            stroke={s.c}
            strokeWidth="14"
            strokeDasharray={dash}
            strokeDashoffset={dashOff}
            transform="rotate(-90 65 65)"
          />
        );
      })}
    </svg>
  );
}

export function LegendRow({ c, name, v }: { c: string; name: string; v: string }) {
  return (
    <div className="legend-row">
      <span className="swatch" style={{ background: c }} />
      <span className="lname">{name}</span>
      <span className="lval">{v}</span>
    </div>
  );
}
