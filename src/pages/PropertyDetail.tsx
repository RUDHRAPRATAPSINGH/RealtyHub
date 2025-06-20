
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Home, 
  MapPin, 
  ArrowLeft, 
  Image as ImageIcon, 
  Home as HomeIcon,
  Square,
  Calendar,
  Heart,
  Share
} from 'lucide-react';
import { allProperties, formatPrice } from '@/data/properties';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = allProperties.find(p => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: 'I\'m interested in this property...'
  });
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link to="/listings">
            <Button>Back to Listings</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Generate multiple images for gallery (using the same image with different crop params)
  const images = [
    `https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=1200&q=80`,
    `https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=1200&q=80&crop=top`,
    `https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=1200&q=80&crop=center`,
    `https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=1200&q=80&crop=bottom`,
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Contact form submitted:', contactForm);
    toast({
      title: "Message Sent!",
      description: "Your message has been sent to the agent. They will contact you soon."
    });
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: 'I\'m interested in this property...'
    });
  };

  const handleScheduleViewing = () => {
    console.log('Schedule viewing for property:', property.id);
    toast({
      title: "Viewing Scheduled",
      description: "A viewing has been scheduled. The agent will contact you to confirm the time."
    });
  };

  const handleSaveProperty = () => {
    setIsSaved(!isSaved);
    console.log('Save property:', property.id, !isSaved);
    toast({
      title: isSaved ? "Property Removed" : "Property Saved",
      description: isSaved ? "Property removed from your saved list." : "Property saved to your favorites!"
    });
  };

  const handleShareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: "Link Copied",
          description: "Property link copied to clipboard!"
        });
      }).catch(() => {
        toast({
          title: "Share Property",
          description: "Property link: " + window.location.href
        });
      });
    }
    console.log('Share property:', property.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">RealtyHub</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/listings" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                All Properties
              </Link>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Agent
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/listings" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Listings</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${property.title} - ${index + 1}`}
                      className={`w-20 h-16 object-cover rounded cursor-pointer transition-all ${
                        currentImageIndex === index ? 'ring-2 ring-blue-600' : 'opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Details */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-600">{property.location}</span>
                  </div>
                  <Badge className="capitalize">{property.type}</Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <p className="text-4xl font-bold text-blue-600 mb-6">{formatPrice(property.price)}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <HomeIcon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm text-gray-500">Bedrooms</p>
                    <p className="font-semibold">{property.bedrooms || 'N/A'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <HomeIcon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm text-gray-500">Bathrooms</p>
                    <p className="font-semibold">{property.bathrooms || 'N/A'}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Square className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm text-gray-500">Area</p>
                    <p className="font-semibold">{property.area} sq ft</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm text-gray-500">Year Built</p>
                    <p className="font-semibold">{property.yearBuilt || 'N/A'}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <Separator className="my-6" />

                {property.amenities && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-600">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="I'm interested in this property..."
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Property Summary */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Property Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type</span>
                    <span className="font-medium capitalize">{property.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-medium text-blue-600">{formatPrice(property.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area</span>
                    <span className="font-medium">{property.area} sq ft</span>
                  </div>
                  {property.lotSize && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lot Size</span>
                      <span className="font-medium">{property.lotSize} acres</span>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Year Built</span>
                      <span className="font-medium">{property.yearBuilt}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button onClick={handleScheduleViewing} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                  <Button 
                    onClick={handleSaveProperty} 
                    variant="outline" 
                    className={`w-full ${isSaved ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved' : 'Save Property'}
                  </Button>
                  <Button onClick={handleShareProperty} variant="outline" className="w-full">
                    <Share className="h-4 w-4 mr-2" />
                    Share Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
