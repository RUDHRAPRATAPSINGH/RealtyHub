import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMenu from '@/components/UserMenu';
import { testimonials } from '@/data/properties';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const Testimonials = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

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
              <Link to="/listings" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors">
                Browse Properties
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-blue-600 font-medium transition-colors">
                About
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            What Our Customers Say
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in">
            Real stories from real customers who found their dream homes through RealtyHub
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.id} className={`animate-fade-in hover-scale transition-all duration-300 ${index % 2 === 0 ? 'animate-delay-100' : 'animate-delay-200'}`}>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={`https://images.unsplash.com/${testimonial.image}?w=80&h=80&fit=crop&crop=face`}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="relative">
                        <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                        <p className="text-muted-foreground italic pl-6">
                          "{testimonial.text}"
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Thousands</h2>
            <p className="text-muted-foreground">Join our growing community of satisfied customers</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in">
              <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center animate-scale-in">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of satisfied customers who found their perfect property with RealtyHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/listings">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Browse Properties
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </Link>
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
              <p className="text-gray-400">Your trusted partner in finding the perfect property</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/listings" className="hover:text-white transition-colors">Browse Properties</Link></li>
                <li><Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
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

export default Testimonials;