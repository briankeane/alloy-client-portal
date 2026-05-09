import { useState } from 'react';
import { DATA } from '../data';
import { I } from '../Icons';

export default function LibraryPage() {
  const [tab, setTab] = useState('all');
  const filtered = DATA.library.filter((l) => tab === 'all' || l.lane === tab);
  return (
    <div className="content" data-screen-label="06 Library">
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
            Resource library
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
            Plays, guides &amp; courses
          </h2>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 6, marginBottom: 0 }}>
            Everything Alloy has built for CAM operators. Read, share with your team, or assign as
            training.
          </p>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'all', l: 'All' },
            { id: 'attract', l: 'BoardReach' },
            { id: 'close', l: 'BoardMatch' },
            { id: 'keep', l: 'BoardRetain' },
            { id: 'energy', l: 'L&D' },
          ].map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className="btn btn-sm"
              style={{
                background: tab === tb.id ? 'var(--alloy-purple)' : 'transparent',
                color: tab === tb.id ? '#fff' : 'var(--alloy-purple)',
                padding: '6px 12px',
              }}
            >
              {tb.l}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
          <div
            style={{
              padding: '32px 36px',
              background:
                'linear-gradient(120deg, var(--alloy-purple) 0%, var(--alloy-purple-deep) 100%)',
              color: '#fff',
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '.12em',
                color: 'var(--alloy-yellow)',
              }}
            >
              Featured · new for Q1
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 28,
                fontWeight: 800,
                lineHeight: 1.15,
                margin: '10px 0 14px',
                color: '#fff',
                letterSpacing: '-0.01em',
              }}
            >
              Outsmarting AI Search
            </h3>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.78)',
                margin: '0 0 18px',
              }}
            >
              How micro-courses drive clicks, credibility, and conversions in the era of Perplexity,
              Gemini, and Google AI Overviews. Five lessons. Built specifically for CAM operators.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary">
                <I.Bolt width={13} height={13} /> Start the course
              </button>
              <button
                className="btn btn-secondary"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.18)',
                }}
              >
                Read pillar page
              </button>
            </div>
          </div>
          <div
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, var(--alloy-pink) 0%, #8a1f48 100%)',
              display: 'grid',
              placeItems: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 30% 30%, rgba(245,216,128,0.4) 0%, transparent 60%)',
              }}
            />
            <div style={{ position: 'relative', textAlign: 'center', color: '#fff', padding: 24 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 60,
                  letterSpacing: '-0.02em',
                  lineHeight: 0.9,
                }}
              >
                5
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '.14em',
                  marginTop: 6,
                }}
              >
                Lessons
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 18, justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: 36,
                      height: 6,
                      background: n <= 2 ? 'var(--alloy-yellow)' : 'rgba(255,255,255,0.4)',
                      borderRadius: 999,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontSize: 12,
                  marginTop: 10,
                  color: 'rgba(255,255,255,0.85)',
                  fontWeight: 600,
                }}
              >
                Lesson 2 of 5 · ~14 min left
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="library-grid">
        {filtered.map((l, i) => (
          <div key={i} className="lib-card">
            <div className={`cover ${l.lane}`}>
              <span className="stage">{l.stage}</span>
              <span className="ttl">{l.ttl}</span>
            </div>
            <div className="body">
              <div className="meta">{l.meta}</div>
              <div className="desc">{l.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
