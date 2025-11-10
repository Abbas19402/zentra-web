'use client';

import { DeleteIcon, MoreVertIcon } from '@/shared/components/ui/Icons';
import { Video } from '@/shared/models/video';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LikedVideoCard: React.FC<{ video: Video }> = ({ video }) => {
  const [onVertIcon, setOnVertIcon] = useState<boolean>(false);
  const router = useRouter();

  const formatViews = (views: number) => {
    if (views > 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views > 1_000) return `${(views / 1_000).toFixed(0)}K`;
    return views;
  };

  return (
    <div
      onClick={() => router.push(`/video/${video._id}`)}
      className="group relative w-full flex flex-col md:flex-row gap-x-5 px-4 pt-2 my-2 rounded-2xl
                 bg-white
                 transition-all duration-300 cursor-pointer
                 hover:shadow-[0_0_25px_-5px_gray] hover:scale-[1.01]"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-full md:w-80 aspect-video overflow-hidden rounded-xl mb-3">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 "
        />
        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white/90">
          { video.duration }
        </span>
      </div>

      {/* Content */}
      <div className=" min-w-0 flex flex-col space-y-2 pt-1">
        <div>
          <h3 className="text-lg font-semibold text-black leading-snug line-clamp-2 transition-colors">
            {video.title}
          </h3>

          <div className="text-sm text-gray-600 mt-1">
            <span>{formatViews(video.views || 0)} views</span>
            <span className="mx-1.5">•</span>
            <span>{video.likesCount} likes</span>
          </div>
        </div>

        {/* Channel Info */}
        <div className="flex items-center gap-x-2">
          <Image
            src={video?.userImageUrl ?? '/default-avatar.png'}
            alt={video?.userName ?? ''}
            width={28}
            height={28}
            className="rounded-full border border-gray-700"
          />
          <span className="text-sm font-medium text-gray-800">
            {video.userName}
          </span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2 pt-1 italic">
          {video.description}
        </p>
      </div>


    </div>
  );
};

export default LikedVideoCard;
