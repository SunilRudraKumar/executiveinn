import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Amenities from "./pages/Amenities";
import Gallery from "./pages/Gallery";
import Location from "./pages/Location";
import Policies from "./pages/Policies";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import { AuthGuard } from "@/components/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/rooms/:type" element={<RoomDetail />} />
              <Route path="/amenities" element={<Amenities />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/location" element={<Location />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Book />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
