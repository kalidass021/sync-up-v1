import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import {
  useGetCurrentUserProfileQuery,
  useSignoutMutation,
} from '../../redux/api/authApiSlice';
import { signout } from '../../redux/features/auth/authSlice';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { CLOUDINARY_URL } from '../../config/constants';
import logout from '../../assets/icons/logout.svg';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { userInfo } = useSelector((state) => state.auth);
  const { data: userInfo } = useGetCurrentUserProfileQuery();
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
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to='/' className='flex gap-3 items-center'>
          <Logo />
        </Link>
        <div className='flex gap-4'>
          <Button
            variant='ghost'
            className='shad-button-ghost'
            onClick={signoutHandler}
          >
            <img src={logout} alt='logout' />
          </Button>
          <Link
            to={`/${userInfo?.username}/profile`}
            className='flex-center gap-3'
          >
            <img
              src={
                userInfo?.profileImgId
                  ? `${CLOUDINARY_URL}/${userInfo?.profileImgId}`
                  : profilePlaceholder
              }
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
