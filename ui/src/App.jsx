import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';
import { SpeedInsights } from '@vercel/speed-insights/react'; // for monitoring and reporting the performance
import { Analytics } from '@vercel/analytics/react'; // for tracking the user interactions

const App = () => {
  return (
    <>
      <Toaster position='top-right' expand={true} richColors />
      <main className='flex h-screen'>
        <Outlet />
      </main>
      <SpeedInsights />
      <Analytics />
    </>
  );
};

export default App;
