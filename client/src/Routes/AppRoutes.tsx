import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import AlloyShell from '../AlloyPortal/Shell';
import DashboardPage from '../AlloyPortal/Pages/DashboardPage';
import LibraryPage from '../AlloyPortal/Pages/LibraryPage';
import PlaybookPage from '../AlloyPortal/Pages/PlaybookPage';
import ProjectsPage from '../AlloyPortal/Pages/ProjectsPage';
import RecognitionPage from '../AlloyPortal/Pages/RecognitionPage';
import RoiPage from '../AlloyPortal/Pages/RoiPage';
import TicketsPage from '../AlloyPortal/Pages/TicketsPage';
import { AuthProvider } from '../Contexts/AuthProvider';
import LegacyDashboardPage from '../Pages/DashboardPage/DashboardPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import SignupPage from '../Pages/SignupPage/SignupPage';
import ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <LegacyDashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '/portal',
    element: <AlloyShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'roi', element: <RoiPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'tickets', element: <TicketsPage /> },
      { path: 'playbook', element: <PlaybookPage /> },
      { path: 'library', element: <LibraryPage /> },
      { path: 'rewards', element: <RecognitionPage /> },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
