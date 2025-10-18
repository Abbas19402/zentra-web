import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { LoadingIcon } from '@/shared/components/ui/Icons';

const UploadVideoForm: React.FC<{
    handleUpload: () => any,
    isUploading: boolean,
    setSelectedFile: Dispatch<SetStateAction<File | null>>,
    setVideoMetadata: Dispatch<SetStateAction<{ title: string, description: string }>>
    selectedFile: File | null,
    videoMetadata: { title: string, description: string }
}> = ({ handleUpload, isUploading, setSelectedFile, setVideoMetadata, videoMetadata, selectedFile }) => {
  return (
    <section className="w-full xl:w-[75%] mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-16 mb-16">
        <div className="flex flex-col space-y-4 w-full md:w-[48%]">
            <span className='text-sm tracking-wider font-semibold'>Upload Your Masterpiece</span>
            {!selectedFile ? (
                <FilePond
                    required
                    allowMultiple={false}
                    onupdatefiles={files => {
                        setSelectedFile(files[0]?.file as File || null);
                    }}
                    labelIdle='Drag & Drop your video or <span class="filepond--label-action">Browse</span>'
                />
            ) : (
                <div className="p-4 border border-dashed rounded-lg bg-neutral-50 text-center">
                    <p className="font-semibold text-neutral-700">Ready to upload:</p>
                    <p className="text-sm text-neutral-500 truncate">{selectedFile.name}</p>
                    <button
                        onClick={() => setSelectedFile(null)}
                        className="mt-2 text-sm text-red-600 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>

        <div className="space-y-6 w-full md:w-96">
            <div>
                <label htmlFor="title" className="block text-sm font-semibold text-neutral-600 mb-2 ml-4 tracking-wide">Video Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Give your video a catchy title"
                    value={videoMetadata.title}
                    onChange={(event) => setVideoMetadata(prev => ({ ...prev, title: event.target.value }))}
                    className={`block w-full border-0 bg-neutral-100 rounded-full px-6 py-3 focus:ring-2 focus:ring-black`}
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-semibold text-neutral-600 mb-2 ml-4 tracking-wide">Description</label>
                <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Tell us a little bit about your video..."
                    value={videoMetadata.description}
                    onChange={(event) => setVideoMetadata(prev => ({ ...prev, description: event.target.value }))}
                    className={`block w-full border-0 bg-neutral-100 rounded-2xl px-6 py-4 resize-none focus:ring-2 focus:ring-black -500`}
                ></textarea>
            </div>
            <div>
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!selectedFile || !videoMetadata.title || isUploading}
                    className="relative w-full justify-center flex items-center px-4 py-3 font-semibold text-white bg-black -800 rounded-full hover:bg-black -900 disabled:cursor-not-allowed transition-colors"
                >
                    {isUploading && <div className="absolute w-7 h-7 left-5">
                        <LoadingIcon className='w-full h-full animate-spin fill-white'/>
                    </div>}
                    {isUploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
        </div>
    </section>
  )
}

export default UploadVideoForm
