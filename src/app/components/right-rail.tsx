import { useLeetCodeStats } from '../../hooks/useLeetCodeStats';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div
      className="w-full rounded-2xl p-3.5"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #d0dcf0',
      }}
    >
      <div
        style={{
          fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          color: '#0f1828',
          marginBottom: '10px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: 'Inter Variable, Inter, system-ui, sans-serif',
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#2a3a5a',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function RightRail() {
  const { currentRating } = useLeetCodeStats();

  const elsewhereLinks = [
    { label: 'GitHub', href: 'https://github.com/RishitModi', badge: null, isExternal: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/rishitmodii', badge: null, isExternal: true },
    { label: 'LeetCode', href: 'https://leetcode.com/u/modeiji09/', badge: currentRating, isExternal: true },
    { label: 'CodeChef', href: 'https://www.codechef.com/users/rishitmodeiji', badge: '3★', isExternal: true },
    { label: 'Email', href: 'mailto:modirishit6@gmail.com', badge: null, isExternal: false },
  ];

  return (
    <aside
      aria-label="Profile information"
      className="w-full xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto px-4 py-6"
    >
      <div className="w-full flex flex-col gap-4">
        {/* Card 1 — About me */}
        <Card title="About me">
          Building intelligent systems at the edge of cryptography, deep learning, and scalable
          product engineering. B.Tech CS @ VJTI — top 0.03% nationally.
        </Card>

        {/* Card 2 — Highlights */}
        <Card title="Highlights">
          <ul className="flex flex-col gap-2.5">
            <li className="flex items-start gap-2">
              <span
                style={{
                  color: '#1a5fd4',
                  fontSize: '10px',
                  lineHeight: '1.6',
                  flexShrink: 0,
                }}
              >
                ◆
              </span>
              <span>800+ DSA Problems Solved</span>
            </li>
            <li className="flex items-start gap-2">
              <span
                style={{
                  color: '#1a5fd4',
                  fontSize: '10px',
                  lineHeight: '1.6',
                  flexShrink: 0,
                }}
              >
                ◆
              </span>
              <span>Knight at Leetcode, 3 Star at CodeChef</span>
            </li>
            <li className="flex items-start gap-2">
              <span
                style={{
                  color: '#1a5fd4',
                  fontSize: '10px',
                  lineHeight: '1.6',
                  flexShrink: 0,
                }}
              >
                ◆
              </span>
              <span>6+ merged PRs during Hacktoberfest 2025</span>
            </li>
          </ul>
        </Card>

        {/* Card 3 — Status */}
        <Card title="Status">
          <div className="flex items-start gap-2">
            {/* live pulse dot */}
            <span
              className="mt-1 flex-shrink-0"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                display: 'inline-block',
                animation: 'rail-pulse 2s ease-in-out infinite',
              }}
            />
            <span>Open to internships, research collabs, and interesting problems.</span>
          </div>
        </Card>

        {/* Card 4 — Elsewhere */}
        <Card title="Elsewhere">
          <div className="flex flex-col">
            {elsewhereLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                className="rail-link-row flex items-center justify-between w-full py-2 px-2 -mx-2 rounded transition-colors duration-150"
                style={{
                  borderBottom: idx < elsewhereLinks.length - 1 ? '1px solid #d0dcf0' : 'none',
                }}
              >
                <span>{link.label}</span>
                <span className="flex items-center gap-1.5" style={{ color: '#6080b0' }}>
                  {link.badge && (
                    <span style={{ fontSize: '11px', color: '#6080b0' }}>
                      {link.badge}
                    </span>
                  )}
                  <span>↗</span>
                </span>
              </a>
            ))}
          </div>
        </Card>
      </div>

      <style>{`
        @keyframes rail-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(74, 222, 128, 0); }
        }
        .rail-link-row {
          color: #2a3a5a;
          text-decoration: none;
          font-size: 13px;
          line-height: 1.6;
        }
        .rail-link-row:hover {
          color: #1a5fd4;
          background-color: #f4f6fa;
        }
        .rail-link-row:hover span {
          color: #1a5fd4;
        }
      `}</style>
    </aside>
  );
}
