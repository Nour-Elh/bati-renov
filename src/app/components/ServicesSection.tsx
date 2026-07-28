import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hammer, Grid2X2, Zap, Layers, Shield, Building2, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

const services = [
  { icon: Hammer, title: 'Maçonnerie', desc: 'Travaux de structure, ouvertures, extensions et finitions durables.', href: '/prestations/maconnerie', color: '#c4891f' },
  { icon: Grid2X2, title: 'Carrelage', desc: 'Pose de carrelage et faïence pour sols et murs, intérieur et extérieur.', href: '/prestations/carrelage', color: '#8a6040' },
  { icon: Zap, title: 'Électricité', desc: 'Mise aux normes, tableaux électriques et installations fiables.', href: '/prestations/electricite', color: '#e8a020' },
  { icon: Layers, title: 'Isolation intérieure', desc: 'Confort thermique et acoustique avec matériaux performants.', href: '/prestations/isolation-interieure', color: '#3a7bd5' },
  { icon: Shield, title: 'Isolation extérieure', desc: 'Isolation thermique par l\'extérieur pour économies d\'énergie.', href: '/prestations/isolation-exterieure', color: '#4a8a5c' },
  { icon: Building2, title: 'Rénovation générale', desc: 'Rénovation complète de maisons, appartements et locaux professionnels.', href: '/prestations/renovation-generale', color: '#5a8a8a' },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, delay, ease: EASINGS.smooth }}
    >
      {children}
    </motion.div>
  );
}

export function ServicesSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#111111' : '#f7f4ef';
  const cardBg = isDark ? '#1c1c1c' : '#ffffff';
  const cardBorder = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <section className="section" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
                Nos Services
              </span>
              <div style={{ width: 24, height: 1, background: GOLD }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 50px)',
              fontWeight: 700,
              color: isDark ? '#fff' : '#111',
              lineHeight: 1.15,
              margin: 0,
              marginBottom: 14,
            }}>
              Un savoir-faire d'exception
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              color: isDark ? 'rgba(255,255,255,0.52)' : '#5f5f5f',
              lineHeight: 1.75,
              maxWidth: 480,
              margin: '0 auto',
            }}>
              De la conception à la livraison, nos artisans maîtrisent chaque corps de métier avec rigueur et passion.
            </p>
          </div>
        </FadeUp>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
        }} className="services-grid">
          {services.map((service, i) => (
            <FadeUp key={service.href} delay={i * 0.07}>
              <ServiceCard service={service} isDark={isDark} cardBg={cardBg} cardBorder={cardBorder} />
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ServiceCard({ service, isDark, cardBg, cardBorder }: {
  service: typeof services[0];
  isDark: boolean;
  cardBg: string;
  cardBorder: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={service.href}
      style={{ textDecoration: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        background: cardBg,
        border: `1px solid ${hovered ? GOLD + '44' : cardBorder}`,
        borderRadius: 18,
        padding: '28px 26px',
        height: '100%',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,${isDark ? 0.35 : 0.1}), 0 0 0 1px ${GOLD}22`
          : `0 2px 12px rgba(0,0,0,${isDark ? 0.2 : 0.05})`,
        transition: 'all 0.32s ease',
      }}>
        {/* Icon */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 13,
          background: hovered ? `${service.color}22` : `rgba(216,155,43,0.09)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 18,
          transition: 'background 0.3s',
        }}>
          <service.icon size={22} color={hovered ? service.color : GOLD} style={{ transition: 'color 0.3s' }} />
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 19,
          fontWeight: 600,
          color: isDark ? '#fff' : '#111',
          lineHeight: 1.3,
          margin: 0,
          marginBottom: 10,
        }}>
          {service.title}
        </h3>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          color: isDark ? 'rgba(255,255,255,0.48)' : '#6a6a6a',
          lineHeight: 1.7,
          margin: 0,
          marginBottom: 18,
        }}>
          {service.desc}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: GOLD,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.2s',
        }}>
          Découvrir <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  );
}
