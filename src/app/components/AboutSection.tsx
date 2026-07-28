import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

export function AboutSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#111111' : '#f7f4ef';

  return (
    <section className="section" style={{ background: bg }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASINGS.smooth }}
          style={{ textAlign: 'left' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 24, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
              À propos
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(30px, 3.8vw, 48px)',
            fontWeight: 700,
            color: isDark ? '#fff' : '#111',
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 18,
          }}>
            À propos de BATI RÉNOV
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: isDark ? 'rgba(255,255,255,0.62)' : '#5f5f5f',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: 720,
          }}>
            Entreprise à taille humaine, BATI RÉNOV accompagne particuliers et professionnels dans leurs projets de rénovation. Notre priorité est de fournir un travail de qualité, réalisé dans les règles de l'art, avec sérieux, professionnalisme et respect des délais.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
