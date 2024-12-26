// post form validation create post and update post
const validatePostForm = (postData, setError) => {
  const { caption, image } = postData;

  if (!caption && !image) {
    setError('caption', {
      type: 'manual',
      message: 'Post must have caption or image',
    });
    setError('image', {
      type: 'manual',
      message: 'Post must have caption or image',
    });

    return false;
  }

  return true;
};


export default validatePostForm;