import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  HOTEL_EMAIL,
  HOTEL_PHONE_DISPLAY,
  HOTEL_PHONE_E164,
  HOTEL_ADDRESS_LINE_1,
  HOTEL_CITY,
  HOTEL_REGION,
  HOTEL_POSTAL
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Executive Inn</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Clean, comfortable rooms at a great value in Locust Grove, Georgia.
              Your home away from home with exceptional hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/rooms" className="text-sm hover:text-accent transition-colors">
                Rooms
              </Link>
              <Link to="/amenities" className="text-sm hover:text-accent transition-colors">
                Amenities
              </Link>
              <Link to="/location" className="text-sm hover:text-accent transition-colors">
                Location
              </Link>
              <Link to="/policies" className="text-sm hover:text-accent transition-colors">
                Policies
              </Link>
              <Link to="/contact" className="text-sm hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Contact Us</h4>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  {HOTEL_ADDRESS_LINE_1}<br />
                  {HOTEL_CITY}, {HOTEL_REGION} {HOTEL_POSTAL}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href={`tel:${HOTEL_PHONE_E164}`} className="hover:text-accent transition-colors">
                  {HOTEL_PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href={`mailto:${HOTEL_EMAIL}`} className="hover:text-accent transition-colors">
                  {HOTEL_EMAIL}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Executive Inn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
