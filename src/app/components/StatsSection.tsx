import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/tokens';

const GOLD = COLORS.gold;

const stats = [
  { value: '30+', label: "Années d'expérience" },
  { value: '100+', label: 'Projets réalisés' },
  { value: '100%', label: 'Devis gratuits' },
  { value: 'RGE', label: 'Entreprise certifiée' },
];

export function StatsSection() {
  const { theme } = useTheme();

  return (
    <section
      style={{
        background: '#0d0d0d',
        padding: '0 var(--container-px)',
      }}
    >
      <div
        className="max-w-7xl mx-auto stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-card"
            style={{
              padding: '34px 20px',
              textAlign: 'center',
              borderRight:
                i < stats.length - 1
                  ? '1px solid rgba(255,255,255,0.06)'
                  : 'none',
              transition: 'all 0.35s ease',
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '42px',
                fontWeight: 700,
                color: GOLD,
                marginBottom: '10px',
              }}
            >
              {stat.value}
            </div>

            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .stat-card:hover{
          transform:translateY(-6px);
          background:rgba(255,255,255,0.02);
        }

        @media(max-width:600px){
          .stats-grid{
            grid-template-columns:1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}