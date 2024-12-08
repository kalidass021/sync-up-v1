import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useSignoutMutation } from '../../redux/api/authApiSlice';
import { signout } from '../../redux/slices/auth/authSlice';
import { Button } from '@/components/ui/button';
import logo from '../../assets/images/logo.svg';
import logout from '../../assets/icons/logout.svg';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
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
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <img src={logo} alt='logo' width={130} height={325} />
        </Link>
        <div className='flex gap-4'>
          <Button
            variant='ghost'
            className='shad-button-ghost'
            onClick={signoutHandler}
          >
            <img src={logout} alt='logout' />
          </Button>
          <Link to={`/profile/${userInfo._id}`} className='flex-center gap-3'>
            <img
              src={userInfo.profileImg || profilePlaceholder}
              alt='profile'
              className='h-8 w-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
