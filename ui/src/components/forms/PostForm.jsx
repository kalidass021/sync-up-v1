import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import FileUploader from '../shared/FileUploader';

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    setValue,
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

  const formSubmit = (postData) => {
    const post = {
      ...postData,
      tags: postData?.tags?.split(', '), // convert string to an array
    };

    console.log(post);
  };

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
              required: 'Caption is required',
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
            mediaUrl={post?.imageUrl}
            // register happened in handleFileChange using setValue
          />
          {errors.file && (
            <span className='shad-form-message'>{errors.file.message}</span>
          )}
        </div>
        {/* location */}
        <div>
          <label className='shad-form-label'>Add Location</label>
          <Input
            type='text'
            className='shad-input mt-2'
            {...register('location', {
              required: 'Location is required',
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
              required: 'Tags are required',
              minLength: {
                value: 2,
                message: 'Tags must be at least 2 characters',
              },
              maxLength: {
                value: 100,
                message: 'Tags not contain more than 100 characters',
              },
            })}
          />
          {errors.tags && (
            <span className='shad-form-message'>{errors.tags.message}</span>
          )}
        </div>
        <div className='flex gap-4 items-center justify-end'>
          <Button type='button' className='shad-button-dark-4'>
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button-primary whitespace-nowrap'
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
