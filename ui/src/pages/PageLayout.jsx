import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Outlet, Navigate } from 'react-router-dom';
import Topbar from '../components/shared/Topbar';
import LeftSidebar from '../components/shared/LeftSidebar';
import Bottombar from '../components/shared/Bottombar';
import { useOnlineStatus, useAuthCheck } from '../hooks';

const PageLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const online = useOnlineStatus();
  const authorized = useAuthCheck();

  // show online toast only when the app transitions from offline to online
  // Ref to track the previous online status
  const prevOnlineStatus = useRef(online);

  const handleOnlineStatusChange = useCallback(() => {
    if (prevOnlineStatus.current !== online) {
      if (!online) {
        toast.error(`You're offline! check your internet connection`);
      } else {
        toast.success(`Connection restored. Let's sync things up!`);
      }

      // update the previous status
      prevOnlineStatus.current = online;
    }
  }, [online]);

  useEffect(() => {
    handleOnlineStatusChange();
  }, [handleOnlineStatusChange]);

  if (!userInfo || !authorized) {
    return <Navigate to='/signin' replace />;
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
