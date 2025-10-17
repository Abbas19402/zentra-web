// types/video.ts
export interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  userId: string;
  views: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  playlist: string;
  thumbnailUrl: string;
}
