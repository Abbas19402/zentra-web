import { DeleteIcon, MoreVertIcon } from '@/shared/components/ui/Icons'
import { Video } from '@/shared/models/video'
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const LikedVideoCard: React.FC<{ video: Video }> = ({ video }) => {
    const [onVertIcon, setOnVertIcon] = useState<boolean>(false)
    const router = useRouter()

    const formatViews = (views: any) => {
        if (views > 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
        if (views > 1_000) return `${(views / 1_000).toFixed(0)}K`;
        return views;
    };

    return (
        <div onClick={() => router.push(`/video/${video._id}`)} className='group relative w-full p-2 flex gap-x-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200'>
        
        <div className="relative flex-shrink-0 w-64 md:w-80 aspect-video overflow-hidden rounded-xl">
            <Image 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="object-cover w-full h-full" 
            fill
            />
            <span className="absolute bottom-1.5 right-1.5 rounded-sm bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {"0:00"}
            </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col space-y-1.5 pt-1">
            <h3 className="text-lg font-medium text-black dark:text-white line-clamp-2 leading-snug">
            {video.title}
            </h3>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>{formatViews(video.views || 0)} views</span>
            <span className="mx-1.5">•</span>
            <span>{video.likesCount} Likes</span>
            </div>

            <div className="flex items-center gap-x-2 pt-1">
            <Image 
                src={video?.userImageUrl ?? ''}
                alt={video?.userName ?? ""} 
                width={24} 
                height={24} 
                className="w-6 h-6 rounded-full" 
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {video.userName}
            </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 pt-1">
            {video.description}
            </p>
        </div>
        
        <div className="flex-shrink-0">
            <button
                onMouseEnter={() => {
                    if(!onVertIcon) setOnVertIcon(true)
                }}
                className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:opacity-100"
            >
            <MoreVertIcon className='w-5 h-5 text-black dark:text-white'/>
            </button>
        </div>

        {onVertIcon && <div onMouseLeave={()=> setOnVertIcon(false)} className="absolute top-2 right-2 flex-shrink-0">
            <button className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-opacity">
            <DeleteIcon className='w-5 h-5 text-black dark:text-white'/>
            </button>
        </div>} 
        
        </div>
    )
}

export default LikedVideoCard