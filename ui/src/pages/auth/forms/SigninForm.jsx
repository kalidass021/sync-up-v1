import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import logo from '../../../assets/images/logo.svg';
import Loader from '../../../components/shared/Loader';
import { useSigninMutation } from '../../../redux/api/authApiSlice';
import { setCredentials } from '../../../redux/slices/auth/authSlice';

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signin, { isLoading }] = useSigninMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  // search parameter
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const formSubmit = async (userObj) => {
    const { email, password } = userObj;

    try {
      const res = await signin({ email, password }).unwrap();
      console.log('res', res);
      dispatch(setCredentials({ ...res }));
      reset(); // reset the form after successful signin
      navigate('/');
    } catch (err) {
      console.error(
        `Error while submitting the signin form ${
          err?.data?.message || err?.error
        }`
      );
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className='sm:w-420 flex-center flex-col '>
      <img src={logo} alt='logo' />
      <h2 className='h3-bold md:h2-bold pt-5 sm:pt-15'>Create a new account</h2>
      <p className='text-light-3 small-medium md:base-regular mt-8'>
        To sync up, please enter your details
      </p>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className='flex flex-col gap-5 w-full mt-4'
      >
        {/* Email */}
        <div>
          <label className='shad-form-label'>Email</label>
          <Input
            type='email'
            placeholder='Enter Email'
            className='text-black'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email',
              },
            })}
          />
          {errors.email && (
            <span className='shad-form-message'>{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className='shad-form-label'>Password</label>
          <Input
            type='password'
            placeholder='Enter Password'
            className='text-black'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          {errors.password && (
            <span className='shad-form-message'>{errors.password.message}</span>
          )}
        </div>

        <Button type='submit' className='shad-button-primary'>
          {isLoading ? (
            <div className='flex-center gap-2'>
              <Loader /> Signing in...
            </div>
          ) : (
            'Sign in'
          )}
        </Button>
        <p className='text-small-regular text-light-2 text-center mt-2'>
          Don&apos;t have an account?{' '}
          <Link
            to={redirect ? `/signup?redirect=${redirect}` : '/signup'}
            className='text-primary-500 text-small-semibold ml-1'
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SigninForm;
