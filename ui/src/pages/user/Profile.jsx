import { useParams, useLocation } from 'react-router-dom';
import { useGetCurrentUserProfileQuery } from '../../redux/api/authApiSlice';
import Loader from '../../components/shared/Loader';
import { CLOUDINARY_URL } from '../../config/constants';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

const Profile = () => {
  const { username } = useParams();
  console.log({ username });
  const {
    data: currentUser,
    isLoading: userLoading,
    // error: userError,
  } = useGetCurrentUserProfileQuery(username, { skip: !username });

  if (!currentUser || userLoading) {
    return <Loader />;
  }

  const { profileImgId, fullName } = currentUser;

  console.log(currentUser);
  return (
    <div className='profile-container'>
      <div className='profile-inner-container'>
        <div className='flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7'>
          <img
            src={
              profileImgId
                ? `${CLOUDINARY_URL}/${profileImgId}`
                : profilePlaceholder
            }
            alt='profile'
            className='w-28 h-28 lg:h-36 lg:w-36 rounded-full'
          />
          <div className='flex flex-col flex-1 justify-between md:mt-2'>
            <div className='flex flex-col w-full'>
              <h1 className='text-center xl:text-left h3-bold md:h1-semibold w-full'>
                {fullName}
              </h1>
              <p className='small-regular md:body-medium text-light-3 text-center xl:text-left'>
                @{username}
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
