import { Navigate, Route, Routes } from 'react-router-dom';
import OnboardingPage from './features/onboarding/OnboardingPage';
import CreativeLibraryPage from './features/creativeLibrary/CreativeLibraryPage';
import CampaignPage from './features/campaign/CampaignPage';
import { routes } from './routes';

export default function App() {
  return (
    <Routes>
      <Route path={routes.onboarding} element={<OnboardingPage />} />
      <Route path={`${routes.creativeLibrary}/*`} element={<CreativeLibraryPage />} />
      <Route path={routes.campaign} element={<CampaignPage />} />
      <Route path="*" element={<Navigate to={routes.onboarding} replace />} />
    </Routes>
  );
}
