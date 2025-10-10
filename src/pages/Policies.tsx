import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Policies = () => {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are your check-in and check-out times?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request, subject to availability."
        }
      },
      {
        "@type": "Question",
        "name": "Do you have smoking rooms available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer both smoking and non-smoking rooms. Please specify your preference when booking to ensure room availability."
        }
      },
      {
        "@type": "Question",
        "name": "What is your cancellation policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cancellations made 24 hours prior to arrival will receive a full refund. Cancellations made less than 24 hours before check-in may be subject to a one-night room charge."
        }
      },
      {
        "@type": "Question",
        "name": "Are pets allowed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Please contact us directly to inquire about our pet policy. Some restrictions may apply."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Policies & FAQs | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Review Executive Inn's hotel policies including check-in/out times, smoking policy, cancellation policy, and more. Find answers to frequently asked questions." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/policies" />
      </Helmet>

      <StructuredData type="FAQPage" data={faqData} />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-primary text-primary-foreground py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Hotel Policies
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl">
                Please review our policies to ensure a smooth and pleasant stay at Executive Inn.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-4xl px-4 lg:px-8">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="checkin" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Check-In & Check-Out
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <div>
                      <p className="font-medium text-foreground mb-1">Check-In Time:</p>
                      <p>3:00 PM</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Check-Out Time:</p>
                      <p>11:00 AM</p>
                    </div>
                    <p>
                      Early check-in and late check-out may be available upon request, subject to availability. 
                      Please contact the front desk to arrange.
                    </p>
                    <p>
                      Valid government-issued photo identification and credit card are required at check-in.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="smoking" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Smoking Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      Executive Inn offers both smoking and non-smoking rooms to accommodate all guests.
                    </p>
                    <p>
                      Smoking is only permitted in designated smoking rooms. Smoking in non-smoking rooms 
                      will result in a cleaning fee of $250.
                    </p>
                    <p>
                      Please specify your room preference (smoking or non-smoking) when making your reservation 
                      to ensure availability.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cancellation" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Cancellation Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      Cancellations made 24 hours or more prior to arrival will receive a full refund.
                    </p>
                    <p>
                      Cancellations made less than 24 hours before the scheduled check-in time may be 
                      subject to a one-night room charge.
                    </p>
                    <p>
                      No-shows will be charged the full amount of the reservation.
                    </p>
                    <p>
                      To cancel or modify your reservation, please contact us at (770) 957-9995.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Payment Methods
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>We accept the following payment methods:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Visa, MasterCard, American Express, Discover</li>
                      <li>Cash</li>
                      <li>Debit cards</li>
                    </ul>
                    <p>
                      A valid credit card or cash deposit is required at check-in to cover incidental charges.
                    </p>
                    <p>
                      Payment is due at check-in unless prepaid through an advance reservation.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pets" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Pet Policy
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      Please contact us directly at (770) 957-9995 to inquire about our pet policy.
                    </p>
                    <p>
                      Some restrictions may apply regarding pet size, breed, and number of pets.
                    </p>
                    <p>
                      Additional fees and deposits may be required for guests traveling with pets.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="children" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Children & Extra Guests
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      Children 12 and under stay free when using existing bedding.
                    </p>
                    <p>
                      Maximum occupancy limits vary by room type. Please refer to specific room details 
                      or contact us for more information.
                    </p>
                    <p>
                      Additional guests beyond the standard occupancy may incur extra charges.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="damage" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Damage & Liability
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      Guests are responsible for any damage to the room or hotel property during their stay.
                    </p>
                    <p>
                      Executive Inn is not responsible for lost or stolen items. Please use the front desk 
                      safe for valuable belongings.
                    </p>
                    <p>
                      Please report any existing damage or maintenance issues to the front desk upon check-in.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="quiet" className="bg-card border rounded-xl px-6">
                  <AccordionTrigger className="text-lg font-serif hover:no-underline">
                    Quiet Hours
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-3">
                    <p>
                      To ensure all guests enjoy a peaceful stay, quiet hours are observed from 10:00 PM to 7:00 AM.
                    </p>
                    <p>
                      Please be considerate of other guests during these hours and keep noise to a minimum.
                    </p>
                    <p>
                      Management reserves the right to take action, including eviction without refund, 
                      for excessive noise or disruptive behavior.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">
                Have Questions?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                If you need clarification on any of our policies or have specific questions 
                about your stay, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+17709579995"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
                >
                  Call (770) 957-9995
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Policies;
