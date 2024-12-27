import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css';

const App = () => {
  return (
    <>
      <Toaster position='top-right' expand={true} richColors />
      <main className='flex h-screen'>
        <Outlet />
      </main>
    </>
  );
};

export default App;
