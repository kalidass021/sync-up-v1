import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Topbar from '../components/shared/Topbar';
import LeftSidebar from '../components/shared/LeftSidebar';
import Bottombar from '../components/shared/Bottombar';

const PageLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return <Navigate to='/signin' replace />
  }

  return (
    <div className='w-full md:flex'>
      <Topbar />
      <LeftSidebar />
      <section className='flex flex-1 h-full'>
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default PageLayout;
