export type UserMetadata = {
  name: string;
  email: string;
  phone: string;
  church?: string;
};

// ---------------------------
// Meditation Types
// ---------------------------
export interface Meditation {
  id: number;
  user_id: string;
  title: string;
  description: string;
  date: string; 
  verse: string;
  text: string;
  audio_url: string;
  created_at: string;
  likes_count: number;
  like_user_ids: string[]; // Array of user IDs who liked
  comment_ids: number[]; // Array of comment IDs
  comments_count: number;
}

// ---------------------------
// Comment Types
// ---------------------------
export interface Comment {
  id: number;
  meditation_id: number;
  user_id: string;
  content: string;
  created_at: string;
}

// ---------------------------
// Prayer Request Types
// ---------------------------
export interface PrayerRequest {
  id: number;
  user_id: string;
  request: string;
  created_at: string;
  name: string,
  church: string,
  phone: string,
  email: string,
  avatar: string | null,
}

// ---------------------------
// Generic Mutation Result
// ---------------------------
export interface MutationResult<T = any> {
  data: T | null;
  error: any;
}
