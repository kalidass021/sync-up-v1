import { useEffect } from 'react';
import {
  useParams,
  useLocation,
  Link,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../../redux/api/userApiSlice';
import {
  useGetUserPostsQuery,
  useGetPostsByIdsQuery,
} from '../../redux/api/postApiSlice';
import Loader from '../../components/shared/Loader';
import { Button } from '@/components/ui/button';
import { CLOUDINARY_URL } from '../../config/constants';
import profilePlaceholder from '../../assets/icons/profile-placeholder.svg';
import edit from '../../assets/icons/edit.svg';
import posts from '../../assets/icons/posts.svg';
import like from '../../assets/icons/like.svg';
import save from '../../assets/icons/save.svg';

const StatBlock = ({ value, label }) => (
  <div className='flex-center gap-2'>
    <p className='small-semibold lg:body-bold text-primary-500'>{value}</p>
    <p className='small-medium lg:base-medium text-light-2'>{label}</p>
  </div>
);

const Profile = () => {
  const { userInfo: currentUser } = useSelector((state) => state.auth);
  const { username } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: profileUser, isLoading: userProfileLoading } =
    useGetUserProfileQuery(username, { skip: !username });

  const { data: userPosts, isLoading: userPostsLoading } = useGetUserPostsQuery(
    username,
    { skip: !username }
  );

  const { data: likedPosts, isLoading: likedPostsLoading } =
    useGetPostsByIdsQuery(profileUser?.likedPosts, { skip: !profileUser });

  const { data: savedPosts, isLoading: savedPostsLoading } =
    useGetPostsByIdsQuery(profileUser?.savedPosts, { skip: !profileUser });

  // redirect to posts page by default if on profile page
  useEffect(() => {
    if (pathname === `/${username}/profile`) {
      navigate(`/${username}/profile`, {
        state: { posts: userPosts, showUser: false, showStats: false }, // sending props via navigate
      });
    }
  }, [pathname, navigate, username, userPosts]);

  if (!profileUser || userProfileLoading) {
    return <Loader />;
  }

  const { profileImgId, fullName, followers, following, bio } = profileUser;

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
            <p className='small-medium md:base-medium text-center xl:text-left mt-2 mb-5 max-w-screen-sm'>
              {bio}
            </p>
            {/* profile stats */}
            <div className='flex gap-8 items-center justify-center xl:justify-start flex-wrap z-20'>
              <StatBlock value={userPosts?.length} label='Posts' />
              <StatBlock value={followers?.length} label='Followers' />
              <StatBlock value={following?.length} label='Following' />
            </div>
          </div>
          {/* edit profile */}
          <div className='flex justify-center gap-4'>
            <div className={`${currentUser.username !== username && 'hidden'}`}>
              <Link
                to={`/${username}/profile/edit`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  currentUser.username !== username && 'hidden'
                }`}
              >
                <img src={edit} alt='edit' width={20} height={20} />
                <p className='flex whitespace-nowrap small-medium'>
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${currentUser.username === username && 'hidden'}`}>
              <Button type='button' className='shad-button-primary px-8'>
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
      {currentUser.username === username && (
        <div className='flex max-w-5xl w-full'>
          <Link
            to={`/${username}/profile`}
            state={{ posts: userPosts, showUser: false, showStats: false }} // sending props via link
            className={`profile-tab rounded-l-lg ${
              pathname === `/${username}/profile` && '!bg-dark-3'
            }`}
          >
            <img src={posts} alt='posts' width={20} height={20} />
            Posts
          </Link>
          <Link
            to={`/${username}/profile/posts/liked`}
            state={{ posts: likedPosts, showStats: false }} // sending props via link
            className={`profile-tab ${
              pathname === `/${username}/profile/posts/liked` && '!bg-dark-3'
            }`}
          >
            <img src={like} alt='like' width={20} height={20} />
            Liked Posts
          </Link>
          <Link
            to={`/${username}/profile/posts/saved`}
            state={{ posts: savedPosts, showStats: false }} // sending props via link
            className={`profile-tab rounded-r-lg ${
              pathname === `/${username}/profile/posts/saved` && '!bg-dark-3'
            }`}
          >
            <img src={save} alt='save' width={20} height={20} />
            Saved Posts
          </Link>
        </div>
      )}
      {userPostsLoading || likedPostsLoading || savedPostsLoading ? (
        <Loader />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Profile;
