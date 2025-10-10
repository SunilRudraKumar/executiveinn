import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import type { RoomType } from "@/lib/roomUtils";

export interface SiteSetting<T = unknown> {
  key: string;
  value: T;
}

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured");
  }
}

// Room Types
export async function fetchRoomTypes(): Promise<RoomType[]> {
  requireSupabase();
  const { data, error } = await supabase!
    .from("room_types")
    .select("code,name,description,rate,occupancy,is_smoking,amenities,image_url,display_count");
  if (error) throw error;
  return (data || []).map((row: any) => ({
    code: row.code,
    name: row.name,
    description: row.description || "",
    rate: Number(row.rate || 0),
    occupancy: Number(row.occupancy || 2),
    isSmoking: Boolean(row.is_smoking),
    amenities: (row.amenities as string[]) || [],
    count: Number(row.display_count ?? 0),
    imageUrl: row.image_url || null,
  }));
}

export async function upsertRoomType(payload: Partial<RoomType> & { code: string }): Promise<void> {
  requireSupabase();
  const { error } = await supabase!
    .from("room_types")
    .upsert({
      code: payload.code,
      name: payload.name,
      description: payload.description,
      rate: payload.rate,
      occupancy: payload.occupancy,
      is_smoking: payload.isSmoking,
      amenities: payload.amenities,
      image_url: (payload as any).imageUrl,
      display_count: payload.count,
      updated_at: new Date().toISOString(),
    }, { onConflict: "code" });
  if (error) throw error;
}

export async function deleteRoomType(code: string): Promise<void> {
  requireSupabase();
  const { error } = await supabase!.from("room_types").delete().eq("code", code);
  if (error) throw error;
}

// Room counts by type (from rooms table)
export async function fetchRoomCountsByType(): Promise<Record<string, number>> {
  requireSupabase();
  const { data, error } = await supabase!
    .from("rooms")
    .select("room_type_code");
  if (error) throw error;
  const counts: Record<string, number> = {};
  (data || []).forEach((r: any) => {
    const code = r.room_type_code as string;
    counts[code] = (counts[code] || 0) + 1;
  });
  return counts;
}

export async function fetchRoomTypesWithCounts(): Promise<RoomType[]> {
  // Use persisted admin-set display_count from room_types
  // (no recalculation from rooms table to avoid mismatches)
  return await fetchRoomTypes();
}

// Settings
export async function getSetting<T = unknown>(key: string): Promise<T | null> {
  requireSupabase();
  const { data, error } = await supabase!.from("site_settings").select("value").eq("key", key).maybeSingle();
  if (error) throw error;
  return data ? (data.value as T) : null;
}

export async function setSetting<T = unknown>(key: string, value: T): Promise<void> {
  requireSupabase();
  const { error } = await supabase!.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}

// Images: return a public URL after upload
export async function uploadImage(file: File, path: string): Promise<string> {
  requireSupabase();
  const { data, error } = await supabase!.storage.from("images").upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: publicUrl } = supabase!.storage.from("images").getPublicUrl(data.path);
  // Append cache-busting query to ensure immediate visual update after overwrite
  const cacheBusted = `${publicUrl.publicUrl}?v=${Date.now()}`;
  return cacheBusted;
}

export async function getHeroImageUrl(): Promise<string | null> {
  const value = await getSetting<{ url: string }>("hero_image");
  return value?.url || null;
}
