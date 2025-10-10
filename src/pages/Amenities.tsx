import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Wifi, Car, Wind, Coffee, Tv, Utensils, Snowflake, Key } from "lucide-react";

const amenities = [
  {
    icon: Wifi,
    title: "Free Wi-Fi",
    description: "High-speed wireless internet access throughout the property"
  },
  {
    icon: Car,
    title: "Free Parking",
    description: "Ample complimentary parking spaces for all guests"
  },
  {
    icon: Wind,
    title: "Climate Control",
    description: "Individual AC and heating units in every room"
  },
  {
    icon: Coffee,
    title: "In-Room Coffee",
    description: "Coffee maker with complimentary coffee and tea"
  },
  {
    icon: Tv,
    title: "Flat Screen TV",
    description: "Modern flat screen television with cable channels"
  },
  {
    icon: Utensils,
    title: "Microwave",
    description: "Microwave oven in every room for your convenience"
  },
  {
    icon: Snowflake,
    title: "Mini Fridge",
    description: "Compact refrigerator to store your beverages and snacks"
  },
  {
    icon: Key,
    title: "24/7 Front Desk",
    description: "Round-the-clock assistance for all your needs"
  }
];

const Amenities = () => {
  return (
    <>
      <Helmet>
        <title>Amenities | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Enjoy complimentary amenities at Executive Inn including free Wi-Fi, parking, in-room coffee, and more. Everything you need for a comfortable stay." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/amenities" />
      </Helmet>

      <StructuredData type="Hotel" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-primary text-primary-foreground py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Our Amenities
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl">
                Everything you need for a comfortable and convenient stay. We provide 
                thoughtful amenities to make your time with us as pleasant as possible.
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {amenities.map((amenity) => (
                  <div key={amenity.title} className="group">
                    <div className="bg-card p-6 rounded-2xl border hover:shadow-lg transition-all duration-300 h-full">
                      <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <amenity.icon className="h-7 w-7 text-accent" />
                      </div>
                      <h3 className="text-xl font-serif font-semibold mb-2">
                        {amenity.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                More Than Just a Room
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                At Executive Inn, we believe in providing value beyond just a place to sleep. 
                Our commitment to comfort and convenience ensures you have everything you need 
                for a productive or relaxing stay in Locust Grove, Georgia.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-serif font-semibold mb-2">Always Clean</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional housekeeping ensures every room meets our high standards
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-serif font-semibold mb-2">Great Value</h3>
                  <p className="text-sm text-muted-foreground">
                    Competitive rates without compromising on quality or comfort
                  </p>
                </div>
                <div className="bg-card p-6 rounded-xl border">
                  <h3 className="font-serif font-semibold mb-2">Convenient Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Easy access to I-75 and local attractions in Locust Grove
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Amenities;
