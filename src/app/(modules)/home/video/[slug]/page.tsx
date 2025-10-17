import VideoPlayerTemplate from '@/modules/home/template/VideoPlayerTemplate'
import { Video } from '@/shared/models/video'
import React from 'react'

const VideoPlayerPage = async({ params }: { params: { slug: string } }) => {
  try {
    const response = await fetch(`http://192.168.0.198:8080/videos/${params.slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch video');
    }

    const data: Video = await response.json();

    return <VideoPlayerTemplate metadata={data} />;

  } catch (error) {
    console.error("Failed to fetch video:", error);
    return <div>An error occurred while loading the video.</div>;
  }
}

export default VideoPlayerPage