import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, MapPin, Phone, Mail } from "lucide-react";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const confirmationNumber = searchParams.get("confirmation") || "N/A";

  return (
    <>
      <Helmet>
        <title>Reservation Confirmed | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Your reservation at Executive Inn has been confirmed. We look forward to welcoming you!" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-muted/30 py-16">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <div className="bg-card p-8 lg:p-12 rounded-2xl border shadow-lg text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-accent" />
              </div>

              <h1 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Reservation Confirmed!
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Thank you for choosing Executive Inn. We're excited to welcome you to Locust Grove!
              </p>

              <div className="bg-accent/5 p-6 rounded-xl mb-8">
                <p className="text-sm text-muted-foreground mb-2">Confirmation Number</p>
                <p className="text-3xl font-serif font-bold text-accent tracking-wider">
                  {confirmationNumber}
                </p>
              </div>

              <div className="text-left space-y-6 mb-8">
                <div>
                  <h2 className="font-serif font-semibold mb-3">What's Next?</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>
                        A confirmation email has been sent to your email address with your reservation details
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>
                        Please bring a valid government-issued photo ID and credit card for check-in
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>
                        Check-in time is 3:00 PM and check-out is 11:00 AM
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>
                        For cancellations or changes, contact us at least 24 hours before check-in
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h2 className="font-serif font-semibold mb-4">Contact Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent flex-shrink-0" />
                      <div className="text-sm">
                        <p>4881 Bill Gardner Parkway</p>
                        <p className="text-muted-foreground">Locust Grove, GA 30248</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                      <a href="tel:+17709579995" className="text-sm hover:text-accent transition-colors">
                        (770) 957-9995
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                      <a href="mailto:info@executiveinn.com" className="text-sm hover:text-accent transition-colors">
                        info@executiveinn.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Return to Home
                  </Button>
                </Link>
                <Link to="/location">
                  <Button size="lg" variant="outline">
                    Get Directions
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Have questions about your reservation?
              </p>
              <Link to="/contact" className="text-accent hover:underline font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ThankYou;
