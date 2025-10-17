'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/shared/models/video';
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

export default function MyVideosTemplate() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [videoMetadata, setVideoMetadata] = useState<{ title: string, description: string }>({ title: '', description: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { user } = useUser();
    const request = useRequest();

    const fetchVideos = async () => {
        if (user) {
            try {
                const response = await request.home.getMyVideos(user.id);
                if (response) {
                    setVideos(response.videos);
                }
            } catch (error) {
                console.error("Failed to fetch videos:", error);
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a video first.");
            return;
        }

        const form = new FormData();
        form.append('video', selectedFile);
        form.append('title', videoMetadata.title);
        form.append('description', videoMetadata.description);
        form.append('userId',user?.id ?? '')

        for (const [key, value] of form.entries()) {
            console.log(`${key}:`, value);
        }
        await request.home.uploadVideo(form)
    };

    useEffect(() => { 
        if (user) {
            fetchVideos();
        }
    }, [user]);

    return (
        <main>
            <div className="w-[75%] flex justify-between items-start mb-16">
                <div className="flex flex-col space-y-4 w-[48%]">
                    <span className='text-2xl tracking-wider font-semibold'>Upload Your Masterpiece</span>
                    {!selectedFile ? (
                        <FilePond 
                            allowMultiple={false} 
                            onupdatefiles={files => {
                                setSelectedFile(files[0]?.file as File || null);
                            }}
                            labelIdle='Drag & Drop your video or <span class="filepond--label-action">Browse</span>'
                        />
                    ) : (
                        <div className="p-4 border border-dashed rounded-lg bg-gray-50 text-center">
                            <p className="font-semibold text-gray-700">Ready to upload:</p>
                            <p className="text-sm text-gray-500">{selectedFile.name}</p>
                            <button 
                                onClick={() => setSelectedFile(null)} 
                                className="mt-2 text-sm text-red-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-6 w-96">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-neutral-600 mb-2 ml-4 tracking-wide">Video Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Give your video a catchy title"
                            value={videoMetadata.title}
                            onChange={(event) => setVideoMetadata(prev => ({ ...prev, title: event.target.value }))}
                            className={`block w-full border-0 bg-neutral-100 rounded-full px-6 py-3`}
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
                            className={`block w-full border-0 bg-neutral-100 rounded-2xl px-6 py-4 resize-none`}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={!selectedFile || isUploading}
                            className="w-full justify-center px-4 py-3 font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                        >
                            {isUploading ? 'Uploading...' : 'Save Video Details'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}