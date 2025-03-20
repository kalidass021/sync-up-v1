import { useEffect, useState } from 'react';

const useOnlineStatus = () => {
  // some old browsers won't support navigator.onLine
  // use navigator.onLine if available, otherwise assume online(true)
  const [onlineStatus, setOnlineStatus] = useState(navigator?.onLine ?? true);

  // check if online
  // add the event listener to the brower
  useEffect(() => {
    // abort controller to handle cleanup efficiently
    const controller = new AbortController();
    const { signal } = controller;
    // event handlers
    const handleOffline = () => setOnlineStatus(false);
    const handleOnline = () => setOnlineStatus(true);

    // add event listeners to track online/ offline status
    window.addEventListener('offline', handleOffline, { signal });
    window.addEventListener('online', handleOnline, { signal });

    return () => {
      // cleanup: abort to remove all the event listeners automatically
      controller.abort();
    };
  }, []);

  return onlineStatus;
};

export default useOnlineStatus;
