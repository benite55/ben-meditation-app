// ===========================
// Prayer Requests Hooks

import { supabase } from "@/lib/supabase";
import { MutationResult, PrayerRequest } from "@/lib/types";
import React from "react";
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

export function useGetUserPrayerRequests(userId: string | undefined) {
  const { data, error, isValidating: loading } = useSWR<PrayerRequest[]>(
    userId ? ["get_user_prayer_requests", { user_id: userId }] : null,
    () => fetcher("get_user_prayer_requests", { p_user_id: userId })
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

// Update prayer status (Admin)
export function useUpdatePrayerStatus() {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const updateStatus = async (
    prayerId: string,
    status: "sent" | "pending" | "answered" | "canceled"
  ): Promise<any> => {
    try {
      setIsUpdating(true);
      const { data, error } = await supabase.rpc("update_prayer_request_status", {
        p_id: prayerId,      // ✅ must match function signature
        p_status: status,    // ✅ matches too
      });
      if (error) throw error;
      await mutate(["get_prayer_requests"]);
      setIsUpdating(false);
      return { data, error: null, loading: isUpdating };
    } catch (err: any) {
      return { data: null, error: err, loading: isUpdating };
    }
  };

  return { updateStatus };
}
