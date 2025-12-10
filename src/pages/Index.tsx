```
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { RoomCard } from "@/components/RoomCard";
import { StructuredData } from "@/components/StructuredData";
import { getRoomTypes } from "@/lib/roomUtils";
import { useRoomTypes, useHeroImage } from "@/hooks/useRoomTypes";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wifi, Car, Wind, Coffee, MapPin, Star, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-exterior.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

const Index = () => {
  const { data: roomTypesData, isLoading: roomsLoading } = useRoomTypes();
  const { data: heroUrl, isLoading: heroLoading } = useHeroImage();
  const usingDb = isSupabaseConfigured;
  const roomTypes = usingDb ? (roomTypesData || []) : getRoomTypes();

  return (
    <>
      <Helmet>
        <title>Executive Inn - Locust Grove, GA | Clean, Comfortable Rooms</title>
        <meta name="description" content="Executive Inn in Locust Grove, GA — clean, comfortable rooms at a great value. Free Wi-Fi and parking. Book your stay today." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/" />
      </Helmet>

      <StructuredData type="Hotel" />
      <StructuredData type="WebSite" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="relative bg-primary text-primary-foreground py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0">
              {usingDb ? (
                heroLoading || !heroUrl ? (
                  <div className="w-full h-full bg-muted" />
                ) : (
                  <img
                    src={heroUrl}
                    alt="Executive Inn exterior at dusk in Locust Grove, Georgia"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <img
                  src={heroImage}
                  alt="Executive Inn exterior at dusk in Locust Grove, Georgia"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/60 to-primary/40" />
            </div>
            <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
                  Rest Easy in Locust Grove
                </h1>
                <p className="text-xl lg:text-2xl text-primary-foreground/90 mb-8">
                  Clean, comfortable rooms at exceptional value. Your home away from home
                  in Locust Grove, Georgia.
                </p>
                <Link to="/book">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8">
                    Book Your Stay
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Booking Widget */}
          <section className="relative -mt-12 z-10 mx-auto max-w-6xl px-4 lg:px-8">
            <BookingWidget />
          </section>

          {/* Trust Badges */}
          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { icon: Wifi, label: "Free Wi-Fi" },
                  { icon: Car, label: "Free Parking" },
                  { icon: Wind, label: "Climate Control" },
                  { icon: Coffee, label: "In-Room Amenities" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <item.icon className="h-8 w-8 text-accent" />
                    </div>
                    <p className="font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rooms Section */}
          <section className="py-20 bg-background">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                  Rooms for Every Traveler
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  From cozy queen rooms to spacious double queens, find the perfect accommodation
                  for your stay in Locust Grove.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {usingDb && (roomsLoading || roomTypes.length === 0) ? (
                  Array.from({ length: 3 }).map((_, i) => (
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
                  roomTypes.slice(0, 3).map((roomType) => (
                    <RoomCard key={roomType.code} roomType={roomType} />
                  ))
                )}
              </div>

              <div className="text-center mt-12">
                <Link to="/rooms">
                  <Button size="lg" variant="outline">
                    View All Rooms
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Location Highlight */}
          <section className="py-20 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                    Close to What Matters
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Conveniently located in Locust Grove, Georgia, Executive Inn puts you
                    within easy reach of local attractions, dining, and major highways.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <p className="font-medium">{HOTEL_ADDRESS_LINE_1}</p>
                        <p className="text-sm text-muted-foreground">
                          {HOTEL_CITY}, {HOTEL_REGION} {HOTEL_POSTAL}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-accent mt-1" />
                      <p className="text-sm text-muted-foreground">
                        Easy access to I-75, shopping, and local attractions
                      </p>
                    </div>
                  </div>
                  <Link to="/location" className="inline-block mt-6">
                    <Button variant="outline">Get Directions</Button>
                  </Link>
                </div>
                <div className="aspect-[4/3] bg-muted rounded-2xl shadow-lg overflow-hidden">
                  <img
                    src={heroImage}
                    alt="Executive Inn location in Locust Grove, Georgia"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                Ready to Book Your Stay?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Experience comfortable accommodations and friendly service at Executive Inn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/book">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Book Now
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
