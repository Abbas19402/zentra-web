'use client'

import { Video } from '@/shared/models/video';
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const VideoCard = ({ video, user }: { video: Video, user?: any }) => {
    const router = useRouter()
    return (
        <div className="flex flex-col space-y-3 cursor-pointer group" onClick={()=>router.push('/video/'+video._id)}>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-200">
                <Image 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" 
                    fill
                />
            </div>
            <div className="flex items-start space-x-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border shrink-0">
                    { !user && (video.userImageUrl && video.userImageUrl != '' && <Image src={video.userImageUrl} alt={video._id} fill={true}/>)}
                    {user && <Image src={user.imageUrl} alt={user.id} fill={true}/>}
                </div>
                <div className='flex flex-col'>
                    <h3 className="text-sm font-semibold leading-tight text-neutral-800 pr-2">
                        {video.title}
                    </h3>
                    <span className="text-xs text-neutral-500 mt-1">
                        1.2M views • 2 weeks ago
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard