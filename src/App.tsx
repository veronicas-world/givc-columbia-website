import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteShell } from './components/SiteShell';
import { pastEventsAnchor } from './content/events';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PeoplePage } from './pages/PeoplePage';
import { ResourcesPage } from './pages/ResourcesPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteShell />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="events" element={<Navigate to={{ pathname: '/resources', hash: `#${pastEventsAnchor}` }} replace />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
