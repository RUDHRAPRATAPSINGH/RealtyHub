import { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, Home, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '@/components/PropertyCard';
import UserMenu from '@/components/UserMenu';
import { allProperties, popularLocations } from '@/data/properties';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  const filteredAndSortedProperties = useMemo(() => {
    let filtered = allProperties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !propertyType || propertyType === 'all' || property.type === propertyType;
      
      let matchesPrice = true;
      if (priceRange && priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        if (max) {
          matchesPrice = property.price >= min && property.price <= max;
        } else {
          matchesPrice = property.price >= min;
        }
      }
      
      return matchesSearch && matchesType && matchesPrice;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'area-desc':
          return b.area - a.area;
        case 'newest':
          return b.yearBuilt - a.yearBuilt;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, propertyType, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-foreground">RealtyHub</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors">
                Home
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors">
                About
              </Link>
              <Link to="/testimonials" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors">
                Testimonials
              </Link>
              <Button onClick={toggleTheme} variant="outline" size="sm">
                {theme === 'light' ? '🌙' : '☀️'}
              </Button>
              {!isLoading && (
                isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <Link to="/signin">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Sign In
                    </Button>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search by location or property name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  list="locations"
                />
                <datalist id="locations">
                  {popularLocations.map((location, index) => (
                    <option key={index} value={location} />
                  ))}
                </datalist>
              </div>
              
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">Houses</SelectItem>
                  <SelectItem value="apartment">Apartments</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
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

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="area-desc">Largest First</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in animate-delay-200">
          <h1 className="text-2xl font-bold text-foreground">
            {filteredAndSortedProperties.length} Properties Found
          </h1>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Filter className="h-4 w-4" />
            <span>Showing {filteredAndSortedProperties.length} of {allProperties.length} properties</span>
          </div>
        </div>

        {/* Property Grid */}
        {filteredAndSortedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProperties.map((property, index) => (
              <div key={property.id} className={`animate-fade-in animate-delay-${(index % 6 + 1) * 100}`}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center animate-scale-in">
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">No Properties Found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setPropertyType('');
                  setPriceRange('');
                }}
                variant="outline"
              >
                Clear All Filters
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Listings;