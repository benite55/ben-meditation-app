import { supabase } from "@/lib/supabase";
import useSWR, { mutate } from "swr";

// ---------------------------
// Helper fetcher
// ---------------------------
// ---------------------------
const fetcher = async (fn: string, params: any = {}) => {
  const { data, error } = await supabase.rpc(fn, params);
  if (error) throw error;
  return data || [];
};


// ===========================
// Users Hooks
// ===========================
export function useGetUsers() {
  const { data, error, isValidating: loading } = useSWR(
    ["get_all_users"],
    () => fetcher("get_all_users")
  );
  return { users: data, loading, error };
}

// Add user (invite/create) example
export function useInviteUser() {
  const inviteUser = async (email: string, password: string, metadata: any = {}) => {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        user_metadata: metadata,
        email_confirm: true,
      });
      if (error) throw error;
      await mutate(["get_all_users"]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { inviteUser };
}

// Update user metadata
export function useUpdateUser() {
  const updateUser = async (userId: string, metadata: any) => {
    try {
      const { data, error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: metadata,
      });
      if (error) throw error;
      await mutate(["get_all_users"]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { updateUser };
}

// Remove user
export function useDeleteUser() {
  const deleteUser = async (userId: string) => {
    try {
      const { data, error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;
      await mutate(["get_all_users"]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };
  return { deleteUser };
}