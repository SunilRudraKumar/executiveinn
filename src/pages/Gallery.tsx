import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";

const galleryImages = [
  { id: 1, title: "Queen Room", category: "Rooms" },
  { id: 2, title: "King Room", category: "Rooms" },
  { id: 3, title: "Double Queen Room", category: "Rooms" },
  { id: 4, title: "Exterior View", category: "Property" },
  { id: 5, title: "Front Entrance", category: "Property" },
  { id: 6, title: "Parking Area", category: "Property" },
  { id: 7, title: "Room Detail", category: "Rooms" },
  { id: 8, title: "Bathroom", category: "Rooms" },
  { id: 9, title: "Welcome Area", category: "Property" },
];

const Gallery = () => {
  return (
    <>
      <Helmet>
        <title>Photo Gallery | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Browse photos of Executive Inn's comfortable rooms and property. See what awaits you at our Locust Grove, GA location." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/gallery" />
      </Helmet>

      <StructuredData type="Hotel" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-primary text-primary-foreground py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Photo Gallery
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl">
                Take a visual tour of Executive Inn. Browse photos of our comfortable rooms, 
                clean facilities, and welcoming property.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <div
                    key={image.id}
                    className="group aspect-[4/3] bg-muted rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <img
                      src="/placeholder.svg"
                      alt={`${image.title} at Executive Inn, Locust Grove`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <p className="text-sm font-medium">{image.category}</p>
                        <p className="text-lg font-serif font-semibold">{image.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                See It for Yourself
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Photos only tell part of the story. Experience the comfort and hospitality 
                of Executive Inn in person. Book your stay today.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Gallery;
