'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/shared/models/video'; 
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';

import MyVideosList from '../components/MyVideosList';
import UploadVideoForm from '../components/UploadVideoForm';


export default function MyVideosTemplate() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [videoMetadata, setVideoMetadata] = useState<{ title: string, description: string }>({ title: '', description: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    const { user, isSignedIn } = useUser();
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
        if(!isSignedIn) {
            alert("Please login first")
            return;
        }

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
            <UploadVideoForm 
                handleUpload={handleUpload} 
                isUploading={isUploading}
                setSelectedFile={setSelectedFile}
                selectedFile={selectedFile}
                videoMetadata={videoMetadata}
                setVideoMetadata={setVideoMetadata}
            />

            {/* --- VIDEO LISTING UI --- */}
            <section className="w-full lg:w-[85%] xl:w-[75%] mx-auto">
                {videos?.length > 0 ? (
                    <MyVideosList videos={videos} viewMode={viewMode} setViewMode={setViewMode}/>
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