import { useParams } from 'react-router-dom';
import PostForm from '../../components/posts/forms/PostForm.jsx';
import { useGetSpecificPostQuery } from '../../redux/api/postApiSlice.js';
import Loader from '../../components/shared/Loader.jsx';
import { addPost } from '../../assets/icons/index.js';

const EditPost = () => {
  const { id: postId } = useParams();

  const { data: post, isLoading } = useGetSpecificPostQuery(postId);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full ml-[20%]'>
          <img src={addPost} width={36} height={36} alt='add' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>
        <PostForm post={post} action='Update' />
      </div>
    </div>
  );
};

export default EditPost;
