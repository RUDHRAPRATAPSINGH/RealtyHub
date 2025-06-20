import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, Building, TreePine, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import UserMenu from '@/components/UserMenu';
import { featuredProperties, popularLocations, formatPrice } from '@/data/properties';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  const handleSearch = () => {
    console.log('Searching with:', { searchQuery, propertyType, priceRange });
    // Navigate to listings page with search parameters
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 animate-fade-in">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">RealtyHub</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/listings" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors hover-scale">
                Browse Properties
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors hover-scale">
                About
              </Link>
              <Link to="/testimonials" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors hover-scale">
                Testimonials
              </Link>
              <Button onClick={toggleTheme} variant="outline" size="sm" className="hover-scale">
                {theme === 'light' ? '🌙' : '☀️'}
              </Button>
              {!isLoading && (
                isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <Link to="/signin">
                    <Button className="bg-blue-600 hover:bg-blue-700 hover-scale">
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Find Your Perfect
            <span className="text-blue-600 block animate-bounce">Dream Home</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in animate-delay-200">
            Discover thousands of properties including homes, apartments, plots, and commercial spaces across India.
          </p>

          {/* Search Bar */}
          <div className="bg-card/90 backdrop-blur-md rounded-2xl shadow-xl p-6 max-w-4xl mx-auto animate-scale-in animate-delay-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 dark:border-gray-700"
                  list="locations"
                />
                <datalist id="locations">
                  {popularLocations.map((location, index) => (
                    <option key={index} value={location} />
                  ))}
                </datalist>
              </div>
              
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 dark:border-gray-700">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">
                    <div className="flex items-center space-x-2">
                      <Home className="h-4 w-4" />
                      <span>Houses</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="apartment">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Apartments</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="plot">
                    <div className="flex items-center space-x-2">
                      <Square className="h-4 w-4" />
                      <span>Plots</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="commercial">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4" />
                      <span>Commercial</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 dark:border-gray-700">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-2500000">Under ₹25L</SelectItem>
                  <SelectItem value="2500000-5000000">₹25L - ₹50L</SelectItem>
                  <SelectItem value="5000000-15000000">₹50L - ₹1.5Cr</SelectItem>
                  <SelectItem value="15000000-30000000">₹1.5Cr - ₹3Cr</SelectItem>
                  <SelectItem value="30000000">₹3Cr+</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleSearch}
                className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold hover-scale"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Properties</h2>
            <p className="text-muted-foreground">Discover our hand-picked selection of premium properties</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property, index) => (
              <div key={property.id} className={`animate-fade-in animate-delay-${(index + 1) * 100}`}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in animate-delay-700">
            <Link to="/listings">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg hover-scale">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose RealtyHub</h2>
            <p className="text-muted-foreground">Your trusted partner in real estate across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-scale-in animate-delay-100 group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <Search className="h-10 w-10 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">Smart Search</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Advanced filters with location suggestions to find exactly what you're looking for</p>
            </div>
            
            <div className="text-center p-6 animate-scale-in animate-delay-200 group">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <MapPin className="h-10 w-10 text-white animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-600 transition-colors">Prime Locations</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">Properties in the most desirable neighborhoods across major Indian cities</p>
            </div>
            
            <div className="text-center p-6 animate-scale-in animate-delay-300 group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg">
                <Home className="h-10 w-10 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-600 transition-colors">Verified Listings</h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors">All properties are verified and up-to-date with transparent pricing in INR</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-scale-in animate-delay-100">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Properties Listed</div>
            </div>
            <div className="animate-scale-in animate-delay-200">
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div className="animate-scale-in animate-delay-300">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cities Covered</div>
            </div>
            <div className="animate-scale-in animate-delay-400">
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-blue-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Home className="h-6 w-6" />
                <span className="text-xl font-bold">RealtyHub</span>
              </div>
              <p className="text-gray-400">Your trusted partner in finding the perfect property across India</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/listings" className="hover:text-white transition-colors story-link">Browse Properties</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors story-link">About Us</Link></li>
                <li><Link to="/testimonials" className="hover:text-white transition-colors story-link">Testimonials</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Property Types</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Houses</li>
                <li>Apartments</li>
                <li>Plots</li>
                <li>Commercial</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@realtyhub.in</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, Delhi, Bangalore</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RealtyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;