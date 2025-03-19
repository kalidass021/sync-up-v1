import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { fileUpload } from '../../assets/icons';

const FileUploader = ({ fieldChange, mediaUrl }) => {
  // eslint-disable-next-line no-unused-vars
  const [file, setFile] = useState([]);
  // we're receiving the mediaUrl from PostForm only action === Update
  const [fileUrl, setFileUrl] = useState(mediaUrl || '');

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles);
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
    <div
      {...getRootProps()}
      className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer mt-2'
    >
      <input {...getInputProps()} className='cursor-pointer' />
      {fileUrl ? (
        <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileUrl} alt='image' className='file-uploader-img ' />
          </div>
          <p className='file-uploader-label'>Click/ Drag a photo to replace</p>
        </>
      ) : (
        <div className='file-uploader-box'>
          <img src={fileUpload} width={96} height={77} alt='file-upload' />
          <h3 className='base-medium text-light-2 mb-2 mt-6'>
            Drag photo here
          </h3>
          <p className='text-light-4 small-regular mb-6 italic'>
            .png, .jpeg, .jpg, .svg
          </p>
          <Button className='shad-button-dark-4'>
            Select from your device
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
