import { useState } from 'react';
import { MessageCircle, Sun, Moon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { COLORS, EASINGS } from '../styles/tokens';

const GOLD = COLORS.gold;

export function FloatingElements() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [chatOpen, setChatOpen] = useState(false);

  const glassStyle = {
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    background: isDark ? 'rgba(28,28,28,0.9)' : 'rgba(255,255,255,0.9)',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
  };

  return (
    <>
      {/* Chat bubble */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                ...glassStyle,
                borderRadius: 18,
                padding: 20,
                width: 270,
                marginBottom: 4,
              }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 15,
                fontWeight: 600,
                color: isDark ? '#fff' : '#111',
                marginBottom: 6,
              }}>
                Bonjour 👋
              </div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: isDark ? 'rgba(255,255,255,0.6)' : '#5f5f5f',
                lineHeight: 1.6,
                margin: 0,
                marginBottom: 14,
              }}>
                Notre équipe est disponible pour répondre à toutes vos questions sur votre projet de rénovation.
              </p>
              <Link to="/contact" onClick={() => setChatOpen(false)} style={{
                display: 'block',
                padding: '9px 16px',
                background: GOLD,
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 8,
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                textAlign: 'center',
              }}>
                Nous contacter
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          whileHover={{ scale: 1.06, boxShadow: '0 10px 30px rgba(216,155,43,0.45)' }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.2, ease: EASINGS.softOut }}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: GOLD,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(216,155,43,0.4)',
            position: 'relative',
          }}
        >
          {chatOpen ? <X size={20} color="#fff" /> : <MessageCircle size={20} color="#fff" />}
          {!chatOpen && (
            <span style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              border: `2px solid ${GOLD}`,
              animation: 'chatPulse 2s ease-out infinite',
              opacity: 0.5,
            }} />
          )}
        </motion.button>
      </div>

      {/* Theme toggle */}
      <div style={{ position: 'fixed', bottom: 28, left: 28, zIndex: 100 }}>
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2, ease: EASINGS.softOut }}
          style={{
            ...glassStyle,
            width: 38,
            height: 38,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          {isDark
            ? <Sun size={15} color={GOLD} />
            : <Moon size={15} color="#5f5f5f" />}
        </motion.button>
      </div>

      <style>{`
        @keyframes chatPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.7); opacity: 0; }
        }
      `}</style>
    </>
  );
}
