import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getRoomTypes, getRoomTypeByCode, calculateStayCost, RoomType } from "@/lib/roomUtils";
import { Calendar } from "@/components/ui/calendar";
import { format, differenceInDays } from "date-fns";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Book = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Parse URL params
  const urlCheckIn = searchParams.get("checkIn");
  const urlCheckOut = searchParams.get("checkOut");
  const urlRoomType = searchParams.get("roomType");
  const urlAdults = searchParams.get("adults") || "2";
  const urlChildren = searchParams.get("children") || "0";

  // State
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    urlCheckIn ? new Date(urlCheckIn) : undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    urlCheckOut ? new Date(urlCheckOut) : undefined
  );
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | undefined>(
    urlRoomType ? getRoomTypeByCode(urlRoomType.toUpperCase()) : undefined
  );
  const [guestInfo, setGuestInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const roomTypes = getRoomTypes();
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const cost = selectedRoomType && nights > 0 ? calculateStayCost(selectedRoomType, nights) : null;

  const handleRoomSelect = (roomType: RoomType) => {
    setSelectedRoomType(roomType);
    setStep(2);
  };

  const handleGuestInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(3);
  };

  const handleConfirm = () => {
    const confirmationNumber = `EI${Date.now().toString().slice(-8)}`;
    navigate(`/thank-you?confirmation=${confirmationNumber}`);
  };

  return (
    <>
      <Helmet>
        <title>Book Your Stay | Executive Inn - Locust Grove, GA</title>
        <meta name="description" content="Book your room at Executive Inn, Locust Grove. Choose from our comfortable rooms and complete your reservation online." />
        <link rel="canonical" href="https://executiveinn-locustgrove.com/book" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-muted/30 py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-4">
                {[
                  { num: 1, label: "Choose Room" },
                  { num: 2, label: "Guest Details" },
                  { num: 3, label: "Review & Confirm" },
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center">
                    <div
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-full transition-colors",
                        step >= s.num ? "bg-accent text-accent-foreground" : "bg-card"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-semibold",
                          step > s.num ? "bg-accent-foreground/20" : ""
                        )}
                      >
                        {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                      </div>
                      <span className="font-medium hidden sm:inline">{s.label}</span>
                    </div>
                    {idx < 2 && <ChevronRight className="h-5 w-5 text-muted-foreground mx-2" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="bg-card p-6 rounded-2xl border">
                      <h2 className="text-2xl font-serif font-bold mb-6">Choose Your Room Type</h2>
                      <div className="space-y-4">
                        {roomTypes.map((roomType) => (
                          <div
                            key={roomType.code}
                            className={cn(
                              "p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
                              selectedRoomType?.code === roomType.code
                                ? "border-accent bg-accent/5"
                                : "border-border hover:border-accent/50"
                            )}
                            onClick={() => handleRoomSelect(roomType)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-semibold mb-2">
                                  {roomType.name}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {roomType.description}
                                </p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                  <span className="px-2 py-1 bg-muted rounded">
                                    {roomType.occupancy} guests
                                  </span>
                                  <span
                                    className={cn(
                                      "px-2 py-1 rounded",
                                      roomType.isSmoking ? "bg-destructive/10" : "bg-accent/10"
                                    )}
                                  >
                                    {roomType.isSmoking ? "Smoking" : "Non-Smoking"}
                                  </span>
                                  <span className="px-2 py-1 bg-muted rounded">
                                    {roomType.count} available
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-2xl font-serif font-bold text-accent">
                                  ${roomType.rate}
                                </p>
                                <p className="text-xs text-muted-foreground">per night</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-card p-8 rounded-2xl border">
                    <h2 className="text-2xl font-serif font-bold mb-6">Guest Details</h2>
                    <form onSubmit={handleGuestInfoSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={guestInfo.firstName}
                            onChange={(e) =>
                              setGuestInfo({ ...guestInfo, firstName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={guestInfo.lastName}
                            onChange={(e) =>
                              setGuestInfo({ ...guestInfo, lastName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={guestInfo.email}
                          onChange={(e) =>
                            setGuestInfo({ ...guestInfo, email: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={guestInfo.phone}
                          onChange={(e) =>
                            setGuestInfo({ ...guestInfo, phone: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="requests">Special Requests</Label>
                        <Textarea
                          id="requests"
                          value={guestInfo.specialRequests}
                          onChange={(e) =>
                            setGuestInfo({ ...guestInfo, specialRequests: e.target.value })
                          }
                          placeholder="Any special requirements or requests?"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(1)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button type="submit" className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
                          Continue
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-card p-8 rounded-2xl border">
                    <h2 className="text-2xl font-serif font-bold mb-6">Review Your Reservation</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Guest Information</h3>
                        <div className="space-y-2 text-sm">
                          <p>
                            <span className="text-muted-foreground">Name:</span>{" "}
                            {guestInfo.firstName} {guestInfo.lastName}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Email:</span> {guestInfo.email}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Phone:</span> {guestInfo.phone}
                          </p>
                          {guestInfo.specialRequests && (
                            <p>
                              <span className="text-muted-foreground">Special Requests:</span>{" "}
                              {guestInfo.specialRequests}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3">Important Policies</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Check-in: 3:00 PM | Check-out: 11:00 AM</li>
                          <li>• Valid ID and credit card required at check-in</li>
                          <li>• Cancellation within 24 hours for full refund</li>
                          <li>• Smoking only in designated rooms</li>
                        </ul>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(2)}
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleConfirm}
                          className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          Confirm Reservation
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-card p-6 rounded-2xl border shadow-lg">
                  <h3 className="font-serif font-semibold mb-4">Reservation Summary</h3>

                  {selectedRoomType && (
                    <>
                      <div className="space-y-3 mb-6 pb-6 border-b">
                        <div>
                          <p className="text-sm text-muted-foreground">Room Type</p>
                          <p className="font-medium">{selectedRoomType.name}</p>
                        </div>
                        
                        {checkIn && checkOut && (
                          <>
                            <div>
                              <p className="text-sm text-muted-foreground">Check-in</p>
                              <p className="font-medium">{format(checkIn, "PPP")}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Check-out</p>
                              <p className="font-medium">{format(checkOut, "PPP")}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Nights</p>
                              <p className="font-medium">{nights}</p>
                            </div>
                          </>
                        )}
                      </div>

                      {cost && (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Room (${selectedRoomType.rate} × {nights})</span>
                            <span className="font-medium">${cost.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Taxes & Fees</span>
                            <span className="font-medium">${cost.tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-serif font-bold pt-3 border-t">
                            <span>Total</span>
                            <span className="text-accent">${cost.total.toFixed(2)}</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {!selectedRoomType && (
                    <p className="text-sm text-muted-foreground">
                      Select a room type to see pricing details
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Book;
