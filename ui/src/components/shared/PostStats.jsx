import like from '../../assets/icons/like.svg';
import liked from '../../assets/icons/liked.svg';
import save from '../../assets/icons/save.svg';
import saved from '../../assets/icons/saved.svg';

const PostStats = ({ post, userId }) => {
  return (
    <div className='flex justify-between items-center z-20'>
      {/* like */}
      <div className='flex gap-2 mr-5'>
        <img
          src={liked}
          alt='like'
          width={20}
          height={20}
          onClick={() => {}}
          className='cursor-pointer'
        />
        <p className='small-medium lg:base-medium'>0</p>
      </div>
      {/* save */}
      <div className='flex gap-2'>
        <img
          src={save}
          alt='save'
          width={20}
          height={20}
          onClick={() => {}}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default PostStats;
