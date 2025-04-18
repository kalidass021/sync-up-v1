import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from '../../../components/shared/Logo';
import Loader from '../../../components/shared/Loader';
import { useSignupMutation } from '../../../redux/api/authApiSlice';
import { validateSignupForm } from '../../../utils/form/formValidation';
import { setCredentials } from '../../../redux/features/auth/authSlice';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signup, { isLoading }] = useSignupMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  // search parameter
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    userInfo && navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const formSubmit = async (userData) => {
    const { fullName, username, email, password } = userData;

    if (!validateSignupForm(userData, setError)) {
      return;
    }

    try {
      const res = await signup({
        fullName,
        username,
        email,
        password,
      }).unwrap();
      // console.log('res', res);
      dispatch(setCredentials({ ...res }));
      reset(); // reset the form after successful signup
      navigate(redirect);
      toast.success('User signed up successfully');
    } catch (err) {
      console.error(
        `Error while submitting the signup form ${
          err?.data?.message || err?.error
        }`
      );
      return toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <div className='sm:w-420 flex-center flex-col '>
      <Logo />
      <h2 className='h3-bold md:h2-bold pt-5 sm:pt-15'>Create a new account</h2>
      <p className='text-light-3 small-medium md:base-regular mt-8'>
        To sync up, please enter your details
      </p>

      <form
        onSubmit={handleSubmit(formSubmit)}
        className='flex flex-col gap-5 w-full mt-4'
      >
        {/* Name */}
        <div>
          <label className='shad-form-label'>Full Name</label>
          <Input
            type='text'
            placeholder='Enter Full Name'
            className='text-black'
            {...register('fullName', {
              required: 'Name is required',
              minLength: {
                value: 6,
                message: 'Name must be at least 6 characters',
              },
            })}
          />
          <span className='shad-form-message'>{errors?.fullName?.message}</span>
        </div>
        {/* Username */}
        <div>
          <label className='shad-form-label'>Username</label>
          <Input
            type='text'
            placeholder='Enter Username'
            className='text-black'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username must be at least 6 characters',
              },
            })}
          />
          <span className='shad-form-message'>{errors?.username?.message}</span>
        </div>
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
          <span className='shad-form-message'>{errors?.email?.message}</span>
        </div>

        <div className='flex justify-evenly gap-2'>
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
            <span className='shad-form-message'>
              {errors?.password?.message}
            </span>
          </div>
          {/* Confirm Password */}
          <div>
            <label className='shad-form-label'>Confirm Password</label>
            <Input
              type='password'
              placeholder='Confirm Password'
              className='text-black'
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
              })}
            />
              <span className='shad-form-message'>
                {errors?.confirmPassword?.message}
              </span>
          </div>
        </div>
        <Button type='submit' className='shad-button-primary'>
          {isLoading ? (
            <div className='flex-center gap-2'>
              <Loader /> Signing up...
            </div>
          ) : (
            'Sign up'
          )}
        </Button>
        <p className='text-small-regular text-light-2 text-center mt-2'>
          Already have an account?{' '}
          <Link
            to={redirect ? `/signin?redirect=${redirect}` : '/signin'}
            className='text-primary-500 text-small-semibold ml-1'
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
