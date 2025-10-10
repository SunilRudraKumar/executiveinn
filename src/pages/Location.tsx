import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { MapPin, Navigation, Car } from "lucide-react";
import { HOTEL_ADDRESS_LINE_1, HOTEL_CITY, HOTEL_REGION, HOTEL_POSTAL, HOTEL_MAPS_EMBED } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const Location = () => {
  return (
    <>
      <Helmet>
        <title>Location & Directions | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Find Executive Inn at 4854 Bill Gardner Pkwy, Locust Grove, GA 30248. Easy access from I-75. Get directions and see nearby attractions." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/location" />
      </Helmet>

      <StructuredData type="Hotel" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-primary text-primary-foreground py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Location & Directions
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl">
                Conveniently located in Locust Grove, Georgia, with easy access to I-75 
                and local attractions.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Address & Contact */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6">Our Address</h2>
                    <div className="bg-card p-6 rounded-2xl border space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <address className="not-italic">
                          <p className="font-semibold text-lg">Executive Inn</p>
                          <p className="text-muted-foreground">
                            {HOTEL_ADDRESS_LINE_1}<br />
                            {HOTEL_CITY}, {HOTEL_REGION} {HOTEL_POSTAL}
                          </p>
                        </address>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <p className="text-sm text-muted-foreground mb-3">Get directions:</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            asChild
                            className="bg-accent text-accent-foreground hover:bg-accent/90"
                          >
                            <a
                              href={`https://maps.google.com/?q=${encodeURIComponent(`${HOTEL_ADDRESS_LINE_1} ${HOTEL_CITY} ${HOTEL_REGION} ${HOTEL_POSTAL}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Navigation className="mr-2 h-4 w-4" />
                              Google Maps
                            </a>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                          >
                            <a
                              href={`https://maps.apple.com/?q=${encodeURIComponent(`${HOTEL_ADDRESS_LINE_1} ${HOTEL_CITY} ${HOTEL_REGION} ${HOTEL_POSTAL}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Navigation className="mr-2 h-4 w-4" />
                              Apple Maps
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-6">Driving Directions</h2>
                    <div className="bg-card p-6 rounded-2xl border space-y-4">
                      <div className="flex items-start gap-4">
                        <Car className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold mb-2">From I-75 South:</p>
                          <p className="text-sm text-muted-foreground">
                            Take Exit 212 toward Locust Grove. Turn right onto Bill Gardner Parkway. 
                            Executive Inn will be on your right.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 pt-4 border-t">
                        <Car className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold mb-2">From I-75 North:</p>
                          <p className="text-sm text-muted-foreground">
                            Take Exit 212 toward Locust Grove. Turn left onto Bill Gardner Parkway. 
                            Executive Inn will be on your right.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-6">Find Us on the Map</h2>
                  <div className="aspect-[4/3] bg-muted rounded-2xl shadow-lg overflow-hidden">
                    <iframe
                      title="Executive Inn Map"
                      className="w-full h-full"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src={HOTEL_MAPS_EMBED}
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h2 className="text-3xl font-serif font-bold mb-8 text-center">
                Nearby Attractions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: "I-75 Access", distance: "0.5 miles" },
                  { name: "Local Shopping", distance: "1 mile" },
                  { name: "Restaurants", distance: "0.3 miles" },
                  { name: "Gas Stations", distance: "0.2 miles" },
                  { name: "Atlanta", distance: "35 miles" },
                  { name: "Macon", distance: "40 miles" },
                ].map((attraction) => (
                  <div
                    key={attraction.name}
                    className="bg-card p-6 rounded-xl border text-center"
                  >
                    <p className="font-semibold mb-1">{attraction.name}</p>
                    <p className="text-sm text-muted-foreground">{attraction.distance}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Location;
