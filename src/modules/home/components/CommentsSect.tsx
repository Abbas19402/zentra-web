'use client';

import { useEffect, useState } from "react";
import { useUser } from '@clerk/nextjs';
import useRequest from '@/shared/hooks/useRequest';
import { useParams } from "next/navigation";
import Image from "next/image";
import { Send } from "lucide-react";

const CommentsSect = () => {
  const params = useParams();
  const videoId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [inComment, setInComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const { user, isSignedIn } = useUser();
  const request = useRequest();

  async function getComments() {
    if (!videoId) return;
    const response = await request.home.getComments(videoId);
    if (response) setComments(response);
  }

  useEffect(() => {
    if (videoId) getComments();
  }, [videoId]);

  async function handleAddComment() {
    if (!inComment.trim() || !videoId || !user?.id) return;
    const response = await request.home.addComment(videoId, user.id, inComment);
    setComments((prev) => [...prev, { text: inComment, userName: user?.fullName, userImageUrl: user?.imageUrl }]);
    setInComment('');
  }

  return (
    <div className="w-full h-fit bg-gray-950 text-gray-100 rounded-2xl p-6 border border-gray-800 shadow-md shadow-black/30 flex flex-col space-y-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
      {/* Comment Input */}
      <div className="flex items-center space-x-3">
        {isSignedIn && user?.imageUrl ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-700 shrink-0">
            <Image src={user.imageUrl} alt="user" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 text-sm">👤</div>
        )}
        <div className="flex-1 flex items-center bg-gray-900 border border-gray-700 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-sky-500 transition-all">
          <input
            type="text"
            placeholder="Add a comment..."
            value={inComment}
            onChange={(e) => setInComment(e.target.value)}
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-sm"
          />
          <button
            onClick={handleAddComment}
            className="ml-3 p-2 rounded-full bg-sky-700 hover:bg-sky-600 transition-colors"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="flex flex-col space-y-5 mt-2">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center mt-10">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          [...comments].reverse().map((c, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-700 shrink-0">
                <Image
                  src={c.userImageUrl || '/default-avatar.png'}
                  alt={c.userName || 'user'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 w-full shadow-sm">
                <span className="text-sm font-semibold text-sky-400">{c.userName || 'Anonymous'}</span>
                <p className="text-sm text-gray-200 mt-1">{c.text || c.comment || ''}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSect;
