import PostForm from '../../components/posts/forms/PostForm';
import { addPost } from '../../assets/icons';

const CreatePost = () => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full ml-[20%]'>
          <img src={addPost} width={36} height={36} alt='add' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>
        <PostForm action='Create'/>
      </div>
    </div>
  );
};

export default CreatePost;
