import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProgressPage from './pages/ProgressPage';
import KnowledgePage from './pages/KnowledgePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { useAuthStore } from './store/useAuthStore';
import UpgradePage from './pages/UpgradePage';
import SuccessPage from './pages/SuccessPage';


function ProtectedRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
        {/* 新增支付相关路由 */}
        <Route path="upgrade" element={<UpgradePage />} />
        <Route path="success" element={<SuccessPage />} />
      </Route>
    </Routes>
  );
}

export default App;