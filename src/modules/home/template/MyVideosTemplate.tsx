'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/shared/models/video'; 
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';

import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import VideoCard from '../components/VideoCard';


export default function MyVideosTemplate() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [videoMetadata, setVideoMetadata] = useState<{ title: string, description: string }>({ title: '', description: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const { user } = useUser();
    const request = useRequest();

    const fetchVideos = async () => {
        if (user) {
            try {
                const response = await request.home.getMyVideos(user.id);
                if (response) {
                    setVideos(response);
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
        setIsUploading(true);
        const form = new FormData();
        form.append('video', selectedFile);
        form.append('title', videoMetadata.title);
        form.append('description', videoMetadata.description);
        form.append('userId', user?.id ?? '');

        try {
            await request.home.uploadVideo(form);

            alert("Video uploaded successfully!");
            setSelectedFile(null); 
            setVideoMetadata({ title: '', description: '' }); 
            fetchVideos();
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchVideos();
        }
    }, [user]);

    return (
        <main className='flex flex-col space-y-4 py-8'>
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
                            className={`block w-full border-0 bg-neutral-100 rounded-full px-6 py-3 focus:ring-2 focus:ring-sky-500`}
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
                            className={`block w-full border-0 bg-neutral-100 rounded-2xl px-6 py-4 resize-none focus:ring-2 focus:ring-sky-500`}
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={!selectedFile || !videoMetadata.title || isUploading}
                            className="w-full justify-center flex items-center px-4 py-3 font-semibold text-white bg-sky-800 rounded-full hover:bg-sky-900 disabled:cursor-not-allowed transition-colors"
                        >
                            {isUploading ? 'Uploading...' : 'Save Video Details'}
                        </button>
                    </div>
                </div>
            </section>

            {/* --- VIDEO LISTING UI --- */}
            <section className="w-full lg:w-[85%] xl:w-[75%] mx-auto">
                {videos?.length > 0 ? (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl tracking-wider font-semibold">My Videos</h2>
                            {viewMode === 'list' ? (
                                <button onClick={() => setViewMode('grid')} className="font-semibold text-sky-600 hover:underline" >View All</button>
                            ) : (
                                <button onClick={() => setViewMode('list')} className="font-semibold text-sky-600 hover:underline" >Show Less</button>
                            )}
                        </div>

                        {viewMode === 'list' ? (
                            <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
                                {videos.map(video => (
                                    <div key={video._id} className="w-72 md:w-80 shrink-0">
                                        <VideoCard video={video} user={user} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                                {videos.map(video => (
                                    <VideoCard key={video._id} video={video} user={user} />
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                   <div className="text-center py-16 text-neutral-500 bg-neutral-50 rounded-lg">
                       <p className='font-semibold'>You haven't uploaded any videos yet.</p>
                       <p className='text-sm mt-1'>Upload your first video to see it here!</p>
                   </div>
                )}
            </section>
        </main>
    );
}