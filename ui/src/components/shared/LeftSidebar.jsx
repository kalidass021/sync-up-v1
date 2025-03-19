import { memo } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useSignoutMutation } from '../../redux/api/authApiSlice';
import { signout } from '../../redux/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import sidebarLinks from '../../config/sidebarLinks';
import { CLOUDINARY_URL } from '../../config/constants';
import {logout, profilePlaceholder} from '../assets/icons';

const LeftSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const [signoutApiCall] = useSignoutMutation();

  const signoutHandler = async () => {
    try {
      await signoutApiCall().unwrap();
      dispatch(signout());
      navigate('/signin');
      toast.success('Signed out...');
    } catch (err) {
      console.error(`Error while signout ${err?.data?.message}`);
      toast.error(err?.data?.message);
    }
  };

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-6'>
        <Link to='/' className='flex gap-3 items-center'>
          <Logo />
        </Link>
        <Link
          to={`/${userInfo?.username}/profile`}
          className='flex gap-3 items-center'
        >
          <>
            <img
              src={
                userInfo?.profileImgId
                  ? `${CLOUDINARY_URL}/${userInfo?.profileImgId}`
                  : profilePlaceholder
              }
              alt='profile'
              className='h-12 w-12 rounded-full'
            />
            <div className='flex flex-col '>
              <p className='body-semibold'>{userInfo?.fullName}</p>
              <p className='small-regular italic text-light-3'>
                @{userInfo?.username}
              </p>
            </div>
          </>
        </Link>
        <ul className='flex flex-col gap-1'>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && 'bg-primary-500'
                }`}
              >
                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4'
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && 'invert-white'
                    }`}
                  />
                  <p className='small-regular'>{link.label}</p>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant='ghost'
        className='shad-button-ghost'
        onClick={signoutHandler}
      >
        <img src={logout} alt='logout' />
        <p className='small-regular'>Sign out</p>
      </Button>
    </nav>
  );
};

export default memo(LeftSidebar);
