import { MemorizedHeader, MemorizedFooter } from '../components';
import { Outlet } from 'react-router-dom';
import { useTitle } from '../hooks';

const Dashboard = () => {
  // Set page title
  useTitle('Home');

  return (
    <div>
      <MemorizedHeader />
      <Outlet />
      <MemorizedFooter />
    </div>
  );
};

export default Dashboard;
