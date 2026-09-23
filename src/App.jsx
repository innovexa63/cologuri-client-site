import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navbar from './components/user/Navbar';
import HeroSection from './components/user/HeroSection';
import LiveJointTours from './components/user/LiveJointTours';
import TourGroupsMarquee from './components/user/TourGroupsMarquee';
import DestinationsGrid from './components/user/DestinationsGrid';
import HowItWorks from './components/user/HowItWorks';
import CustomTourBand from './components/user/CustomTourBand';
import StatsSection from './components/user/StatsSection';
import Testimonials from './components/user/Testimonials';
import BlogSection from './components/user/BlogSection';
import Footer from './components/user/Footer';
import SearchResultsPage from './components/user/SearchResultsPage';
import TourDetailsPage from './components/user/TourDetailsPage';
import { useStore } from './store/useStore';

// User Portal Wrapper with persistent Navbar and Footer
function UserPortal({ children, isSearchPage = false }) {
  const { role, setRole } = useStore();
  const navigate = useNavigate();

  const handleBackToHome = (sectionId) => {
    navigate('/');
    if (sectionId && sectionId.startsWith('#')) {
      setTimeout(() => {
        const el = document.getElementById(sectionId.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'groupAdmin' || newRole === 'superAdmin') {
      const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
      window.open(adminUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-on-surface)' }}>
      <Navbar
        currentRole={role}
        onRoleChange={handleRoleChange}
        onNavigateHome={handleBackToHome}
        isSearchPage={isSearchPage}
      />
      {children}
      <Footer />
    </div>
  );
}

// Home Page
function HomePage() {
  const navigate = useNavigate();
  const setSearchQuery = useStore((state) => state.setSearchQuery);

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/search?dest=${encodeURIComponent(query.destination)}&date=${encodeURIComponent(query.date)}&guests=${encodeURIComponent(query.guests)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTour = (tourId) => {
    navigate(`/tours/${tourId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <UserPortal isSearchPage={false}>
      <main id="main-content" className="w-full">
        <HeroSection onSearch={handleSearch} />
        <LiveJointTours onSelectTour={handleSelectTour} />
        <TourGroupsMarquee />
        <DestinationsGrid />
        <HowItWorks />
        <CustomTourBand />
        <StatsSection />
        <Testimonials />
        <BlogSection />
      </main>
    </UserPortal>
  );
}

// Search Results Route
function SearchRoute() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const storedQuery = useStore((state) => state.searchQuery);

  const initialQuery = {
    destination: searchParams.get('dest') || storedQuery.destination || 'sajek',
    date: searchParams.get('date') || storedQuery.date || '2026-10-28',
    guests: searchParams.get('guests') || storedQuery.guests || '2',
  };

  return (
    <UserPortal isSearchPage={true}>
      <SearchResultsPage
        initialQuery={initialQuery}
        onBackToHome={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectTour={(id) => {
          navigate(`/tours/${id}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </UserPortal>
  );
}

// Tour Details Route
function TourDetailsRoute() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <UserPortal isSearchPage={true}>
      <TourDetailsPage
        tourId={id || 'sajek-1'}
        onBack={() => {
          if (window.history.length > 2) {
            navigate(-1);
          } else {
            navigate('/');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => {
          navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </UserPortal>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchRoute />} />
        <Route path="/tours/:id" element={<TourDetailsRoute />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
