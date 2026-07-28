import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { CTASection } from '../components/CTASection';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;

const allProjects = [
  { img: 'https://images.unsplash.com/photo-1592229505801-77b31918d822?w=800&q=85&auto=format&fit=crop', title: 'Appartement Haussmannien', cat: 'Appartement' },
  { img: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?w=800&q=85&auto=format&fit=crop', title: 'Cuisine Marbre & Bois', cat: 'Cuisine' },
  { img: 'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?w=800&q=85&auto=format&fit=crop', title: 'Suite Parentale Spa', cat: 'Salle de Bain' },
  { img: 'https://images.unsplash.com/photo-1668511949286-bee319d2271f?w=800&q=85&auto=format&fit=crop', title: 'Loft Contemporain', cat: 'Appartement' },
  { img: 'https://images.unsplash.com/photo-1628745277862-bc0b2d68c50c?w=800&q=85&auto=format&fit=crop', title: 'Cuisine Scandinave', cat: 'Cuisine' },
  { img: 'https://images.unsplash.com/photo-1564540579594-0930edb6de43?w=800&q=85&auto=format&fit=crop', title: 'Salle de Bain Marbre', cat: 'Salle de Bain' },
  { img: 'https://images.unsplash.com/photo-1657129208507-7005dfc5b36a?w=800&q=85&auto=format&fit=crop', title: 'Façade d\'Exception', cat: 'Extérieur' },
  { img: 'https://images.unsplash.com/photo-1668512624275-0ee56aca4c1a?w=800&q=85&auto=format&fit=crop', title: 'Suite Élégante', cat: 'Intérieur' },
  { img: 'https://images.unsplash.com/photo-1743364971090-a555f8aea2b0?w=800&q=85&auto=format&fit=crop', title: 'Réception Signature', cat: 'Appartement' },
  { img: 'https://images.unsplash.com/photo-1592229506151-845940174bb0?w=800&q=85&auto=format&fit=crop', title: 'Séjour Vue Paris', cat: 'Intérieur' },
  { img: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=800&q=85&auto=format&fit=crop', title: 'Maison avec Cheminée', cat: 'Maison' },
  { img: 'https://images.unsplash.com/photo-1768288985014-cc88f2e5004d?w=800&q=85&auto=format&fit=crop', title: 'Immeuble Rénové', cat: 'Extérieur' },
];

const cats = ['Tous', 'Appartement', 'Maison', 'Cuisine', 'Salle de Bain', 'Intérieur', 'Extérieur'];

export function RealisationsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#111111' : '#f7f4ef';
  const [activeCat, setActiveCat] = useState('Tous');

  const filtered = activeCat === 'Tous' ? allProjects : allProjects.filter(p => p.cat === activeCat);

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '52vh', minHeight: 380, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1920&q=85&auto=format&fit=crop"
          alt="Nos réalisations"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.42) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 6vw', paddingTop: 70 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASINGS.smooth }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Réalisations</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0, marginBottom: 14 }}>
              Nos Réalisations
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              500+ projets réalisés avec excellence à Paris et en Île-de-France
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section-tight" style={{ background: bg }}>
        <div className="max-w-7xl mx-auto">
          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASINGS.smooth }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}
          >
            {cats.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: `1px solid ${activeCat === cat ? GOLD : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`,
                  background: activeCat === cat ? GOLD : 'transparent',
                  color: activeCat === cat ? '#fff' : (isDark ? 'rgba(255,255,255,0.6)' : '#555'),
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  transition: 'all 0.25s',
                }}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASINGS.smooth }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
              className="real-grid"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASINGS.smooth }}
                >
                  <ProjectCard project={p} isDark={isDark} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />

      <style>{`
        @media (max-width: 800px) { .real-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .real-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

function ProjectCard({ project, isDark }: { project: typeof allProjects[0]; isDark: boolean }) {
  const [hv, setHv] = useState(false);
  return (
    <div
      style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '3/2', cursor: 'pointer', transform: hv ? 'translateY(-2px)' : 'translateY(0)', transition: 'transform 0.25s ease' }}
      onMouseEnter={() => setHv(true)}
      onMouseLeave={() => setHv(false)}
    >
      <img
        src={project.img}
        alt={project.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transform: hv ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.65s ease' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hv ? 'linear-gradient(160deg, rgba(0,0,0,0.1), rgba(0,0,0,0.72))' : 'linear-gradient(160deg, transparent 30%, rgba(0,0,0,0.6))',
        transition: 'background 0.4s',
      }} />
      {/* Surface badge */}
      <div style={{
        position: 'absolute', top: 12, left: 12,
        padding: '4px 10px',
        background: 'rgba(216,155,43,0.9)',
        borderRadius: 5,
        fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff',
      }}>
        {project.cat}
      </div>
      {/* Info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 16px',
        transform: hv ? 'translateY(0)' : 'translateY(3px)',
        opacity: hv ? 1 : 0.85,
        transition: 'all 0.35s',
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 0 }}>
          {project.title}
        </div>
      </div>
    </div>
  );
}
