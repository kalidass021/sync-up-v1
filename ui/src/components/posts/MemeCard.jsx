import { Link } from 'react-router-dom';
import { useGetMemeOfTheDayQuery } from '../../redux/api/postApiSlice';
import { postPlaceholder } from '../../assets/images';

const MemeCard = () => {
  const { data: meme, isLoading, error } = useGetMemeOfTheDayQuery();

  if (isLoading) return;

  const {
    author,
    subreddit,
    postLink,
    nsfw,
    title,
    url,
    ups,
    spoiler,
    preview,
  } = meme;

  return (
    <div className='post-card'>
      <h2 className='base-medium lg:body-bold text-light-3 mb-3'>Meme of the Day</h2>
      <div className='flex-between'>
        <div className='flex flex-col'>
          {/* <p className='base-medium lg:body-bold text-light-1'>
            Author: {author}
          </p> */}
          <p className='text-light-1 subtle-semibold'>
            r/{subreddit} • {ups} upvotes
          </p>
        </div>
        {nsfw && <span className='nsfw-badge'>NSFW</span>}
        {spoiler && <span className='spoiler-badge'>Spoiler</span>}
      </div>

      <Link to={postLink} target='_blank' rel='noopener noreferrer'>
        <div className='py-5 small-medium lg:base-medium'>
          <p>{title}</p>
        </div>

        <img
          src={url || preview?.[5] || postPlaceholder}
          className='meme-card-img'
          alt='meme-img'
        />
      </Link>
    </div>
  );
};

export default MemeCard;
