import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { profilePlaceholder } from '../../assets/icons';

const ProfileUploader = ({ fieldChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl || '');

  const onDrop = useCallback(
    (acceptedFiles) => {
      fieldChange && fieldChange(acceptedFiles);
      acceptedFiles.length > 0 &&
        setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
    },
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className='cursor-pointer' />
      <div className='cursor-pointer flex-center gap-4'>
        <img
          src={fileUrl || profilePlaceholder}
          alt='profile'
          className='h-24 w-24 rounded-full object-cover object-top'
        />
        <p className='text-primary-500 small-regular md:base-semibold'>
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
