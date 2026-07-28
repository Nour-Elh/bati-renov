import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;
const GOLD_HOVER = COLORS.goldHover;

const projectTypes = [
  'Appartement complet', 'Maison complète', 'Cuisine', 'Salle de bain',
  'Extérieur / Façade', 'Immeuble / Copropriété', 'Peinture & Finitions', 'Autre',
];

const budgets = [
  'Moins de 20 000 €', '20 000 – 50 000 €', '50 000 – 100 000 €',
  '100 000 – 200 000 €', 'Plus de 200 000 €', 'Non défini',
];

export function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? '#111111' : '#f7f4ef';
  const cardBg = isDark ? '#1c1c1c' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';
  const inputBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const inputBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)';
  const textColor = isDark ? '#fff' : '#111';
  const mutedColor = isDark ? 'rgba(255,255,255,0.48)' : '#6a6a6a';

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', tel: '', type: '', budget: '', message: '' });

  const inputStyle = {
    width: '100%',
    padding: '13px 16px',
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: 10,
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
    color: textColor,
    outline: 'none',
    transition: 'border-color 0.25s',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Inter', sans-serif",
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    color: isDark ? 'rgba(255,255,255,0.6)' : '#555',
    marginBottom: 8,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '45vh', minHeight: 340, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1756476871898-b0040294197a?w=1920&q=85&auto=format&fit=crop"
          alt="Contact"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.45) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 6vw', paddingTop: 70 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: EASINGS.smooth }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Contact</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 62px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0, marginBottom: 12 }}>
              Parlons de votre projet
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Une consultation privée, confidentielle et sans engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ background: bg }}>
        <div className="max-w-7xl mx-auto contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems: 'start' }}>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASINGS.smooth }}
            style={{
              background: cardBg,
              border: `1px solid ${border}`,
              borderRadius: 22,
              padding: '32px 32px',
              boxShadow: isDark ? '0 18px 50px rgba(0,0,0,0.35)' : '0 18px 50px rgba(0,0,0,0.08)',
            }}
          >
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(216,155,43,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle size={32} color={GOLD} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: textColor, margin: 0, marginBottom: 12 }}>
                  Message envoyé !
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: mutedColor, lineHeight: 1.7, margin: 0 }}>
                  Notre équipe vous contactera dans les 24 heures pour organiser une consultation privée.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 1, background: GOLD }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Estimation privée</span>
                  </div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: textColor, margin: 0 }}>
                    Votre demande de devis
                  </h2>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>Nom complet *</label>
                      <input
                        required type="text" placeholder="Sophie Martin"
                        style={inputStyle}
                        value={form.nom}
                        onChange={e => setForm({ ...form, nom: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = GOLD)}
                        onBlur={e => (e.target.style.borderColor = inputBorder)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        required type="email" placeholder="sophie@exemple.fr"
                        style={inputStyle}
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = GOLD)}
                        onBlur={e => (e.target.style.borderColor = inputBorder)}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Téléphone</label>
                    <input
                      type="tel" placeholder="09 83 88 52 07"
                      style={inputStyle}
                      value={form.tel}
                      onChange={e => setForm({ ...form, tel: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = GOLD)}
                      onBlur={e => (e.target.style.borderColor = inputBorder)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>Type de projet</label>
                      <select
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = GOLD)}
                        onBlur={e => (e.target.style.borderColor = inputBorder)}
                      >
                        <option value="">Sélectionner...</option>
                        {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Budget estimé</label>
                      <select
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        value={form.budget}
                        onChange={e => setForm({ ...form, budget: e.target.value })}
                        onFocus={e => (e.target.style.borderColor = GOLD)}
                        onBlur={e => (e.target.style.borderColor = inputBorder)}
                      >
                        <option value="">Sélectionner...</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>Décrivez votre projet *</label>
                    <textarea
                      required rows={5}
                      placeholder="Parlez-nous de votre espace, de vos besoins et de vos envies..."
                      style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = GOLD)}
                      onBlur={e => (e.target.style.borderColor = inputBorder)}
                    />
                  </div>

                  <button type="submit" style={{
                    width: '100%', padding: '14px 24px',
                    background: GOLD, color: '#fff', border: 'none', borderRadius: 10,
                    fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'all 0.25s',
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    Envoyer ma demande <ArrowRight size={15} />
                  </button>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: mutedColor, textAlign: 'center', marginTop: 12, marginBottom: 0 }}>
                    Consultation confidentielle · Réponse sous 24h
                  </p>
                </form>
              </>
            )}
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, delay: 0.12, ease: EASINGS.smooth }}
          >
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 20, height: 1, background: GOLD }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Nous Contacter</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: textColor, margin: 0, marginBottom: 16 }}>
                Notre équipe à votre écoute
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: mutedColor, lineHeight: 1.7, margin: 0 }}>
                Nous vous proposons une consultation privée et personnalisée pour analyser votre projet et vous présenter nos solutions.
              </p>
            </div>

            {/* Info cards */}
            {[
              { icon: MapPin, label: 'Adresse', content: '36 Boulevard Gabriel Péri\n62210 Avion' },
              { icon: Phone, label: 'Téléphone', content: '09 83 88 52 07\n06 11 93 54 43' },
              { icon: Mail, label: 'Email', content: 'entrepriserenove62@gmail.com' },
              { icon: Clock, label: 'Horaires', content: 'Sur rendez-vous' },
            ].map(({ icon: Icon, label, content }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '16px 20px',
                background: cardBg,
                border: `1px solid ${border}`,
                borderRadius: 14,
                marginBottom: 12,
                boxShadow: isDark ? '0 12px 30px rgba(0,0,0,0.18)' : '0 12px 30px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(216,155,43,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={16} color={GOLD} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: GOLD, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: textColor, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{content}</div>
                </div>
              </div>
            ))}

            {/* Map */}
            <div style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${border}`, marginTop: 20, height: 200, boxShadow: isDark ? '0 18px 40px rgba(0,0,0,0.25)' : '0 18px 40px rgba(0,0,0,0.08)' }}>
              <iframe
                src="https://www.google.com/maps?q=36%20Boulevard%20Gabriel%20Peri%2062210%20Avion&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '100%', border: 'none', filter: isDark ? 'grayscale(0.15) contrast(1.05) brightness(0.92)' : 'none' }}
                title="Localisation à Avion"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
