import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './index.css';

const App = () => {
  return (
    <>
      <Toaster position='top-right' reverseOrder={false} />
      <main className='flex h-screen'>
        <Outlet />
      </main>
    </>
  );
};

export default App;
