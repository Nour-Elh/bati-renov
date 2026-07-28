import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;
const GOLD_HOVER = COLORS.goldHover;

export function CTASection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?w=1920&q=85&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(17,17,17,0.88) 0%, rgba(17,17,17,0.72) 100%)',
      }} />

      <div className="max-w-7xl mx-auto section-xl" style={{ position: 'relative', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASINGS.smooth }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 24, height: 1, background: GOLD }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
              Votre Projet
            </span>
            <div style={{ width: 24, height: 1, background: GOLD }} />
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 18,
          }}>
            Votre projet mérite<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>l'excellence</em>
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 16,
            color: 'rgba(255,255,255,0.62)',
            lineHeight: 1.7,
            margin: '0 auto',
            marginBottom: 36,
            maxWidth: 480,
          }}>
            Obtenez une estimation personnalisée et confidentielle pour votre projet de rénovation à Avion et dans les Hauts-de-France.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px',
              background: GOLD,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 9,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Estimation privée <ArrowRight size={15} />
            </Link>
            <a href="tel:+33983885207" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px',
              background: 'transparent',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 9,
              border: '1px solid rgba(255,255,255,0.22)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.05em',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
            >
              <Phone size={14} /> 09 83 88 52 07
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
