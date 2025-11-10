'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/shared/models/video';
import useRequest from '@/shared/hooks/useRequest';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';

import MyVideosList from '../components/MyVideosList';
import UploadVideoForm from '../components/UploadVideoForm';
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export default function MyVideosTemplate() {
  const [progress, setProgress] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoMetadata, setVideoMetadata] = useState({ title: '', description: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const { user, isSignedIn } = useUser();
  const request = useRequest();

  const fetchVideos = async () => {
    if (!user) return;
    try {
      const response = await request.home.getMyVideos(user.id);
      if (response) setVideos(response);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  const handleUpload = async () => {
    if (!isSignedIn) return alert("Please login first.");
    if (!selectedFile) return alert("Please select a video first.");

    setIsUploading(true);
    try {
      const { signature, timestamp, apiKey, cloudName } = (await axios.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/upload-signature`)).data;

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
            }
          },
        }
      );

      const { secure_url, public_id, duration } = uploadRes.data;
      console.log("samay",duration)
       
      
     const mins = Math.floor(duration / 60);
const secs = Math.floor(duration % 60);
const formatDuration = `${mins}:${secs.toString().padStart(2, '0')}`;


      await axios.post(`${NEXT_PUBLIC_BACKEND_URL}/videos/cloud/upload`, {
        title: videoMetadata.title,
        description: videoMetadata.description,
        userId: user?.id ?? '',
        url: secure_url,
        publicId: public_id,
        thumbnailUrl: secure_url.replace(/\.\w+$/, '.jpg'),
        duration: formatDuration
      });

      alert("Upload complete!");
      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (user) fetchVideos();
  }, [user]);

  return (
    <main className="flex flex-col space-y-10 text-gray-800 ">
      {/* Upload Section */}
      <UploadVideoForm
        handleUpload={handleUpload}
        isUploading={isUploading}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        videoMetadata={videoMetadata}
        setVideoMetadata={setVideoMetadata}
      />

      {/* Video Listing Section */}
      <section className="w-full lg:w-[85%] xl:w-[75%] mx-auto">
        {videos?.length > 0 ? (
          <MyVideosList videos={videos} viewMode={viewMode} setViewMode={setViewMode} />
        ) : (
          <div className="text-center py-20 bg-gray-900/50 border border-gray-800 rounded-2xl backdrop-blur-lg">
            <p className="text-sky-400 font-semibold text-lg">No videos yet</p>
            <p className="text-gray-500 text-sm mt-1">Upload your first video to see it here!</p>
          </div>
        )}
      </section>
    </main>
  );
}
