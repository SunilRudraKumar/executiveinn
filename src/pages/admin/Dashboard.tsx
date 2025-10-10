import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { localSignOut } from "@/lib/localAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import roomsJson from "@/data/rooms.json";
import { fetchRoomTypes, upsertRoomType, getSetting, setSetting, uploadImage } from "@/lib/adminApi";
import { getRoomTypes } from "@/lib/roomUtils";
import { toast } from "sonner";

// UI model for editing room types
type EditableType = {
  code: string;
  name: string;
  rate: number;
  occupancy: number;
  isSmoking: boolean;
  count: number;
  imageUrl: string | null;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [types, setTypes] = useState<EditableType[]>([]);
  const [heroUrl, setHeroUrl] = useState<string>("");

  useEffect(() => {
    async function load() {
      if (isSupabaseConfigured) {
        try {
          const rts = await fetchRoomTypes();
          const mapped: EditableType[] = rts.map(rt => ({
            code: rt.code,
            name: rt.name,
            rate: rt.rate,
            occupancy: rt.occupancy,
            isSmoking: rt.isSmoking,
            count: rt.count ?? 0,
            imageUrl: (rt as any).imageUrl ?? null,
          }));
          setTypes(mapped);
          // previously used hero image setting removed from UI
          // previously used hero image setting removed from UI
        } catch (e) {
          const local = getRoomTypes();
          setTypes(local.map(rt => ({
            code: rt.code,
            name: rt.name,
            rate: rt.rate,
            occupancy: rt.occupancy,
            isSmoking: rt.isSmoking,
            count: rt.count,
            imageUrl: null,
          })));
        }
      } else {
        const local = getRoomTypes();
        setTypes(local.map(rt => ({
          code: rt.code,
          name: rt.name,
          rate: rt.rate,
          occupancy: rt.occupancy,
          isSmoking: rt.isSmoking,
          count: rt.count,
          imageUrl: null,
        })));
      }
    }
    load();
  }, []);

  async function handleSignOut() {
    if (!isSupabaseConfigured || !supabase) {
      localSignOut();
      return navigate("/admin/login", { replace: true });
    }
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  async function handleSaveType(t: EditableType) {
    if (!isSupabaseConfigured) {
      toast.success("Saved locally (demo)");
      return;
    }
    try {
      await upsertRoomType({
        code: t.code,
        name: t.name,
        rate: t.rate,
        occupancy: t.occupancy,
        isSmoking: t.isSmoking,
        count: t.count,
        imageUrl: t.imageUrl ?? undefined,
      } as any);
      toast.success(`${t.code} saved`);
    } catch (err: any) {
      toast.error(err.message || `Failed to save ${t.code}`);
    }
  }

  // removed hero image handlers

  async function handleUploadTypeImage(code: string, file: File) {
    if (!isSupabaseConfigured) {
      toast.error("Configure Supabase to upload images");
      return;
    }
    try {
      const url = await uploadImage(file, `room_types/${code}.jpg`);
      setTypes(prev => prev.map(t => t.code === code ? { ...t, imageUrl: url } : t));
      await upsertRoomType({ code, imageUrl: url } as any);
      toast.success(`${code} image updated`);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    }
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Executive Inn</title>
      </Helmet>
      <div className="min-h-screen bg-muted/30 p-6">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
          </div>

          <Tabs defaultValue="rooms" className="w-full">
            <TabsList>
              <TabsTrigger value="rooms">Room Types</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Room Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    {types.map((t) => (
                      <div key={t.code} className="border rounded-lg p-4 grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
                        <div className="space-y-2 md:col-span-1">
                          <Label>Code</Label>
                          <Input value={t.code} disabled />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label>Name</Label>
                          <Input value={t.name} onChange={(e) => setTypes(prev => prev.map(x => x.code === t.code ? { ...x, name: e.target.value } : x))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Rate</Label>
                          <Input type="number" value={t.rate} onChange={(e) => setTypes(prev => prev.map(x => x.code === t.code ? { ...x, rate: Number(e.target.value) } : x))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Occupancy</Label>
                          <Input type="number" value={t.occupancy} onChange={(e) => setTypes(prev => prev.map(x => x.code === t.code ? { ...x, occupancy: Number(e.target.value) } : x))} />
                        </div>
                        <div className="space-y-2">
                          <Label>Available (display)</Label>
                          <Input type="number" value={t.count} onChange={(e) => setTypes(prev => prev.map(x => x.code === t.code ? { ...x, count: Number(e.target.value) } : x))} />
                        </div>
                        <div className="space-y-2 md:col-span-6">
                          <Label>Image URL</Label>
                          <Input value={t.imageUrl ?? ""} placeholder="https://..." onChange={(e) => setTypes(prev => prev.map(x => x.code === t.code ? { ...x, imageUrl: e.target.value } : x))} />
                          <div className="mt-2 flex items-center gap-3">
                            <Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadTypeImage(t.code, f); }} />
                            <Button type="button" onClick={() => handleSaveType(t)}>Save {t.code}</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {types.length === 0 && (
                      <p className="text-sm text-muted-foreground">No room types found.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

