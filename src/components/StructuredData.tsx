import { Helmet } from "react-helmet-async";
import { HOTEL_NAME, HOTEL_ADDRESS_LINE_1, HOTEL_CITY, HOTEL_REGION, HOTEL_POSTAL, HOTEL_COUNTRY, HOTEL_PHONE_E164, HOTEL_EMAIL } from "@/lib/constants";

interface StructuredDataProps {
  type: "Hotel" | "FAQPage" | "WebSite";
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseHotelData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": HOTEL_NAME,
    "image": "/og-image.jpg",
    "description": "Clean, comfortable rooms at a great value in Locust Grove, Georgia.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": HOTEL_ADDRESS_LINE_1,
      "addressLocality": HOTEL_CITY,
      "addressRegion": HOTEL_REGION,
      "postalCode": HOTEL_POSTAL,
      "addressCountry": HOTEL_COUNTRY
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.3456",
      "longitude": "-84.1090"
    },
    "telephone": HOTEL_PHONE_E164,
    "email": HOTEL_EMAIL,
    "priceRange": "$$",
    "checkinTime": "15:00",
    "checkoutTime": "11:00",
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi" },
      { "@type": "LocationFeatureSpecification", "name": "Free Parking" },
      { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" },
      { "@type": "LocationFeatureSpecification", "name": "Non-Smoking Rooms" }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Executive Inn",
    "url": "https://executiveinn-locustgrove.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://executiveinn-locustgrove.com/rooms?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  let structuredData;
  
  if (type === "Hotel") {
    structuredData = baseHotelData;
  } else if (type === "WebSite") {
    structuredData = websiteData;
  } else if (type === "FAQPage") {
    structuredData = data;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
