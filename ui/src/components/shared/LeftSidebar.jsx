import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useSignoutMutation } from '../../redux/api/authApiSlice';
import { signout } from '../../redux/slices/auth/authSlice';
import { Button } from '@/components/ui/button';
import sidebarLinks from '../../config/sidebarLinks';
import logo from '../../assets/images/logo.svg';
import logout from '../../assets/icons/logout.svg';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

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

  if (!userInfo) {
    return null;
  }
  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-6'>
        <Link to='/' className='flex gap-3 items-center'>
          <img src={logo} alt='logo' width={170} height={36} />
        </Link>
        <Link
          to={`/profile/${userInfo._id}`}
          className='flex gap-3 items-center'
        >
          <img
            src={userInfo.profileImg || profilePlaceholder}
            alt='profile'
            className='h-14 w-14 rounded-full'
          />
          <div className='flex flex-col '>
            <p className='body-bold '>{userInfo.fullName}</p>
            <p className='small-regular text-light-3'>@{userInfo.username}</p>
          </div>
        </Link>
        <ul className='flex flex-col gap-2'>
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
                  {link.label}
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
        <p className='small-medium lg:base-medium'>Sign out</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
