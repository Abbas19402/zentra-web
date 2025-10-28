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
                 items-start gap-10 md:gap-16 mb-16 p-8
                 bg-gradient-to-br from-gray-900 via-gray-950 to-black
                 rounded-3xl border border-gray-800 shadow-lg shadow-black/40"
    >
      {/* Upload Section */}
      <div className="flex flex-col space-y-5 w-full md:w-[48%]">
        <h2 className="text-lg font-semibold tracking-wide text-sky-400">
          Upload Your Video 🎬
        </h2>

        {!selectedFile ? (
          <div className="filepond-dark-theme">
            <FilePond
              required
              allowMultiple={false}
              onupdatefiles={(files) => {
                setSelectedFile(files[0]?.file as File || null);
              }}
              labelIdle='📂 Drag & Drop your video or <span class="filepond--label-action text-sky-400">Browse</span>'
            />
          </div>
        ) : (
          <div className="p-6 border border-sky-700/30 rounded-2xl bg-gray-900/60 text-center text-gray-200 shadow-inner shadow-black/40">
            <p className="font-semibold text-sky-400">Ready to upload:</p>
            <p className="text-sm text-gray-400 truncate mt-1">{selectedFile.name}</p>
            <button
              onClick={() => setSelectedFile(null)}
              className="mt-3 text-sm text-red-400 hover:text-red-300 underline transition-colors"
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
            className="block text-sm font-medium text-gray-300 mb-2 ml-2 tracking-wide"
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
            className="block w-full bg-gray-900/70 border border-gray-700 
                       rounded-full px-5 py-3 text-gray-100 text-sm 
                       focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none
                       placeholder-gray-500 transition-all"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2 ml-2 tracking-wide"
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
            className="block w-full bg-gray-900/70 border border-gray-700 
                       rounded-2xl px-5 py-4 text-gray-100 text-sm resize-none
                       focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none
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
                       bg-gradient-to-r from-sky-600 to-sky-500 
                       hover:from-sky-500 hover:to-sky-400
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-md shadow-sky-500/30 hover:shadow-sky-400/40
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
