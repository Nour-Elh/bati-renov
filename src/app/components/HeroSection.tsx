import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { COLORS, EASINGS } from '../styles/tokens';

const GOLD = COLORS.gold;
const GOLD_HOVER = COLORS.goldHover;

const heroImages = [
  'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=1920&q=85&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1682888813913-e13f18692019?w=1920&q=85&auto=format&fit=crop',
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: 'relative', height: '92vh', minHeight: '90vh', maxHeight: 860, overflow: 'hidden' }}>
      {/* Images */}
      <AnimatePresence mode="wait">
        {heroImages.map((src, i) => (
          i === current && (
            <motion.div
              key={`img-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.6 : 1.4, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: 0 }}
            >
             <img
              src={src}
              alt="Rénovation BATI RÉNOV"
              loading={i === 0 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: reduceMotion ? 'scale(1)' : 'scale(1.02)',
                transition: 'transform 8s linear'
              }}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: '0 clamp(20px, 5.5vw, 96px)',
        paddingTop: 'clamp(180px, 18vh, 230px)',
        maxWidth: 580,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: EASINGS.smooth }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            <div style={{ width: 32, height: 1, background: GOLD }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: GOLD,
            }}>
              30 ANS D'EXPÉRIENCE • ENTREPRISE CERTIFIÉE RGE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55, ease: EASINGS.smooth }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4.5vw, 58px)',
              fontWeight: 700,
              lineHeight: 1.02,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-0.01em',
              whiteSpace: 'normal',
              textShadow: '0 12px 36px rgba(0,0,0,0.35)',
            }}
          >
            BATI RÉNOV
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55, ease: EASINGS.smooth }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Votre expert en rénovation et bâtiment
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 0.55, ease: EASINGS.smooth }}
            style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.82)',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: 560,
          }}
        >
          Entreprise générale du bâtiment basée à Avion (Hauts-de-France).
          <br />
          Maçonnerie, carrelage, électricité, isolation et rénovation complète.
          <br />
          Plus de 30 ans d'expérience au service de vos projets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.55, ease: EASINGS.smooth }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 32 }}
          >
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              background: GOLD,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 9,
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              DEMANDER UN DEVIS <ArrowRight size={15} />
            </Link>
            <Link to="/realisations" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 26px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 9,
              border: '1px solid rgba(255,255,255,0.22)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.1)'; }}
            >
              DÉCOUVRIR NOS RÉALISATIONS
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Image dots */}
      <div style={{
        position: 'absolute', bottom: 42, left: '6vw',
        display: 'flex', gap: 8,
      }}>
        {heroImages.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 28 : 8,
            height: 2,
            borderRadius: 2,
            background: i === current ? GOLD : 'rgba(255,255,255,0.35)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.4s ease',
            padding: 0,
          }} />
        ))}
        </div>
      <div
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
        style={{
          position: 'absolute',
          bottom: 32,
          right: '6vw',
          cursor: 'pointer',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}
        >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', writingMode: 'vertical-lr' }}>
          Défiler
        </span>
        <motion.div
            animate={{ rotate: 0 }}
          >
            <ArrowDown size={16} color="rgba(255,255,255,0.5)" />
          </motion.div>

          </motion.div>
          </div>
    </section>
  );
}
