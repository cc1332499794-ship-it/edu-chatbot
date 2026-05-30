import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import Button from '../Common/Button';

const Sidebar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const links = [
    { path: '/', label: '🏠 ' + t('welcome') },
    { path: '/chat', label: '💬 ' + t('chat') },
    { path: '/progress', label: '📊 ' + t('progress') },
    { path: '/knowledge', label: '📚 ' + t('knowledge') },
    { path: '/settings', label: '⚙️ ' + t('settings') },
    { path: '/help', label: '❓ ' + t('help') },
  ];

  return (
    <aside style={{ width: 260, background: '#1e1e2f', color: 'white', display: 'flex', flexDirection: 'column', padding: 20 }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24 }}>📘 Учебный бот</div>
      {links.map((link) => (
        <button
          key={link.path}
          onClick={() => navigate(link.path)}
          style={{
            background: location.pathname === link.path ? '#2a2a40' : 'transparent',
            color: 'white',
            border: 'none',
            padding: '10px 12px',
            textAlign: 'left',
            borderRadius: 8,
            cursor: 'pointer',
            marginBottom: 4,
            fontSize: 16,
          }}
        >
          {link.label}
        </button>
      ))}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #2a2a40', paddingTop: 16 }}>
        <div style={{ marginBottom: 8 }}>👤 {user?.name}</div>
        <Button variant="secondary" onClick={logout} style={{ width: '100%' }}>Выйти</Button>
      </div>
    </aside>
  );
};

export default Sidebar;