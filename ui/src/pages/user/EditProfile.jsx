import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGetCurrentUserProfileQuery } from '../../redux/api/authApiSlice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import edit from '../../assets/icons/edit.svg';

const EditProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl ml-[10%]'>
          <img
            src={edit}
            width={36}
            height={36}
            alt='edit'
            className='invert-white'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
        </div>
        {/* form */}
        <div className='w-[90%]'>
          <form
            // onSubmit={}
            className='flex flex-col gap-7 w-full mt-4 max-w-5xl'
          >
            {/* profile image */}
            {/* fullName */}
            <div>
              <label className='shad-form-label'>Full Name</label>
              <Input
                type='text'
                className='shad-input mt-2'
                {...register('fullName', {
                  minLength: {
                    value: 6,
                    message: 'FullName must be at least 6 characters',
                  },
                })}
              />
              {errors.fullName && (
                <span className='shad-form-message'>
                  {errors.fullName.message}
                </span>
              )}
            </div>
            {/* username */}
            <div>
              <label className='shad-form-label'>Username</label>
              <Input
                type='text'
                className='shad-input mt-2'
                {...register('username', {
                  minLength: {
                    value: 6,
                    message: 'Username must be at least 6 characters',
                  },
                })}
              />
              {errors.username && (
                <span className='shad-form-message'>
                  {errors.username.message}
                </span>
              )}
            </div>
            {/* email */}
            <div>
              <label className='shad-form-label'>Email</label>
              <Input
                type='email'
                className='shad-input mt-2'
                {...register('email', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
                })}
              />
              {errors.email && (
                <span className='shad-form-messge'>{errors.email.message}</span>
              )}
            </div>
            {/* bio */}
            <div>
              <label className='shad-form-label'>Bio</label>
              <Textarea
                className='shad-textarea custom-scrollbar mt-2'
                {...register('bio', {
                  minLength: {
                    value: 6,
                    message: 'Bio must be at least 6 characters',
                  },
                })}
              />
              {errors.email && (
                <span className='shad-form-message'>{errors.bio.message}</span>
              )}
            </div>
            {/* current password */}
            <div>
              <label className='shad-form-label'>Current Password</label>
              <Input
                type='password'
                className='shad-input mt-2'
                {...register('currentPassword')}
              />
            </div>
            {/* new password */}
            <div className='flex gap-4'>
              {/* password */}
              <div className='w-[50%]'>
                <label className='shad-form-label'>New Password</label>
                <Input
                  type='password'
                  className='shad-input'
                  {...register('newPassword', {
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                />
                {errors.newPassword && (
                  <span className='shad-form-message'>
                    {errors.newPassword.message}
                  </span>
                )}
              </div>
              {/* confirm password */}
              <div className='w-[50%]'>
                <label className='shad-form-label'>Confirm New Password</label>
                <Input
                  type='password'
                  className='shad-input'
                  {...register('confirmNewPassword', {
                    minLength: 8,
                    message: 'Password must be at least  8 characters',
                  })}
                />
                {errors.confirmNewPassword && (
                  <span className='shad-form-message'>
                    {errors.confirmNewPassword.message}
                  </span>
                )}
              </div>
            </div>
            {/* button */}
            <div className='flex gap-4 items-center justify-end'>
              <Button
                type='button'
                className='shad-button-dark-4 onClick={() => navigate(-1)}'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='shad-button-primary whitespace-nowrap'
                // disabled={}
              >
                {/* todo: add is loading */}
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
