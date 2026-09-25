import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navbar from './components/user/Navbar';
import HeroSection from './components/user/HeroSection';
import AdvertiseBannerSlider from './components/user/AdvertiseBannerSlider';
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
import LiveToursPage from './pages/LiveToursPage';
import TourGroupsPage from './pages/TourGroupsPage';
import DestinationsPage from './pages/DestinationsPage';

import DestinationDetailsPage from './pages/DestinationDetailsPage';

import HowItWorksPage from './pages/HowItWorksPage';
import CustomTourPage from './pages/CustomTourPage';
import BlogPage from './pages/BlogPage';
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
    const adminUrl = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174';
    if (newRole === 'groupAdmin') {
      window.open(`${adminUrl}/group-admin`, '_blank');
    } else if (newRole === 'superAdmin') {
      window.open(`${adminUrl}/super-admin`, '_blank');
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

// Home Page (Unchanged - keeps all original sections intact)
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
        <AdvertiseBannerSlider onSelectBannerTour={handleSelectTour} />
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
        
        {/* Dedicated Menu Pages */}
        <Route
          path="/live-tours"
          element={
            <UserPortal isSearchPage={false}>
              <LiveToursPage />
            </UserPortal>
          }
        />
        <Route
          path="/tour-groups"
          element={
            <UserPortal isSearchPage={false}>
              <TourGroupsPage />
            </UserPortal>
          }
        />
        <Route
          path="/destinations"
          element={
            <UserPortal isSearchPage={false}>
              <DestinationsPage />
            </UserPortal>
          }
        />
        <Route

          path="/destinations/:id"
          element={
            <UserPortal isSearchPage={true}>
              <DestinationDetailsPage />
            </UserPortal>
          }
        />
        <Route


          path="/how-it-works"
          element={
            <UserPortal isSearchPage={false}>
              <HowItWorksPage />
            </UserPortal>
          }
        />
        <Route
          path="/custom-tour"
          element={
            <UserPortal isSearchPage={false}>
              <CustomTourPage />
            </UserPortal>
          }
        />
        <Route
          path="/blog"
          element={
            <UserPortal isSearchPage={false}>
              <BlogPage />
            </UserPortal>
          }
        />

        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
