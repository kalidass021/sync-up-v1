import { Outlet, Navigate } from 'react-router-dom';
import { sideImg } from '../../assets/images';

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section
            className='flex flex-1 justify-center items-center flex-col
          py-10 '
          >
            <Outlet />
          </section>
          <img
            src={sideImg}
            alt='side-image'
            className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
