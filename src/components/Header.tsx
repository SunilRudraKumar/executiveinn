import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HOTEL_PHONE_E164, HOTEL_PHONE_DISPLAY } from "@/lib/constants";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Rooms", href: "/rooms" },
  { name: "Amenities", href: "/amenities" },
  // { name: "Gallery", href: "/gallery" },
  { name: "Location", href: "/location" },
  { name: "Policies", href: "/policies" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-serif font-bold text-primary">Executive Inn</span>
          </Link>
        </div>

        <div className="flex lg:hidden gap-2">
          <a href={`tel:${HOTEL_PHONE_E164}`} className="text-primary">
            <Phone className="h-6 w-6" aria-label="Call Executive Inn" />
          </a>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === item.href ? "text-accent" : "text-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
          <a href={`tel:${HOTEL_PHONE_E164}`} className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors">
            <Phone className="h-4 w-4" />
            <span>{HOTEL_PHONE_DISPLAY}</span>
          </a>
          <Link to="/book">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Book Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/book"
              className="block"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="w-full mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
