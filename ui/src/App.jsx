import { Outlet } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Outlet />
    </main>
  );
};

export default App;
