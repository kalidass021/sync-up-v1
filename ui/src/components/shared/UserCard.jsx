import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  useGetCurrentUserProfileQuery,
  useLazyGetCurrentUserProfileQuery,
} from '../../redux/api/authApiSlice';
import { useFollowOrUnfollowUserMutation } from '../../redux/api/userApiSlice';
import { updateUserInfo } from '../../redux/slices/auth/authSlice';
import { Button } from '@/components/ui/button';
import { CLOUDINARY_URL } from '../../config/constants';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { data: signedInUser } = useGetCurrentUserProfileQuery();
  const [followOrUnfollowUser, { isLoading, error: followError }] =
    useFollowOrUnfollowUserMutation();

  const [fetchCurrentUserProfile] = useLazyGetCurrentUserProfileQuery();

  const [isFollowing, setIsFollowing] = useState(
    signedInUser?.following?.includes(user._id)
  );

  const handleFollowClick = async () => {
    // optimistic update
    const optimisticUpdate = !isFollowing;
    setIsFollowing(optimisticUpdate);
    try {
      const res = await followOrUnfollowUser(user._id).unwrap();
      if (
        res.message === 'User followed' ||
        res.message === 'User unfollowed'
      ) {
        // conditionally fetch the updated profile for current user
        const { data: updatedUserInfo } = await fetchCurrentUserProfile();
        // update user info in the local storage - optional
        dispatch(updateUserInfo(updatedUserInfo));
      }
    } catch (err) {
      setIsFollowing(!!optimisticUpdate); // revert optimistic update if request fails
      console.error(
        `Error while follow/unfollow: ${
          err.message || followError.data.message
        }`
      );
      toast.error(`Failed to follow/ unfollow the user`);
    }
  };

  return (
    <div className='user-card'>
      <Link to={`profile/${user._id}`} className='user-card-link'>
        <img
          src={
            user.profileImgId
              ? `${CLOUDINARY_URL}/${user.profileImgId}`
              : profilePlaceholder
          }
          alt='creator'
          className='rounded-full w-14 h-14'
        />
        <div className='flex-center flex-col gap-1'>
          <p className='base-medium text-light-1 text-center line-clamp-1'>
            {user.fullName}
          </p>
          <p className='small-regular text-light-3 text-center line-clamp-2'>
            @{user.username}
          </p>
        </div>
      </Link>
      <Button
        type='button'
        size='sm'
        className='shad-button-primary px-5'
        onClick={handleFollowClick}
        disabled={isLoading}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </Button>
    </div>
  );
};

export default UserCard;
