import { Outlet } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import './index.css';

const App = () => {
  return (
    <>
      <main className='flex h-screen'>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
};

export default App;
