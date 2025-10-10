import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";
import { HOTEL_ADDRESS_LINE_1, HOTEL_CITY, HOTEL_REGION, HOTEL_POSTAL, HOTEL_PHONE_E164, HOTEL_PHONE_DISPLAY, HOTEL_EMAIL } from "@/lib/constants";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock form submission
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Contact Executive Inn in Locust Grove, GA. Call (770) 957-2671 or send us a message. We're here to help with your reservation and questions." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/contact" />
      </Helmet>

      <StructuredData type="Hotel" />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="bg-primary text-primary-foreground py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-3xl">
                Have a question or need assistance? We're here to help. Reach out to us 
                and we'll respond as soon as possible.
              </p>
            </div>
          </section>

          <section className="py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold mb-6">Get in Touch</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Address</p>
                          <address className="not-italic text-sm text-muted-foreground">
                            {HOTEL_ADDRESS_LINE_1}<br />
                            {HOTEL_CITY}, {HOTEL_REGION} {HOTEL_POSTAL}
                          </address>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Phone</p>
                          <a
                            href={`tel:${HOTEL_PHONE_E164}`}
                            className="text-sm text-accent hover:underline"
                          >
                            {HOTEL_PHONE_DISPLAY}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <p className="font-semibold mb-1">Email</p>
                          <a
                            href={`mailto:${HOTEL_EMAIL}`}
                            className="text-sm text-accent hover:underline"
                          >
                            {HOTEL_EMAIL}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <h3 className="font-serif font-semibold mb-3">Office Hours</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Front Desk: 24/7</p>
                      <p>Check-in: 3:00 PM</p>
                      <p>Check-out: 11:00 AM</p>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-3">
                  <div className="bg-card p-8 rounded-2xl border shadow-lg">
                    <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(123) 456-7890"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="How can we help you?"
                          rows={6}
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        Send Message
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        We typically respond within 24 hours. For immediate assistance, 
                        please call us at {HOTEL_PHONE_DISPLAY}.
                      </p>
                    </form>
                  </div>
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

export default Contact;
