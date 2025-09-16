import { supabase } from "@/lib/supabase";
import { Meditation, MutationResult } from "@/lib/types";
import useSWR, { mutate } from "swr";


// ---------------------------
// Helper fetcher
// ---------------------------
const fetcher = async (fn: string, params: any = {}) => {
  const { data, error } = await supabase.rpc(fn, params);
  if (error) throw error;
  return data || [];
};

// ===========================
// Meditations Hooks
// ===========================
export function useGetMeditations() {
  const { data, error, isValidating: loading } = useSWR<Meditation[]>(
    ["get_meditations"],
    () => fetcher("get_meditations")
  );
  return { meditations: data, loading, error };
}


export function useCreateMeditation() {
  const createMeditation = async (
    userId: string,
    title: string,
    description: string,
    date:string,
    verse: string,
    audioUrl: string,
  ) => {
    try {
      const { data, error } = await supabase.rpc('add_meditation', {
          p_user_id: userId,
          p_title: title,
          p_description: description,
          p_verse: verse,
          p_date: date,
          p_audio_url: audioUrl
      });
      if (error) throw error;
      await mutate(["get_meditations"]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { createMeditation };
}

// ===========================
// Likes Hooks
// ===========================
export function useLikeMeditation(userId: string) {
  const likeMeditation = async (meditationId: number): Promise<MutationResult> => {
    try {
      const { error } = await supabase.rpc("like_meditation", {
        p_user_id: userId,
        p_meditation_id: meditationId,
      });
      if (error) throw error;
      await mutate(["get_meditations"]);
      await mutate(["get_comments", meditationId]);
      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { likeMeditation };
}

export function useUnlikeMeditation(userId: string) {
  const unlikeMeditation = async (meditationId: number): Promise<MutationResult> => {
    try {
      const { error } = await supabase.rpc("unlike_meditation", {
        p_user_id: userId,
        p_meditation_id: meditationId,
      });
      if (error) throw error;
      await mutate(["get_meditations"]);
      await mutate(["get_comments", meditationId]);
      return { data: null, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { unlikeMeditation };
}

// ===========================
// Comments Hooks
// ===========================
export function useGetComments(meditationId: number) {
  const { data, error, isValidating: loading } = useSWR<Comment[]>(
    ["get_comments", meditationId],
    () => fetcher("get_comments", { p_meditation_id: meditationId })
  );
  return { comments: data, loading, error };
}

export function useAddComment() {
  const addComment = async (
    userId: string,
    meditationId: number,
    content: string
  ): Promise<MutationResult<Comment>> => {
    try {
      const { data, error } = await supabase.rpc("add_comment", {
        p_user_id: userId,
        p_meditation_id: meditationId,
        p_content: content,
      });
      if (error) throw error;
      await mutate(["get_comments", meditationId]);
      await mutate(["get_meditations"]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { addComment };
}
