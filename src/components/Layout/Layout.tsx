import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', background: '#ffffff' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
