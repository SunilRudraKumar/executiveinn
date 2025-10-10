import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { localGetSession } from "@/lib/localAuth";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      // Local session fallback if Supabase is not configured
      if (!isSupabaseConfigured || !supabase) {
        const local = localGetSession();
        setIsAuthed(Boolean(local));
        setIsLoading(false);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!cancelled) {
        setIsAuthed(Boolean(data.session));
        setIsLoading(false);
      }
    }

    checkSession();

    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(() => {
        checkSession();
      });
      return () => {
        cancelled = true;
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  if (isLoading) return null;
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}

