import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from '../../redux/api/postApiSlice';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CLOUDINARY_URL } from '../../config/constants';
import FileUploader from '../shared/FileUploader';
import getUpdatedValues from '../../utils/form/getUpdatedValues';
import { validatePostForm } from '../../utils/form/formValidation';
import Loader from '../shared/Loader';

const PostForm = ({ post, action }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      caption: post?.caption || '',
      image: '',
      location: post?.location || '',
      tags: post?.tags || [],
    },
  });

  const navigate = useNavigate();
  const [createPost, { isLoading: isCreatingPost }] = useCreatePostMutation();

  const [updatePost, { isLoading: isUpdatingPost }] = useUpdatePostMutation();

  const handleFileChange = async (acceptedFiles) => {
    const reader = new FileReader();
    reader.readAsDataURL(acceptedFiles[0]); // read file as a base64 string
    reader.onload = () => {
      setValue('image', reader.result); // set image as a base64 string
    };

    // handle error
    reader.onerror = (err) => {
      console.error(`Error reading file ${err}`);
      toast.error(`Error reading file ${err}`);
    };
  };

  const formSubmit = async (postData) => {
    // validate post
    if (!validatePostForm(postData, setError)) {
      return;
    }

    const mutation = action === 'Update' ? updatePost : createPost;
    const updatedPost = action === 'Update' && getUpdatedValues(post, postData);
    // in the above code post is original data and postData is updated data

    const payload =
      action === 'Update'
        ? {
            id: post._id,
            updatedPost,
          }
        : {
            ...postData,
          };

    try {
      const res = await mutation(payload);

      if (res.error) {
        throw new Error(res?.error);
      }

      toast.success(`Post ${action === 'Update' ? 'updated' : 'created'}`);
      reset();
      navigate(action === 'Update' ? `/posts/${post._id}` : '/');
    } catch (err) {
      console.error(
        `Failed to ${action === 'Update' ? 'update' : 'create'} post: ${err}`
      );
      toast.error(`Failed to ${action === 'Update' ? 'update' : 'create'}`);
    }
  };

  return (
    <div className='w-[80%]'>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        {/* caption */}
        <div>
          <label className='shad-form-label'>Caption</label>
          <Textarea
            className='shad-textarea custom-scrollbar mt-2'
            {...register('caption', {
              minLength: {
                value: 6,
                message: 'Caption must be at least 6 characters',
              },
              maxLength: {
                value: 2200,
                message: 'Caption not contain more than 2200 characters',
              },
            })}
          />
          {errors.caption && (
            <span className='shad-form-message'>{errors.caption.message}</span>
          )}
        </div>
        {/* image */}
        <div>
          <label className='shad-form-label'>Add Photos</label>
          <FileUploader
            fieldChange={handleFileChange}
            mediaUrl={action === 'Update' && `${CLOUDINARY_URL}/${post?.imgId}`}
            // register happened in handleFileChange using setValue
          />
          {errors.image && (
            <span className='shad-form-message'>{errors.image.message}</span>
          )}
        </div>
        {/* location */}
        <div>
          <label className='shad-form-label'>Add Location</label>
          <Input
            type='text'
            className='shad-input mt-2'
            {...register('location', {
              minLength: {
                value: 2,
                message: 'Location must be at least 2 characters',
              },
              maxLength: {
                value: 100,
                message: 'Location not contain more than 100 characters',
              },
            })}
          />
          {errors.location && (
            <span className='shad-form-message'>{errors.location.message}</span>
          )}
        </div>
        {/* tags */}
        <div>
          <label className='shad-form-label'>Add Tags (comma separated)</label>
          <Input
            type='text'
            className='shad-input mt-2'
            placeholder='Art, Expression, Learn'
            {...register('tags', {
              minLength: {
                value: 2,
                message: 'Tags must be at least 2 characters',
              },
              maxLength: {
                value: 100,
                message: 'Tags not contain more than 100 characters',
              },
              setValueAs: (value) =>
                typeof value === 'string'
                  ? value?.replace(/ /g, '').split(',') // transform the tags into an array
                  : value, // ensure the value is string before transformation
            })}
          />
          {errors.tags && (
            <span className='shad-form-message'>{errors.tags.message}</span>
          )}
        </div>
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
            disabled={isCreatingPost || isUpdatingPost}
          >
            {isCreatingPost || isUpdatingPost ? (
              <div className='flex-center gap-2'>
                <Loader /> {action === 'Update' ? 'Updating...' : 'Creating...'}
              </div>
            ) : (
              action
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
