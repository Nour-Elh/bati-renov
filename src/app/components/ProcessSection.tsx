import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

const steps = [
  'Prise de contact',
  'Visite du chantier',
  'Devis détaillé',
  'Réalisation des travaux',
  'Livraison du projet',
];

export function ProcessSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d0d0d' : '#111111';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  return (
    <section className="section" style={{ background: bg }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASINGS.smooth }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 24, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
              Processus
            </span>
            <div style={{ width: 24, height: 1, background: GOLD }} />
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(30px, 3.8vw, 48px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.15,
            margin: 0,
          }}>
            Un accompagnement clair et structuré
          </h2>
        </motion.div>

        <div className="process-timeline" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 20 }}>
          {steps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASINGS.smooth }}
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: '22px 18px',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: index === 0 ? GOLD : (isDark ? '#1c1c1c' : '#ffffff'),
                border: `2px solid ${index === 0 ? GOLD : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)')}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                boxShadow: index === 0 ? `0 0 0 6px ${GOLD}22` : 'none',
              }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: index === 0 ? '#fff' : (isDark ? 'rgba(255,255,255,0.6)' : '#999'),
                }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 16,
                fontWeight: 600,
                color: '#fff',
                lineHeight: 1.35,
              }}>
                {step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) { .process-timeline { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .process-timeline { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
