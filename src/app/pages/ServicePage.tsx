import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { CTASection } from '../components/CTASection';
import { COLORS, EASINGS, VIEWPORT } from '../styles/tokens';

const GOLD = COLORS.gold;
const GOLD_HOVER = COLORS.goldHover;

type ServiceData = {
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  gallery: { img: string; title: string; loc: string }[];
  features: string[];
};

const serviceData: Record<string, ServiceData> = {
  interieur: {
    title: 'Rénovation Intérieure',
    subtitle: 'Maîtrise et élégance au cœur de votre habitat',
    heroImage: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1920&q=85&auto=format&fit=crop',
    description: 'Experts en rénovation intérieure haut de gamme, nos artisans transforment chaque espace en un environnement raffiné et fonctionnel. De la conception à la livraison, nous prenons en charge l\'intégralité de votre projet avec rigueur et passion.',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1592229505801-77b31918d822?w=800&q=85&auto=format&fit=crop', title: 'Salon Haussmannien', loc: 'Paris 8ème' },
      { img: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=800&q=85&auto=format&fit=crop', title: 'Pièce à Vivre', loc: 'Paris 16ème' },
      { img: '/images/isolation-murs-interieurs.jpeg', title: 'Isolation des murs', loc: '' },
      { img: '/images/placo-faux-plafond-isolation.jpeg', title: 'Isolation & Placo', loc: '' },
      { img: '/images/parement-mural-pierre.jpeg', title: 'Parement mural en pierre', loc: '' },
      { img: 'https://images.unsplash.com/photo-1756476871898-b0040294197a?w=800&q=85&auto=format&fit=crop', title: 'Vue Paris', loc: 'Paris 7ème' },
    ],
    features: ['Maîtrise d\'œuvre complète', 'Plans et conception 3D', 'Sélection des matériaux premium', 'Coordination des artisans', 'Suivi chantier personnalisé', 'Garantie décennale'],
  },
  exterieur: {
    title: 'Rénovation Extérieure',
    subtitle: 'Sublimez l\'apparence de votre bien immobilier',
    heroImage: 'https://images.unsplash.com/photo-1657129208507-7005dfc5b36a?w=1920&q=85&auto=format&fit=crop',
    description: 'Spécialistes des travaux en façade, toiture et espaces extérieurs, nous valorisons l\'enveloppe extérieure de votre bien avec des matériaux de qualité et des techniques éprouvées.',
    gallery: [
      ({ img: '/images/facade-briques-renovee.jpeg', title: 'Façade en briques rénovée', description: 'Rénovation de façade en briques avec rejointoiement et remplacement des menuiseries.', loc: '' } as any),
      ({ img: '/images/toiture-fenetre-toit.jpeg', title: 'Toiture rénovée', description: 'Rénovation de toiture avec pose de tuiles et installation d’une fenêtre de toit.', loc: '' } as any),
      ({ img: '/images/renovation-exterieure-maison.jpeg', title: 'Rénovation extérieure', description: 'Rénovation complète des façades et des aménagements extérieurs.', loc: '' } as any),
    ],
    features: ['Ravalement de façades', 'Isolation thermique par l\'extérieur', 'Réfection de toitures', 'Rénovation balcons & terrasses', 'Peinture façade', 'Nettoyage & traitement pierres'],
  },
  immeuble: {
    title: 'Rénovation Immeuble',
    subtitle: 'Gestion complète des copropriétés et parties communes',
    heroImage: 'https://images.unsplash.com/photo-1768288985014-cc88f2e5004d?w=1920&q=85&auto=format&fit=crop',
    description: 'Nous accompagnons syndics de copropriété et bailleurs dans la rénovation de leurs immeubles. De la cage d\'escalier aux sous-sols, nous prenons en charge l\'intégralité des travaux.',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1657129208507-7005dfc5b36a?w=800&q=85&auto=format&fit=crop', title: 'Hall d\'Entrée', loc: 'Paris 16ème' },
      { img: 'https://images.unsplash.com/photo-1768288985014-cc88f2e5004d?w=800&q=85&auto=format&fit=crop', title: 'Façade Immeuble', loc: 'Paris 7ème' },
      { img: 'https://images.unsplash.com/photo-1563182401-14778d716d5a?w=800&q=85&auto=format&fit=crop', title: 'Architecture', loc: 'Paris 8ème' },
    ],
    features: ['Parties communes complètes', 'Hall et cage d\'escalier', 'Toiture et étanchéité', 'Réseaux communs', 'Sous-sol et parkings', 'Coordination syndic'],
  },
  plomberie: {
    title: 'Plomberie & Sanitaires',
    subtitle: 'Installation et rénovation de vos réseaux',
    heroImage: 'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?w=1920&q=85&auto=format&fit=crop',
    description: 'Nos plombiers qualifiés interviennent pour l\'installation, la rénovation et la mise aux normes de tous vos réseaux sanitaires. Qualité des matériaux et respect des délais garantis.',
    gallery: [
      { img: '/images/installation-wc.jpeg', title: 'Installation WC', loc: '' },
      { img: '/images/reseaux-plomberie.jpeg', title: 'Réseaux de plomberie', loc: '' },
      { img: '/images/installation-plomberie.jpeg', title: 'Installation plomberie', loc: '' },
    ],
    features: ['Rénovation complète réseaux', 'Installation sanitaires', 'Douches et baignoires', 'Chauffage & plancher chauffant', 'Chauffe-eau et ballon', 'Mise aux normes'],
  },
  electricite: {
    title: 'Électricité',
    subtitle: 'Mise aux normes, domotique et installations premium',
    heroImage: 'https://images.unsplash.com/photo-1592229505801-77b31918d822?w=1920&q=85&auto=format&fit=crop',
    description: 'Nos électriciens certifiés réalisent l\'intégralité de vos travaux électriques, de la mise aux normes à l\'installation domotique la plus sophistiquée.',
    gallery: [
      { img: '/images/tableau-electrique.jpeg', title: 'Tableau électrique', loc: '' },
      { img: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=800&q=85&auto=format&fit=crop', title: 'Luminaires Premium', loc: 'Paris 8ème' },
      { img: '/images/installation-electrique.jpeg', title: 'Installation électrique', loc: '' },
    ],
    features: ['Mise aux normes NF C 15-100', 'Tableau électrique neuf', 'Domotique & home automation', 'Éclairage design', 'Volets roulants motorisés', 'Bornes de recharge'],
  },
  peinture: {
    title: 'Peinture & Finitions',
    subtitle: 'Des finitions haut de gamme qui font la différence',
    heroImage: 'https://images.unsplash.com/photo-1618832515490-e181c4794a45?w=1920&q=85&auto=format&fit=crop',
    description: 'Nos peintres d\'exception maîtrisent toutes les techniques de finition haut de gamme. Peinture, enduits décoratifs, papiers peints de luxe — chaque surface devient une œuvre.',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=85&auto=format&fit=crop', title: 'Salon Peinture Soie', loc: 'Paris 7ème' },
      { img: 'https://images.unsplash.com/photo-1592229505801-77b31918d822?w=800&q=85&auto=format&fit=crop', title: 'Chambre Enduit', loc: 'Paris 8ème' },
      { img: 'https://images.unsplash.com/photo-1618832515490-e181c4794a45?w=800&q=85&auto=format&fit=crop', title: 'Cuisine Laquée', loc: 'Paris 16ème' },
    ],
    features: ['Peinture haut de gamme', 'Enduits décoratifs', 'Papiers peints de luxe', 'Patines et techniques décoratives', 'Laquage meubles', 'Ravalement intérieur'],
  },
  maconnerie: {
    title: 'Maçonnerie & Gros Œuvre',
    subtitle: 'Structure, solidité et expertise du bâtiment',
    heroImage: 'https://images.unsplash.com/photo-1674649207083-281c2517ab49?w=1920&q=85&auto=format&fit=crop',
    description: 'Du gros œuvre aux travaux de finition, nos maçons qualifiés interviennent sur tous types de structures. Cloisons, ouvertures, chapes — un travail de précision qui garantit la durabilité.',
    gallery: [
      { img: '/maconnerie-exterieure.jpeg', title: 'Maçonnerie extérieure', loc: '' },
      ({ img: '/images/renovation-interieure-placo.jpeg', title: 'Rénovation intérieure', description: 'Travaux de plâtrerie, pose de plaques de plâtre et préparation des finitions.', loc: '' } as any),
      { img: 'https://images.unsplash.com/photo-1618832515490-e181c4794a45?w=800&q=85&auto=format&fit=crop', title: 'Chape & Sol', loc: 'Boulogne' },
    ],
    features: ['Démolition & dépose', 'Ouvertures murs porteurs', 'Cloisons & doublages', 'Chapes & ragréages', 'Carrelage & revêtements', 'Isolation phonique & thermique'],
  },
  cuisine: {
    title: 'Cuisine Sur Mesure',
    subtitle: 'L\'espace cuisine réinventé avec excellence',
    heroImage: 'https://images.unsplash.com/photo-1682888813913-e13f18692019?w=1920&q=85&auto=format&fit=crop',
    description: 'Nous créons des cuisines sur mesure qui allient esthétique et fonctionnalité parfaite. Matériaux nobles, agencement optimisé et électroménager haut de gamme.',
    gallery: [
      ({ img: '/images/cuisine-en-cours-installation.jpeg', title: 'Installation de cuisine', description: 'Pose et installation d’une cuisine moderne avec finitions en cours de réalisation.', loc: '' } as any),
      { img: '/images/installation-cuisine-moderne.jpeg', title: 'Installation de cuisine', loc: '' },
      { img: 'https://images.unsplash.com/photo-1639405069836-f82aa6dcb900?w=800&q=85&auto=format&fit=crop', title: 'Cuisine Contemporaine', loc: 'Paris 8ème' },
      { img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=85&auto=format&fit=crop', title: 'Cuisine Ouverte', loc: 'Paris 6ème' },
    ],
    features: ['Cuisine sur mesure complète', 'Plan de travail marbre & granit', 'Électroménager haut de gamme', 'Agencement optimisé', 'Éclairage intégré', 'Crédences personnalisées'],
  },
  'salle-de-bain': {
    title: 'Salle de Bain',
    subtitle: 'Des espaces bien-être d\'exception',
    heroImage: 'https://images.unsplash.com/photo-1572742482459-e04d6cfdd6f3?w=1920&q=85&auto=format&fit=crop',
    description: 'Nous transformons vos salles de bain en véritables espaces bien-être. Marbre, pierre naturelle, robinetterie de luxe — chaque détail contribue à créer un environnement d\'exception.',
    gallery: [
      { img: '/images/seche-serviettes-salle-de-bain.jpeg', title: 'Sèche-serviettes', loc: '' },
      { img: '/images/carrelage-effet-marbre.jpeg', title: 'Carrelage effet marbre', loc: '' },
      { img: '/images/salle-de-bain-moderne.jpeg', title: 'Double Vasque Premium', loc: '' },
      ({ img: '/images/paroi-douche-verriere.jpeg', title: 'Paroi de douche verrière', description: 'Installation d’une paroi de douche verrière avec carrelage grand format et finitions haut de gamme.', loc: '' } as any),
    ],
    features: ['Douche italienne & baignoire îlot', 'Carrelage grand format & marbre', 'Robinetterie de luxe', 'Meubles vasque sur mesure', 'Miroir rétroéclairé', 'Sol chauffant'],
  },
  appartement: {
    title: 'Rénovation Appartement',
    subtitle: 'La transformation complète de votre bien',
    heroImage: 'https://images.unsplash.com/photo-1592229506151-845940174bb0?w=1920&q=85&auto=format&fit=crop',
    description: 'Rénovation partielle ou complète, nous prenons en charge l\'intégralité de votre appartement. Un chef de projet dédié coordonne tous les corps de métier pour un résultat parfait.',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1592229505801-77b31918d822?w=800&q=85&auto=format&fit=crop', title: 'Appartement 120m²', loc: 'Paris 8ème' },
      { img: 'https://images.unsplash.com/photo-1592229506151-845940174bb0?w=800&q=85&auto=format&fit=crop', title: 'Appartement Vue Paris', loc: 'Paris 16ème' },
      { img: 'https://images.unsplash.com/photo-1668511949286-bee319d2271f?w=800&q=85&auto=format&fit=crop', title: 'Pied-à-Terre', loc: 'Paris 6ème' },
      { img: 'https://images.unsplash.com/photo-1743364971090-a555f8aea2b0?w=800&q=85&auto=format&fit=crop', title: 'Grand Appartement', loc: 'Paris 1er' },
    ],
    features: ['Rénovation clé en main', 'Chef de projet dédié', 'Tous corps de métier', 'Budget maîtrisé', 'Délais respectés', 'Garantie décennale'],
  },
  maison: {
    title: 'Rénovation Maison',
    subtitle: 'Votre maison idéale, réalisée par nos experts',
    heroImage: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=1920&q=85&auto=format&fit=crop',
    description: 'De la rénovation d\'une pièce à la transformation complète de votre maison, nous apportons notre expertise à chaque projet. Extension, surélévation, aménagement des combles — tout est possible.',
    gallery: [
      { img: 'https://images.unsplash.com/photo-1649083048770-82e8ffd80431?w=800&q=85&auto=format&fit=crop', title: 'Maison Familiale', loc: 'Versailles' },
      { img: 'https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?w=800&q=85&auto=format&fit=crop', title: 'Villa Contemporaine', loc: 'Saint-Cloud' },
      { img: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=800&q=85&auto=format&fit=crop', title: 'Maison de Ville', loc: 'Boulogne' },
    ],
    features: ['Rénovation intégrale', 'Extensions et surélévations', 'Aménagement des combles', 'Isolation haute performance', 'Paysagisme et extérieurs', 'Permis de construire'],
  },
};

const fallbackData: ServiceData = {
  title: 'Nos Prestations',
  subtitle: 'Excellence et savoir-faire à votre service',
  heroImage: 'https://images.unsplash.com/photo-1618832515490-e181c4794a45?w=1920&q=85&auto=format&fit=crop',
  description: 'Bati Renov met son expertise au service de votre projet de rénovation. Nos artisans qualifiés interviennent avec rigueur et passion pour transformer vos espaces en environnements d\'exception.',
  gallery: [
    ({ img: '/images/carrelage-effet-bois.jpg', title: 'Carrelage effet bois', description: 'Pose de carrelage imitation parquet avec finitions soignées.', loc: '' } as any),
    ({ img: '/images/isolation-placo.jpeg', title: 'Isolation & Plâtrerie', description: 'Pose de plaques de plâtre avec isolation des murs et préparation des finitions.', loc: '' } as any),
    ({ img: '/images/terrasse-carrelage-exterieur.jpeg', title: 'Terrasse carrelée', description: 'Pose de carrelage grand format pour terrasse extérieure avec finitions soignées.', loc: '' } as any),
  ],
  features: ['Devis gratuit', 'Artisans qualifiés', 'Matériaux premium', 'Garantie décennale', 'Suivi personnalisé', 'Délais respectés'],
};

function GalleryCard({ item }: { item: { img: string; title: string; loc: string } }) {
  const [hv, setHv] = useState(false);
  return (
    <motion.div
      style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}
      onMouseEnter={() => setHv(true)}
      onMouseLeave={() => setHv(false)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: EASINGS.softOut }}
    >
      <motion.img
        src={item.img}
        alt={item.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        animate={{ scale: hv ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: EASINGS.smooth }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hv ? 'linear-gradient(160deg, rgba(0,0,0,0.1), rgba(0,0,0,0.68))' : 'linear-gradient(160deg, transparent 40%, rgba(0,0,0,0.55))',
        transition: 'background 0.4s',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '14px 16px',
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 0 }}>{item.title}</div>
      </div>
    </motion.div>
  );
}

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const data = (slug && serviceData[slug]) ? serviceData[slug] : fallbackData;
  const bg = isDark ? '#111111' : '#f7f4ef';
  const cardBg = isDark ? '#1c1c1c' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', height: '62vh', minHeight: 440, maxHeight: 700, overflow: 'hidden' }}>
        <img src={data.heroImage} alt={data.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(140deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 6vw', paddingTop: 70 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: EASINGS.smooth }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 28, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Bati Renov</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(38px, 5.5vw, 68px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: 0, marginBottom: 14 }}>
              {data.title}
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.6 }}>
              {data.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description + Features */}
      <section className="section" style={{ background: bg }}>
        <div className="max-w-7xl mx-auto sp-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, ease: EASINGS.smooth }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 24, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Notre Expertise</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, color: isDark ? '#fff' : '#111', lineHeight: 1.2, margin: 0, marginBottom: 20 }}>
              Un savoir-faire d'exception à votre service
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: isDark ? 'rgba(255,255,255,0.6)' : '#5f5f5f', lineHeight: 1.75, margin: 0, marginBottom: 26 }}>
              {data.description}
            </p>
            <Link to="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px',
              background: GOLD, color: '#fff', textDecoration: 'none', borderRadius: 8,
              fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD_HOVER; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = GOLD; }}
            >
              Demander un devis <ArrowRight size={14} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.7, delay: 0.12, ease: EASINGS.smooth }}>
            <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 20, padding: '26px 26px' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, color: isDark ? '#fff' : '#111', marginBottom: 20 }}>
                Ce que nous réalisons
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {data.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <CheckCircle size={16} color={GOLD} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: isDark ? 'rgba(255,255,255,0.72)' : '#333' }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-tight" style={{ background: isDark ? '#0d0d0d' : '#111' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT} transition={{ duration: 0.65, ease: EASINGS.smooth }} style={{ marginBottom: 36 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: GOLD }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: GOLD }}>Galerie</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 700, color: '#fff', margin: 0 }}>
              Nos réalisations
            </h2>
          </motion.div>
          <div className="sp-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {data.gallery.map((item, i) => (
              <GalleryCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      <style>{`
        @media (max-width: 780px) {
          .sp-content-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .sp-gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .sp-gallery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
