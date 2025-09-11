// ===========================
// Prayer Requests Hooks

import { supabase } from "@/lib/supabase";
import { MutationResult, PrayerRequest } from "@/lib/types";
import useSWR, { mutate } from "swr";


const fetcher = async (fn: string, params: any = {}) => {
  const { data, error } = await supabase.rpc(fn, params);
  if (error) throw error;
  return data || [];
}

export function useGetPrayerRequests() {
  const { data, error, isValidating: loading } = useSWR<PrayerRequest[]>(
    ["get_prayer_requests"],
    () => fetcher("get_prayer_requests")
  );
  return { requests: data, loading, error };
}

export function useAddPrayerRequest() {
  const addRequest = async (userId: string, request: string): Promise<MutationResult<PrayerRequest>> => {
    try {
      const { data, error } = await supabase.rpc("add_prayer_request", {
        p_user_id: userId,
        p_request: request,
      });
      if (error) throw error;
      await mutate(["get_prayer_requests"]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { addRequest };
}
