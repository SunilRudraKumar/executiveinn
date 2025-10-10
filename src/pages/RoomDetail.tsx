import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingWidget } from "@/components/BookingWidget";
import { StructuredData } from "@/components/StructuredData";
import { getRoomTypeByCode } from "@/lib/roomUtils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import roomQueenImg from "@/assets/room-queen.jpg";
import roomKingImg from "@/assets/room-king.jpg";
import roomDoubleQueenImg from "@/assets/room-double-queen.jpg";

const getRoomImage = (code: string) => {
  switch (code) {
    case "NSK":
    case "SK":
      return roomKingImg;
    case "NSQQ":
      return roomDoubleQueenImg;
    default:
      return roomQueenImg;
  }
};

const RoomDetail = () => {
  const { type } = useParams<{ type: string }>();
  const roomType = type ? getRoomTypeByCode(type.toUpperCase()) : undefined;

  if (!roomType) {
    return <Navigate to="/rooms" replace />;
  }

  const roomImage = getRoomImage(roomType.code);

  return (
    <>
      <Helmet>
        <title>{roomType.name} | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content={`${roomType.description} Book your ${roomType.name} room at Executive Inn today.`} />
        <link rel="canonical" href={`https://executiveinn-locustgrove.com/rooms/${roomType.code.toLowerCase()}`} />
      </Helmet>

      <StructuredData type="Hotel" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Image */}
          <section className="aspect-[21/9] bg-muted relative overflow-hidden">
            <img
              src={roomImage}
              alt={`${roomType.name} room interior at Executive Inn`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge variant={roomType.isSmoking ? "destructive" : "secondary"} className="text-lg py-2 px-4">
                {roomType.isSmoking ? "Smoking Room" : "Non-Smoking Room"}
              </Badge>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                      {roomType.name}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                      {roomType.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Up to {roomType.occupancy} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{roomType.count} rooms available</span>
                    </div>
                  </div>

                  <div className="border-t pt-8">
                    <h2 className="text-2xl font-serif font-semibold mb-6">Room Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {roomType.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-4 w-4 text-accent" />
                          </div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-8">
                    <h2 className="text-2xl font-serif font-semibold mb-4">Room Details</h2>
                    <div className="prose prose-sm max-w-none">
                      <p>
                        Our {roomType.name.toLowerCase()} offers the perfect blend of comfort and 
                        convenience for your stay in Locust Grove. Each room is thoughtfully appointed 
                        with modern amenities to ensure a pleasant experience.
                      </p>
                      <p>
                        {roomType.isSmoking 
                          ? "This is a designated smoking room. Please note our smoking policy in guest policies."
                          : "This is a non-smoking room to ensure a fresh, clean environment for all guests."
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    <div className="bg-card p-6 rounded-2xl shadow-lg border">
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-2">Starting at</p>
                        <p className="text-4xl font-serif font-bold text-accent">
                          ${roomType.rate}
                        </p>
                        <p className="text-sm text-muted-foreground">per night</p>
                      </div>

                      <Link to={`/book?roomType=${roomType.code}`}>
                        <Button className="w-full mb-4 bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                          Book This Room
                        </Button>
                      </Link>

                      <Link to="/contact">
                        <Button variant="outline" className="w-full" size="lg">
                          Contact Us
                        </Button>
                      </Link>
                    </div>

                    <div className="bg-muted/50 p-6 rounded-2xl">
                      <h3 className="font-serif font-semibold mb-4">Need Help?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our team is here to assist you with any questions about this room or your reservation.
                      </p>
                      <a href="tel:+17709579995" className="text-accent font-medium hover:underline">
                        (770) 957-9995
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-6xl px-4 lg:px-8">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">
                Ready to Book?
              </h2>
              <BookingWidget />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default RoomDetail;
