import { Video } from '@/shared/models/video'
import React, { Dispatch, SetStateAction } from 'react'
import VideoCard from './VideoCard'
import { useUser } from '@clerk/nextjs'

const MyVideosList: React.FC<{
    videos: Video[],
    viewMode: 'list' | 'grid',
    setViewMode: Dispatch<SetStateAction<'list' | 'grid'>>
}> = ({
    videos,
    viewMode,
    setViewMode
}) => {
    const { user } = useUser();
  return (
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
  )
}

export default MyVideosList
