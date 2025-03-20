import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { useGetCurrentUserProfileQuery } from '../../redux/api/authApiSlice';
import { useUpdateUserProfileMutation } from '../../redux/api/userApiSlice';
import ProfileUploader from '../../components/user/ProfileUploader';
import Loader from '../../components/shared/Loader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CLOUDINARY_URL } from '../../config/constants';
import { validateUpdateProfileForm } from '../../utils/form/formValidation';
import getUpdatedValues from '../../utils/form/getUpdatedValues';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { editIcon } from '../../assets/icons';
import { useEffect } from 'react';

const EditProfile = () => {
  // const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: currentUser, isLoading: userLoading } =
    useGetCurrentUserProfileQuery();

  const [updateUserProfile, { isLoading: updatingUserProfile }] =
    useUpdateUserProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      profileImg: '',
      fullName: '',
      username: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  // set default values after current user data fetched
  useEffect(() => {
    if (currentUser) {
      reset({
        fullName: currentUser?.fullName,
        username: currentUser?.username,
        email: currentUser?.email,
        bio: currentUser?.bio,
      });
    }
  }, [currentUser, reset]);

  if (!currentUser || userLoading) {
    return <Loader />;
  }

  const handleFileChange = async (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]); // read file as a base64 string
    reader.onload = () => {
      setValue('profileImg', reader.result); // set image as a base64 string
    };

    // handle error
    reader.onerror = (err) => {
      console.error(`Error reading file ${err}`);
      toast.error(`Error reading file ${err}`);
    };
  };

  // handle the form submission
  const handleUpdate = async (updatedUserData) => {
    // get the data from updated fields
    const updatedValues = getUpdatedValues(currentUser, updatedUserData);

    if (!validateUpdateProfileForm(updatedValues, setError)) {
      return;
    }

    // update user data

    try {
      const res = await updateUserProfile({
        username: currentUser.username,
        updatedUser: { ...updatedValues },
      }).unwrap();
      // dispatch the updated user data to the store in local storage
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(`/${currentUser.username}/profile`);
      toast.success('Profile updated successfully');
    } catch (err) {
      console.error(`Error while updating the user profile ${err}`);
      toast.error(err?.data?.message || err.error || 'Failed to update');
    }
  };

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl ml-[10%]'>
          <img
            src={editIcon}
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
            onSubmit={handleSubmit(handleUpdate)}
            className='flex flex-col gap-7 w-full mt-4 max-w-5xl'
          >
            {/* profile image */}
            <div className='flex'>
              <ProfileUploader
                fieldChange={handleFileChange}
                mediaUrl={
                  currentUser?.profileImgId &&
                  `${CLOUDINARY_URL}/${currentUser?.profileImgId}`
                }
                // register happened in handleFileChange using setValue
              />
            </div>
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
              <span className='shad-form-message'>
                {errors?.fullName?.message}
              </span>
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
              <span className='shad-form-message'>
                {errors?.username?.message}
              </span>
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
              <span className='shad-form-message'>
                {errors?.email?.message}
              </span>
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
              <span className='shad-form-message'>{errors?.bio?.message}</span>
            </div>
            {/* current password */}
            <div>
              <label className='shad-form-label'>Current Password</label>
              <Input
                type='password'
                className='shad-input mt-2'
                {...register('currentPassword')}
              />
              <span className='shad-form-message'>
                {errors?.currentPassword?.message}
              </span>
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
                <span className='shad-form-message'>
                  {errors?.newPassword?.message}
                </span>
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
                <span className='shad-form-message'>
                  {errors?.confirmNewPassword?.message}
                </span>
              </div>
            </div>
            {/* button */}
            <div className='flex gap-4 items-center justify-end'>
              <Button
                type='button'
                className='shad-button-dark-4'
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='shad-button-primary whitespace-nowrap'
                disabled={updatingUserProfile}
              >
                {updatingUserProfile ? (
                  <>
                    <Loader /> Updating
                  </>
                ) : (
                  'Update Profile'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
