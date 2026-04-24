import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PookiePage from './pages/PookiePage';
import TechnologyPage from './pages/TechnologyPage';
import ChapterPage from './pages/ChapterPage';
import MissionPage from './pages/MissionPage';
import ChapterLayout from './pages/ChapterLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pookie" element={<PookiePage />} />

        {/* Technology routes with sidebar */}
        <Route element={<ChapterLayout />}>
          <Route path="/:technology" element={<TechnologyPage />} />
          <Route path="/:technology/:chapter" element={<ChapterPage />} />
          <Route path="/:technology/:chapter/:mission" element={<MissionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
