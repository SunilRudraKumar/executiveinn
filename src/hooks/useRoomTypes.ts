import { useQuery } from "@tanstack/react-query";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { fetchRoomTypesWithCounts, getHeroImageUrl } from "@/lib/adminApi";
import { getRoomTypes } from "@/lib/roomUtils";

export function useRoomTypes() {
  return useQuery({
    queryKey: ["roomTypes"],
    queryFn: async () => {
      if (isSupabaseConfigured) {
        // Do not fallback to local to avoid flash; let UI handle loading state
        return await fetchRoomTypesWithCounts();
      }
      return getRoomTypes();
    },
  });
}

export function useHeroImage() {
  return useQuery({
    queryKey: ["heroImage"],
    queryFn: async () => {
      if (!isSupabaseConfigured) return null;
      return await getHeroImageUrl();
    },
  });
}

