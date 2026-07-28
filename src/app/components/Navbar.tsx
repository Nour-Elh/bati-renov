import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sofa, TreePine, Building2, Droplets, Zap, Paintbrush,
  Hammer, ChefHat, Bath, Building, House, ChevronDown, Menu, X,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS } from '../styles/tokens';

const GOLD = COLORS.gold;
const GOLD_HOVER = COLORS.goldHover;

const metiersItems = [
  { icon: Sofa, title: 'Intérieur', subtitle: 'Rénovation complète d\'appartements et maisons', href: '/metiers/interieur' },
  { icon: TreePine, title: 'Extérieur', subtitle: 'Ravalement, toitures et espaces extérieurs', href: '/metiers/exterieur' },
  { icon: Building2, title: 'Immeuble', subtitle: 'Copropriétés et parties communes', href: '/metiers/immeuble' },
];

const prestationsItems = [
  { icon: Droplets, title: 'Plomberie', subtitle: 'Installation et rénovation', href: '/prestations/plomberie' },
  { icon: Zap, title: 'Électricité', subtitle: 'Mise aux normes et installation', href: '/prestations/electricite' },
  { icon: Paintbrush, title: 'Peinture', subtitle: 'Finitions haut de gamme', href: '/prestations/peinture' },
  { icon: Hammer, title: 'Maçonnerie', subtitle: 'Gros œuvre et structure', href: '/prestations/maconnerie' },
  { icon: ChefHat, title: 'Cuisine', subtitle: 'Cuisines sur mesure', href: '/prestations/cuisine' },
  { icon: Bath, title: 'Salle de Bain', subtitle: 'Salles de bain d\'exception', href: '/prestations/salle-de-bain' },
  { icon: Building, title: 'Appartement', subtitle: 'Rénovation intégrale', href: '/prestations/appartement' },
  { icon: House, title: 'Maison', subtitle: 'Projets maisons individuelles', href: '/prestations/maison' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [location]);

  const open = (name: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveDropdown(name);
  };
  const close = () => { timerRef.current = setTimeout(() => setActiveDropdown(null), 120); };
  const keep = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  const navLinkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: isDark ? 'rgba(255,255,255,0.82)' : 'rgba(17,17,17,0.72)',
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: 6,
    transition: 'color 0.25s ease, transform 0.25s ease',
    display: 'block',
    whiteSpace: 'nowrap' as const,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  const dropdownStyle = {
    background: isDark ? 'rgba(18,18,18,0.94)' : 'rgba(255,255,255,0.94)',
    backdropFilter: 'blur(28px)',
    WebkitBackdropFilter: 'blur(28px)',
    borderRadius: 16,
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
    boxShadow: '0 30px 80px rgba(0,0,0,0.22), 0 8px 24px rgba(0,0,0,0.12)',
    padding: 10,
    position: 'absolute' as const,
    top: 'calc(100% + 12px)',
    zIndex: 200,
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 70,
        background: scrolled
          ? (isDark ? 'rgba(17,17,17,0.94)' : 'rgba(247,244,239,0.94)')
          : (isDark ? 'rgba(17,17,17,0.3)' : 'rgba(247,244,239,0.3)'),
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderBottom: scrolled
          ? `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
          : 'none',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.07)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 21,
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: isDark ? '#ffffff' : '#111111',
              lineHeight: 1,
            }}>
              BATI RÉNOV
            </div>
            <div style={{
              height: 2,
              width: 72,
              background: `linear-gradient(90deg, ${GOLD} 0%, transparent 100%)`,
              marginTop: 5,
            }} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center" style={{ gap: 2 }}>
          {/* Accueil */}
          <Link to="/" style={navLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(17,17,17,0.72)')}
          >
            Accueil
          </Link>

          {/* Nos métiers */}
          <div className="relative" onMouseEnter={() => open('metiers')} onMouseLeave={close}>
            <button
              style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: 5 }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(17,17,17,0.72)')}
            >
              Nos métiers
              <ChevronDown size={13} style={{ transition: 'transform 0.3s', transform: activeDropdown === 'metiers' ? 'rotate(180deg)' : 'none' }} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'metiers' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: EASINGS.menu }}
                  onMouseEnter={keep} onMouseLeave={close}
                  style={{ ...dropdownStyle, left: '50%', transform: 'translateX(-50%)', width: 320 }}
                >
                  {metiersItems.map(item => (
                    <DropdownItem key={item.href} item={item} isDark={isDark} onClick={() => setActiveDropdown(null)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Nos prestations */}
          <div className="relative" onMouseEnter={() => open('prestations')} onMouseLeave={close}>
            <button
              style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: 5 }}
              onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
              onMouseLeave={e => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(17,17,17,0.72)')}
            >
              Nos prestations de rénovation
              <ChevronDown size={13} style={{ transition: 'transform 0.3s', transform: activeDropdown === 'prestations' ? 'rotate(180deg)' : 'none' }} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'prestations' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.22, ease: EASINGS.menu }}
                  onMouseEnter={keep} onMouseLeave={close}
                  style={{ ...dropdownStyle, left: '50%', transform: 'translateX(-60%)', width: 440 }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    {prestationsItems.map(item => (
                      <DropdownItem key={item.href} item={item} isDark={isDark} compact onClick={() => setActiveDropdown(null)} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/realisations" style={navLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(17,17,17,0.72)')}
          >
            Nos réalisations
          </Link>

          <Link to="/contact" style={navLinkStyle}
            onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.color = isDark ? 'rgba(255,255,255,0.82)' : 'rgba(17,17,17,0.72)')}
          >
            Contact & Devis
          </Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden lg:inline-block"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '10px 20px',
              background: GOLD,
              color: '#ffffff',
              borderRadius: 8,
              transition: 'all 0.25s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            Estimation privée
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#fff' : '#111', padding: 6 }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASINGS.menu }}
            style={{
              background: isDark ? 'rgba(17,17,17,0.98)' : 'rgba(247,244,239,0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 24px 24px' }}>
              <Link to="/" style={{
                display: 'block',
                padding: '10px 0',
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                color: isDark ? 'rgba(255,255,255,0.9)' : '#111',
                textDecoration: 'none',
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              }}>
                Accueil
              </Link>

              <div style={{ marginTop: 12 }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: GOLD,
                  marginBottom: 6,
                }}>
                  Nos métiers
                </div>
                {metiersItems.map(i => (
                  <Link key={i.href} to={i.href} style={{
                    display: 'block',
                    padding: '8px 0',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: isDark ? 'rgba(255,255,255,0.78)' : '#111',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  }}>
                    {i.title}
                  </Link>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: GOLD,
                  marginBottom: 6,
                }}>
                  Nos prestations
                </div>
                {prestationsItems.map(i => (
                  <Link key={i.href} to={i.href} style={{
                    display: 'block',
                    padding: '8px 0',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: isDark ? 'rgba(255,255,255,0.78)' : '#111',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  }}>
                    {i.title}
                  </Link>
                ))}
              </div>

              {[
                { to: '/realisations', label: 'Nos réalisations' },
                { to: '/contact', label: 'Contact & Devis' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={{
                  display: 'block',
                  padding: '10px 0',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: isDark ? 'rgba(255,255,255,0.9)' : '#111',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                }}>
                  {label}
                </Link>
              ))}
              <Link to="/contact" style={{
                display: 'block',
                marginTop: 16,
                padding: '12px',
                background: GOLD,
                color: '#fff',
                textDecoration: 'none',
                textAlign: 'center',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 14,
                fontWeight: 600,
              }}>
                Estimation privée
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function DropdownItem({
  item, isDark, compact = false, onClick,
}: {
  item: { icon: React.ElementType; title: string; subtitle: string; href: string };
  isDark: boolean;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      to={item.href}
      onClick={onClick}
      style={{ textDecoration: 'none', display: 'block', borderRadius: 12 }}
    >
      <motion.div
        whileHover={{
          y: -2,
          backgroundColor: isDark ? 'rgba(216,155,43,0.1)' : 'rgba(216,155,43,0.08)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
        }}
        transition={{ duration: 0.2, ease: EASINGS.softOut }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 11,
          padding: compact ? '10px 12px' : '12px 14px',
          borderRadius: 12,
          backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(17,17,17,0.02)',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.04 }}
          style={{
            width: compact ? 34 : 38,
            height: compact ? 34 : 38,
            borderRadius: 9,
            background: 'rgba(216,155,43,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.2s',
          }}
        >
          <item.icon size={compact ? 15 : 17} color={GOLD} />
        </motion.div>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: compact ? 13 : 15,
            fontWeight: 600,
            color: isDark ? '#fff' : '#111',
            lineHeight: 1.3,
          }}>{item.title}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            color: isDark ? 'rgba(255,255,255,0.55)' : '#6d6d6d',
            marginTop: 2,
            lineHeight: 1.4,
          }}>{item.subtitle}</div>
        </div>
      </motion.div>
    </Link>
  );
}
