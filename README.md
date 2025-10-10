# Executive Inn - Locust Grove, GA

A production-ready, SEO-optimized website for Executive Inn motel in Locust Grove, Georgia. Built with React, TypeScript, and Tailwind CSS, featuring a complete booking flow and elegant hotel-boutique design.

## 🌟 Features

- **Complete Information Architecture**: Home, Rooms, Amenities, Gallery, Location, Policies, Contact, and Booking pages
- **Happy Path Booking Flow**: Multi-step booking process with room selection, guest details, and confirmation
- **Room Inventory Management**: Dynamic room data from JSON with computed availability and pricing
- **SEO Optimized**: 
  - Unique meta titles and descriptions per page
  - JSON-LD structured data (Hotel, LocalBusiness, FAQPage, WebSite)
  - Sitemap.xml and robots.txt
  - Semantic HTML with proper heading hierarchy
  - Canonical tags and Open Graph metadata
- **Accessible**: WCAG 2.2 AA compliant with keyboard navigation, ARIA labels, and focus states
- **Performance Optimized**: 
  - Lazy-loaded images with proper alt text
  - Responsive images
  - Minimal bundle size
  - Progressive enhancement
- **Mobile-First Design**: Fully responsive with sticky navigation and mobile-optimized booking widget

## 🎨 Design System

### Color Palette
- **Primary (Deep Navy)**: `hsl(206, 73%, 11%)` - #0B1C2C
- **Accent (Warm Gold)**: `hsl(41, 67%, 60%)` - #D4A85A
- **Background (Soft White)**: `hsl(0, 0%, 97.3%)` - #F8FAFC
- **Foreground (Charcoal)**: `hsl(222, 47%, 11%)` - #0F172A

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: System font stack (Inter/Segoe UI/SF Pro)

### Components
- Rounded corners (xl-2xl)
- Soft shadows
- Subtle hover effects
- Consistent spacing using Tailwind

## 📊 Room Inventory

The site manages 5 room types across 2 floors (38 total rooms):
- **NSQ**: Non-Smoking Queen (17 rooms)
- **SQ**: Smoking Queen (12 rooms)
- **NSQQ**: Non-Smoking Queen/Queen (4 rooms)
- **NSK**: Non-Smoking King (4 rooms)
- **SK**: Smoking King (1 room)

Room data is stored in `src/data/rooms.json` and computed dynamically for counts and availability.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development
The app runs on `http://localhost:8080` by default.

## 📁 Project Structure

```
src/
├── assets/              # Images (hero, room photos)
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Site footer
│   ├── BookingWidget.tsx
│   ├── RoomCard.tsx
│   └── StructuredData.tsx
├── data/
│   └── rooms.json      # Room inventory data
├── lib/
│   ├── utils.ts        # Utilities (cn helper)
│   └── roomUtils.ts    # Room data utilities
├── pages/
│   ├── Index.tsx       # Homepage
│   ├── Rooms.tsx       # Room listing
│   ├── RoomDetail.tsx  # Individual room pages
│   ├── Amenities.tsx
│   ├── Gallery.tsx
│   ├── Location.tsx
│   ├── Policies.tsx
│   ├── Contact.tsx
│   ├── Book.tsx        # Booking flow
│   ├── ThankYou.tsx    # Confirmation page
│   └── NotFound.tsx    # 404 page
└── App.tsx             # App router

public/
├── robots.txt          # Search engine crawling rules
├── sitemap.xml         # Site structure for SEO
├── humans.txt          # Credits
└── og-image.jpg        # Social sharing image
```

## 🔧 Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Routing
- **React Helmet Async** - SEO meta tags
- **date-fns** - Date handling
- **shadcn/ui** - UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📈 SEO Implementation

### Meta Tags
Each page has unique:
- Title tag (< 60 characters)
- Meta description (< 160 characters)
- Canonical URL
- Open Graph tags
- Twitter Card tags

### Structured Data (JSON-LD)
- **Hotel/LodgingBusiness**: Name, address, phone, amenities, check-in/out times
- **LocalBusiness**: Geographic information for local SEO
- **WebSite**: SearchAction for site search
- **FAQPage**: Structured FAQ data on Policies page

### Technical SEO
- Semantic HTML5 elements
- Single H1 per page
- Proper heading hierarchy (H1 → H2 → H3)
- Image alt attributes
- Descriptive internal linking
- Mobile-responsive
- Fast loading times

## 🎯 Booking Flow

1. **Choose Room Type**: Browse room options with pricing and amenities
2. **Guest Details**: Enter contact information and special requests
3. **Review & Confirm**: Review reservation details and policies
4. **Confirmation**: Receive mock confirmation number

All booking data is handled client-side (no backend). Ready for backend integration.

## 🌐 Pages

- **/** - Homepage with hero, booking widget, room preview, and CTAs
- **/rooms** - Complete room listing with filtering
- **/rooms/:type** - Detailed room information (NSQ, SQ, NSQQ, NSK, SK)
- **/amenities** - Property amenities and features
- **/gallery** - Photo gallery
- **/location** - Map, directions, and nearby attractions
- **/policies** - Hotel policies with FAQ accordion
- **/contact** - Contact form and information
- **/book** - Multi-step booking process
- **/thank-you** - Booking confirmation

## 📱 Mobile Optimization

- Sticky header navigation
- Mobile-friendly booking widget
- Touch-optimized interactions
- Responsive images
- Collapsible navigation menu

## ♿ Accessibility

- Keyboard navigable
- ARIA labels on interactive elements
- Focus visible states
- Semantic landmarks
- Sufficient color contrast
- Skip to main content link
- Form labels and error messages
- Accessible date picker

## 🔄 Future Enhancements

When adding a real backend:
- Connect booking flow to reservation system
- Real-time room availability
- Payment processing integration
- Email confirmations
- Admin dashboard for room management
- Customer reviews and ratings
- Photo gallery management

## 📞 Contact Information

**Executive Inn**  
4881 Bill Gardner Parkway  
Locust Grove, GA 30248  
Phone: (770) 957-9995  
Email: info@executiveinn.com

## 📄 License

This project was built with Lovable (lovable.dev).

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
