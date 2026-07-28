import { motion } from 'framer-motion';
import { CheckCircle, Clock, Hammer, Shield, Building2, Layers } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

const reasons = [
  { icon: Building2, title: "Plus de 30 ans d'expérience", desc: 'Un savoir-faire solide pour des chantiers fiables.' },
  { icon: Shield, title: 'Entreprise certifiée RGE', desc: "Des travaux conformes aux normes et éligibles aux aides." },
  { icon: CheckCircle, title: 'Devis gratuit', desc: 'Un chiffrage clair et transparent avant le démarrage.' },
  { icon: Clock, title: 'Respect des délais', desc: 'Un planning maîtrisé et des engagements tenus.' },
  { icon: Hammer, title: 'Travail soigné', desc: "Des finitions propres réalisées dans les règles de l'art." },
  { icon: Layers, title: 'Accompagnement personnalisé', desc: 'Une équipe à l’écoute, du conseil à la livraison.' },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASINGS.smooth }}
    >
      {children}
    </motion.div>
  );
}

export function WhyChooseSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d0d0d' : '#111111';
  const cardBg = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';

  return (
    <section className="section" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
                Pourquoi nous choisir
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
              Fiabilité, expertise et engagement
            </h2>
          </div>
        </FadeUp>

        <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {reasons.map((reason, i) => (
            <FadeUp key={reason.title} delay={i * 0.06}>
              <div style={{
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: 18,
                padding: '24px 22px',
                height: '100%',
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(216,155,43,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <reason.icon size={20} color={GOLD} />
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#fff',
                  lineHeight: 1.3,
                  margin: 0,
                  marginBottom: 10,
                }}>
                  {reason.title}
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.62)',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {reason.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 560px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
