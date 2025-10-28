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
      className="group relative w-full flex flex-col md:flex-row gap-x-5 p-4 rounded-2xl
                 bg-gradient-to-br from-gray-900 via-gray-950 to-black
                 border border-gray-800 hover:border-sky-700/60
                 transition-all duration-300 cursor-pointer
                 hover:shadow-[0_0_25px_-5px_rgba(56,189,248,0.4)]"
    >
      {/* Thumbnail */}
      <div className="relative flex-shrink-0 w-64 md:w-80 aspect-video overflow-hidden rounded-xl">
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white/90">
          { '0:00'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between space-y-2 pt-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-100 leading-snug line-clamp-2 group-hover:text-sky-400 transition-colors">
            {video.title}
          </h3>

          <div className="text-sm text-gray-400 mt-1">
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
          <span className="text-sm font-medium text-gray-300">
            {video.userName}
          </span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 pt-1 italic">
          {video.description}
        </p>
      </div>

      {/* Options Button */}
      <div className="flex-shrink-0 self-start">
        <button
          onMouseEnter={() => setOnVertIcon(true)}
          className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-800 transition-all"
        >
          <MoreVertIcon className="w-5 h-5 text-gray-300 hover:text-sky-400" />
        </button>
      </div>

      {/* Delete Menu */}
      {onVertIcon && (
        <div
          onMouseLeave={() => setOnVertIcon(false)}
          className="absolute top-3 right-3 flex-shrink-0"
        >
          <button className="p-2 rounded-full bg-gray-900 hover:bg-red-500/20 border border-gray-700 transition-all">
            <DeleteIcon className="w-5 h-5 text-gray-300 hover:text-red-400" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LikedVideoCard;
