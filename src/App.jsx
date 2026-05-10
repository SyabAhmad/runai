import { useState, useEffect, useRef, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PookiePage from "./pages/PookiePage";
import PookieCertificatePage from "./pages/PookieCertificatePage";
import TechnologyPage from "./pages/TechnologyPage";
import ChapterPage from "./pages/ChapterPage";
import MissionPage from "./pages/MissionPage";
import ChapterLayout from "./pages/ChapterLayout";
import { useGameStore } from "./store/gameStore";

function RouteLoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingScreen message="Wait bestie wait..." />;
  }

  return (
    <Suspense fallback={<LoadingScreen message="Wait bestie wait..." />}>
      {children}
    </Suspense>
  );
}

function AppContent() {
  return (
    <Routes>
      {/* Public pages */}
      <Route
        path="/"
        element={
          <RouteLoadingWrapper>
            <HomePage />
          </RouteLoadingWrapper>
        }
      />
      <Route
        path="/profile"
        element={
          <RouteLoadingWrapper>
            <ProfilePage />
          </RouteLoadingWrapper>
        }
      />
      <Route
        path="/pookie"
        element={
          <RouteLoadingWrapper>
            <PookiePage />
          </RouteLoadingWrapper>
        }
      />
      <Route
        path="/pookie/certificate"
        element={
          <RouteLoadingWrapper>
            <PookieCertificatePage />
          </RouteLoadingWrapper>
        }
      />

      {/* Technology routes with sidebar */}
      <Route element={<ChapterLayout />}>
        <Route
          path="/:technology"
          element={
            <RouteLoadingWrapper>
              <TechnologyPage />
            </RouteLoadingWrapper>
          }
        />
        <Route
          path="/:technology/:chapter"
          element={
            <RouteLoadingWrapper>
              <ChapterPage />
            </RouteLoadingWrapper>
          }
        />
        <Route
          path="/:technology/:chapter/:mission"
          element={
            <RouteLoadingWrapper>
              <MissionPage />
            </RouteLoadingWrapper>
          }
        />
      </Route>
    </Routes>
  );
}

function App() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useGameStore.persist.rehydrate().then(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return <LoadingScreen message="Loading your progress..." />;
  }

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
