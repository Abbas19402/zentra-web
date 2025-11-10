'use client'

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React, { Dispatch, SetStateAction } from 'react';
import { LoadingIcon } from '@/shared/components/ui/Icons';

const UploadVideoForm: React.FC<{
  handleUpload: () => any;
  isUploading: boolean;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  setVideoMetadata: Dispatch<SetStateAction<{ title: string; description: string }>>;
  selectedFile: File | null;
  videoMetadata: { title: string; description: string };
}> = ({
  handleUpload,
  isUploading,
  setSelectedFile,
  setVideoMetadata,
  videoMetadata,
  selectedFile,
}) => {
  return (
    <section
      className="w-full xl:w-[75%] mx-auto flex flex-col md:flex-row justify-between 
                 items-start gap-10 md:gap-16 mb-4 p-8
                 
                 rounded-3xl  shadow-lg shadow-black/40"
    >
      {/* Upload Section */}
      <div className="flex flex-col space-y-5 w-full md:w-[48%]">
        <h2 className="text-lg font-semibold tracking-wide text-gray-800">
          Upload Your Video 🎬
        </h2>

        {!selectedFile ? (
    <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <FilePond
        required
        allowMultiple={false}
        onupdatefiles={(files) => {
          setSelectedFile(files[0]?.file as File || null);
        }}
        labelIdle='📂 <span class="font-medium text-gray-700">Drag & Drop your video</span> or <span class="filepond--label-action text-sky-600 hover:text-sky-700">Browse</span>'
      />
    </div>
  ) : (
    <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 text-center text-gray-700 shadow-sm transition-all">
      <p className="font-semibold text-gray-600">Ready to upload:</p>
      <p className="text-sm text-gray-500 truncate mt-1">{selectedFile.name}</p>
      <button
        onClick={() => setSelectedFile(null)}
        className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
      >
        Cancel
      </button>
    </div>
  )}
      </div>

      {/* Metadata Section */}
      <div className="space-y-6 w-full md:w-96">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-800 mb-2 ml-2 tracking-wide"
          >
            Video Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Give your video a catchy title"
            value={videoMetadata.title}
            onChange={(event) =>
              setVideoMetadata((prev) => ({ ...prev, title: event.target.value }))
            }
            className="block w-full  border border-gray-700 
                       rounded-full px-5 py-3  text-sm 
                       focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none
                       placeholder-gray-700 transition-all"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-800 mb-2 ml-2 tracking-wide"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Tell us about your creation..."
            value={videoMetadata.description}
            onChange={(event) =>
              setVideoMetadata((prev) => ({ ...prev, description: event.target.value }))
            }
            className="block w-full  border border-gray-700 
                       rounded-2xl px-5 py-4 text-gray-800 text-sm resize-none
                       focus:ring-2 focus:ring-gray-700 focus:border-gray-700 outline-none
                       placeholder-gray-500 transition-all"
          ></textarea>
        </div>

        {/* Upload Button */}
        <div>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || !videoMetadata.title || isUploading}
            className="relative w-full justify-center flex items-center px-4 py-3 
                       font-semibold text-white rounded-full
                       bg-gray-700
                        hover:bg-gray-600
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-md shadow-gray-500/30 hover:shadow-gray-400/40
                       transition-all"
          >
            {isUploading && (
              <div className="absolute w-7 h-7 left-5">
                <LoadingIcon className="w-full h-full animate-spin fill-white" />
              </div>
            )}
            {isUploading ? 'Uploading...' : 'Upload Now'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UploadVideoForm;
