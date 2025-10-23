'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/shared/models/video';
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';

import MyVideosList from '../components/MyVideosList';
import UploadVideoForm from '../components/UploadVideoForm';
import axios from 'axios';


export default function MyVideosTemplate() {
    const [progress, setProgress] = useState(0);
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
        if (!isSignedIn) {
            alert("Please login first")
            return;
        }

        if (!selectedFile) {
            alert("Please select a video first.");
            return;
        }
        setIsUploading(true);

        const { signature, timestamp, apiKey, cloudName } = (await axios.get('http://localhost:8080/videos/upload-signature')).data;


        const formData = new FormData();

        formData.append("file", selectedFile);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", "videos");



        const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (event) => {
                    if (event.total) {
                        const percent = Math.round((event.loaded * 100) / event.total);
                        setProgress(percent);
                    } else {
                        // todo: Handle the case where total size is unknown 
                    }
                },
            }
        );

        const { secure_url, public_id } = uploadRes.data;

        const metadataToSave = {
            title: videoMetadata.title,
            description: videoMetadata.description,
            userId: user?.id ?? '',
            url: secure_url,
            publicId: public_id,
            thumbnailUrl: secure_url.replace(/\.\w+$/, '.jpg'), // optional thumbnail
        };
        await axios.post('http://localhost:8080/videos/cloud/upload', metadataToSave
        );

        alert("Upload complete!");
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
                    <MyVideosList videos={videos} viewMode={viewMode} setViewMode={setViewMode} />
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