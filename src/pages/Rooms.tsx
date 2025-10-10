import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoomCard } from "@/components/RoomCard";
import { BookingWidget } from "@/components/BookingWidget";
import { StructuredData } from "@/components/StructuredData";
import { getRoomTypes } from "@/lib/roomUtils";
import { useRoomTypes } from "@/hooks/useRoomTypes";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

const Rooms = () => {
  const { data: roomTypesData, isLoading } = useRoomTypes();
  const usingDb = isSupabaseConfigured;
  const roomTypes = usingDb ? (roomTypesData || []) : getRoomTypes();

  return (
    <>
      <Helmet>
        <title>Our Rooms | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Browse our selection of clean, comfortable rooms at Executive Inn. Queen, King, and Double Queen options available. Book your room today." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/rooms" />
      </Helmet>

      <StructuredData type="Hotel" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-primary text-primary-foreground py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Our Rooms
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl">
                Choose from our selection of comfortable accommodations, each designed 
                with your comfort in mind. All rooms feature modern amenities and thoughtful touches.
              </p>
            </div>
          </section>

          <section className="py-12 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <BookingWidget />
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {usingDb && (isLoading || roomTypes.length === 0) ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border">
                      <div className="aspect-[4/3] bg-muted" />
                      <div className="p-4 space-y-3">
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  ))
                ) : (
                  roomTypes.map((roomType) => (
                    <RoomCard key={roomType.code} roomType={roomType} />
                  ))
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Rooms;
