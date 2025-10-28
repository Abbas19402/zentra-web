'use client';

import { Video } from '@/shared/models/video';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';

const VideoCard = ({ video, user }: { video: Video; user?: any }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push('/video/' + video._id)}
      className="group relative w-full flex flex-col space-y-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-md shadow-black/30">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Duration Tag */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-[11px] text-gray-200 px-2 py-[2px] rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3 text-sky-400" />
          <span>12:43</span>
        </div>
      </div>

      {/* Video Info */}
      <div className="flex items-start gap-3 px-1">
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-700 shrink-0">
          <Image
            src={
              user
                ? user.imageUrl
                : video.userImageUrl && video.userImageUrl !== ''
                ? video.userImageUrl
                : '/default-avatar.png'
            }
            alt={video._id}
            fill
            className="object-cover"
          />
        </div>

        {/* Text Info */}
        <div className="flex flex-col pr-2">
          <h3 className="text-[15px] text-white/80  leading-snug transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            {video.userName || 'Unknown Creator'}
          </p>
          <span className="text-xs text-gray-500 mt-[2px]">
            1.2M views • 2 weeks ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
