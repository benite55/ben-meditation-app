// hooks/useSupabaseAuth.ts
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export function useSupabaseAuth() {
  const [userId, setUserId] = useState<string>("");
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        setUserInfo(session.user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    // Listen to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        setUserInfo(session.user);
        setIsAuthenticated(true);
      } else {
        setUserId("");
        setUserInfo(null);
        setIsAuthenticated(false);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const logOut = async () => {
    setLoading(true);
    try {
      const {error } = await supabase.auth.signOut();
      if (error) throw error;
      setLoading(false);
      
    } catch (error) {
      console.log("Error signing out:", error);
      setLoading(false);
      return;
      
    }
    setUserId("");
    setUserInfo(null);
    setIsAuthenticated(false);
  }

  return { userId, userInfo, isAuthenticated, loading, logOut };
}
