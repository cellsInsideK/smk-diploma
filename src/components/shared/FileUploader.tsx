import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import { Button } from '../ui/button';

interface FileUploaderProps {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState('');
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file],
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
      className=" flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className=" cursor-pointer" />
      {fileUrl ? (
        <>
          <div className=" flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Нажмите или перетащите новое фото для замены</p>
        </>
      ) : (
        <div className=" file_uploader-box">
          <img src="/assets/icons/file-upload.svg" width={96} height={96} alt="file-upload" />
          <h3 className=" base-medium text-light-2 mb-2 mt-6">Переместите фото сюда</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad-button_dark_4">Выбрать файл</Button>
        </div>
      )}
    </div>
  );
};
