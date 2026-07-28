import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

export function TestimonialsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d0d0d' : '#111111';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  const testimonials = [
    {
      quote: 'Travail sérieux et équipe professionnelle. Chantier livré dans les délais avec un résultat impeccable.',
      author: 'Client BATI RÉNOV',
      detail: 'Avis client',
    },
    {
      quote: 'Très bonne communication du début à la fin. Nous recommandons BATI RÉNOV.',
      author: 'Client BATI RÉNOV',
      detail: 'Avis client',
    },
    {
      quote: 'Excellent travail de rénovation avec des finitions de qualité.',
      author: 'Client BATI RÉNOV',
      detail: 'Avis client',
    },
  ];

  return (
    <section className="section" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto">
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
              Témoignages
            </span>
            <div style={{ width: 24, height: 1, background: GOLD }} />
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.2,
            margin: 0,
          }}>
            La confiance de nos clients,<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>notre plus belle récompense</em>
          </h2>
        </motion.div>

        <div className="testi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {testimonials.map((item, index) => (
            <motion.div
              key={item.author}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.65, delay: index * 0.08, ease: EASINGS.smooth }}
              style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: 18,
                padding: '26px 24px',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} color={GOLD} fill={GOLD} />
                ))}
              </div>
              <Quote size={22} color={GOLD} style={{ opacity: 0.7, marginBottom: 12 }} />
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 16,
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.75,
                margin: 0,
                marginBottom: 18,
              }}>
                {item.quote}
              </p>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 4,
              }}>
                {item.author}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
              }}>
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) { .testi-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
