import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS } from '../styles/tokens';

const GOLD = COLORS.gold;
const GOLD_HOVER = COLORS.goldHover;

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#0d0d0d' : '#111111';
  const border = 'rgba(255,255,255,0.06)';

  return (
    <footer style={{ background: bg, color: '#fff' }}>
      {/* Gold accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

      <div className="max-w-7xl mx-auto px-6" style={{ paddingTop: 48, paddingBottom: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr', gap: 48 }} className="grid-footer">
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: '#fff',
              marginBottom: 6,
            }}>
              BATI RÉNOV
            </div>
            <div style={{ height: 2, width: 60, background: `linear-gradient(90deg, ${GOLD}, transparent)`, marginBottom: 18 }} />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.48)',
              lineHeight: 1.7,
              maxWidth: 260,
            }}>
              Entreprise générale du bâtiment à Avion. Maçonnerie, carrelage, électricité, isolation et rénovation générale. Plus de 30 ans d'expérience, entreprise certifiée RGE.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[Instagram, ExternalLink].map((Icon, i) => (
                <button key={i} style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.06)',
                  border: `1px solid ${border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(216,155,43,0.18)'; (e.currentTarget as HTMLElement).style.borderColor = GOLD; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = border; }}
                >
                  <Icon size={15} color="rgba(255,255,255,0.6)" />
                </button>
              ))}
            </div>
          </div>

          {/* Métiers */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: 18 }}>
              Nos Métiers
            </div>
            {['Intérieur', 'Extérieur', 'Immeuble'].map(label => (
              <FooterLink key={label} to={`/metiers/${label.toLowerCase().replace('é', 'e').replace('î', 'i')}`} label={label} />
            ))}
          </div>

          {/* Prestations */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: 18 }}>
              Prestations
            </div>
            {['Plomberie', 'Électricité', 'Peinture', 'Maçonnerie', 'Cuisine', 'Salle de Bain'].map(label => (
              <FooterLink key={label} to={`/prestations/${label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ /g, '-')}`} label={label} />
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: GOLD, marginBottom: 18 }}>
              Contact
            </div>
            {[
              { icon: MapPin, text: '36 Boulevard Gabriel Péri\n62210 Avion' },
              { icon: Phone, text: '09 83 88 52 07' },
              { icon: Phone, text: '06 11 93 54 43' },
              { icon: Mail, text: 'entrepriserenove62@gmail.com' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                <Icon size={14} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{text}</span>
              </div>
            ))}
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6, marginTop: 2 }}>
              SIRET : 931248769
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>
              RCS Arras
            </div>
            <Link to="/contact" style={{
              display: 'inline-block',
              marginTop: 8,
              padding: '10px 18px',
              background: GOLD,
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 7,
              fontFamily: "'Inter', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.05em',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = GOLD_HOVER}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = GOLD}
            >
              Demander un devis
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 40,
          paddingTop: 18,
          borderTop: `1px solid ${border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
            © 2026 BATI RÉNOV. Tous droits réservés.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Mentions légales', 'Politique de confidentialité'].map(label => (
              <span key={label} style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .grid-footer { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 600px) {
          .grid-footer { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} style={{
      display: 'block',
      marginBottom: 10,
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      color: 'rgba(255,255,255,0.48)',
      textDecoration: 'none',
      transition: 'color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.color = GOLD)}
      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.48)')}
    >
      {label}
    </Link>
  );
}
