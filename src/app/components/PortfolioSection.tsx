import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

const projects = [
  {
    img: 'https://images.unsplash.com/photo-1592229505801-77b31918d822?w=800&q=85&auto=format&fit=crop',
    title: 'Rénovation maison individuelle',
    cat: 'Rénovation',
    desc: 'Reprise des volumes, isolation et finitions complètes.',
  },
  {
    img: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?w=800&q=85&auto=format&fit=crop',
    title: 'Rénovation cuisine familiale',
    cat: 'Cuisine',
    desc: 'Réaménagement, carrelage et remise aux normes.',
  },
  {
    img: 'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?w=800&q=85&auto=format&fit=crop',
    title: 'Salle de bain moderne',
    cat: 'Salle de Bain',
    desc: 'Étanchéité, carrelage et équipements neufs.',
  },
  {
    img: 'https://images.unsplash.com/photo-1668511949286-bee319d2271f?w=800&q=85&auto=format&fit=crop',
    title: 'Rénovation appartement T3',
    cat: 'Appartement',
    desc: 'Cloisons, réseaux électriques et finitions.',
  },
  {
    img: 'https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?w=800&q=85&auto=format&fit=crop',
    title: 'Carrelage grand format',
    cat: 'Carrelage',
    desc: 'Pose précise et alignements soignés.',
  },
  {
    img: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=800&q=85&auto=format&fit=crop',
    title: 'Isolation extérieure façade',
    cat: 'Isolation',
    desc: "Performance thermique et finitions durables.",
  },
  {
    img: 'https://images.unsplash.com/photo-1657129208507-7005dfc5b36a?w=800&q=85&auto=format&fit=crop',
    title: 'Rénovation façade',
    cat: 'Façade',
    desc: 'Nettoyage, reprise d’enduits et protection.',
  },
  {
    img: 'https://images.unsplash.com/photo-1668512624275-0ee56aca4c1a?w=800&q=85&auto=format&fit=crop',
    title: 'Mise aux normes électrique',
    cat: 'Électricité',
    desc: 'Tableau rénové et sécurisation des circuits.',
  },
  {
    img: 'https://images.unsplash.com/photo-1743364971090-a555f8aea2b0?w=800&q=85&auto=format&fit=crop',
    title: 'Rénovation local professionnel',
    cat: 'Professionnel',
    desc: 'Aménagement, peinture et remise en état.',
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.65, delay, ease: EASINGS.smooth }}
    >
      {children}
    </motion.div>
  );
}

export function PortfolioSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d0d0d' : '#111111';

  return (
    <section className="section" style={{ background: bg }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 38, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 24, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD }}>
                  Nos Réalisations
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(30px, 3.8vw, 48px)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                margin: 0,
              }}>
                Des réalisations solides<br />
                <em style={{ fontStyle: 'italic', color: GOLD }}>propres et durables</em>
              </h2>
            </div>
            <Link to="/realisations" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '11px 22px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              borderRadius: 8,
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = GOLD; (e.currentTarget as HTMLElement).style.color = GOLD; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
            >
              Voir tous les projets <ArrowRight size={13} />
            </Link>
          </div>
        </FadeUp>

        <div
          className="portfolio-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {projects.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.05}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) { .portfolio-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .portfolio-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        height: 320,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.25s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.img}
        alt={project.title}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.45s ease',
        }}
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.25))'
          : 'transparent',
        transition: 'background 0.45s ease',
      }} />
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        padding: '4px 10px',
        background: 'rgba(216,155,43,0.88)',
        borderRadius: 5,
        fontFamily: "'Inter', sans-serif",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#fff',
      }}>
        {project.cat}
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px 16px',
        transform: hovered ? 'translateY(0)' : 'translateY(20px)',
        opacity: hovered ? 1 : 0,
        transition: 'all 0.45s ease',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 15,
          fontWeight: 600,
          color: '#fff',
          lineHeight: 1.3,
          marginBottom: 6,
        }}>
          {project.title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.6,
        }}>
          {project.desc}
        </div>
      </div>
    </div>
  );
}