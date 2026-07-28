import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';
import { ContactPage } from './pages/ContactPage';
import { RealisationsPage } from './pages/RealisationsPage';
import { COLORS } from './styles/tokens';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function ThemedApp() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      background: isDark ? COLORS.darkBg : COLORS.lightBg,
      color: isDark ? '#ffffff' : '#111111',
      transition: 'background 0.4s, color 0.4s',
    }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/metiers/:slug" element={<ServicePage />} />
          <Route path="/prestations/:slug" element={<ServicePage />} />
          <Route path="/realisations" element={<RealisationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingElements />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <ScrollToTop />
          <ThemedApp />
        </BrowserRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
