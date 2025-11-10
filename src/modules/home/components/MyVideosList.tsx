import { Video } from '@/shared/models/video';
import React, { Dispatch, SetStateAction } from 'react';
import VideoCard from './VideoCard';
import { useUser } from '@clerk/nextjs';
import { LayoutGrid, List } from 'lucide-react';

const MyVideosList: React.FC<{
  videos: Video[];
  viewMode: 'list' | 'grid';
  setViewMode: Dispatch<SetStateAction<'list' | 'grid'>>;
}> = ({ videos, viewMode, setViewMode }) => {
  const { user } = useUser();

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-wider text-gray-800">My Videos</h2>
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 border border-gray-200 transition-all text-gray-800 font-medium"
        >
          {viewMode === 'list' ? (
            <>
              <LayoutGrid className="w-4 h-4" /> View All
            </>
          ) : (
            <>
              <List className="w-4 h-4" /> Show Less
            </>
          )}
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 no-scrollbar">
          {videos.map((video) => (
            <div key={video._id} className="w-72 md:w-80 shrink-0">
              <VideoCard video={video} user={user} />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {videos.map((video) => {
             console.log("[VideoCard] rendering for:", user, video);
           return <VideoCard key={video._id} video={video} user={user} />
          })}
        </div>
      )}
    </div>
  );
};

export default MyVideosList;
