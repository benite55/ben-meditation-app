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
}

// ---------------------------
// Generic Mutation Result
// ---------------------------
export interface MutationResult<T = any> {
  data: T | null;
  error: any;
}
