import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  // some old browsers won't support navigator.onLine
  // use navigator.onLine if available, otherwise assume online(true)
  const [onlineStatus, setOnlineStatus] = useState(navigator?.onLine ?? true);

  // check if online
  // add the event listener to the brower
  useEffect(() => {
    // event handlers
    const handleOffline = () => setOnlineStatus(false);
    const handleOnline = () => setOnlineStatus(true);

    // add event listeners to track online/ offline status
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      // cleanup: remove event listeners when the component unmounts
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
