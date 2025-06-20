import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Users, Award, Shield, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMenu from '@/components/UserMenu';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

const About = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            About RealtyHub
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in">
            India's most trusted real estate platform, connecting dreams with reality since 2020. 
            We're committed to making property transactions transparent, efficient, and hassle-free.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="text-muted-foreground">Properties Listed</div>
              </CardContent>
            </Card>
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
                <div className="text-muted-foreground">Happy Customers</div>
              </CardContent>
            </Card>
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-muted-foreground">Cities Covered</div>
              </CardContent>
            </Card>
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.8★</div>
                <div className="text-muted-foreground">Customer Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2020, RealtyHub emerged from a simple idea: to make real estate transactions 
                in India more transparent, efficient, and customer-centric. Our founders, having experienced 
                the challenges of property buying firsthand, set out to create a platform that would 
                revolutionize the Indian real estate market.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, we're proud to be India's fastest-growing proptech platform, serving millions of 
                customers across major cities. Our technology-driven approach, combined with deep local 
                market knowledge, has helped thousands of families find their perfect homes.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Learn More About Our Journey
              </Button>
            </div>
            <div className="animate-scale-in">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" 
                alt="Modern office building" 
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground">The principles that drive everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center animate-fade-in">
              <CardContent className="p-8">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in complete transparency in all our dealings. No hidden costs, no surprises.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center animate-fade-in">
              <CardContent className="p-8">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Customer First</h3>
                <p className="text-muted-foreground">
                  Our customers are at the heart of everything we do. Their success is our success.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center animate-fade-in">
              <CardContent className="p-8">
                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in every interaction, every service, and every solution.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-muted-foreground">Ready to find your dream property? Let's talk!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+91 98765 43210</p>
              </CardContent>
            </Card>
            
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">hello@realtyhub.in</p>
              </CardContent>
            </Card>
            
            <Card className="text-center animate-scale-in">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Office</h3>
                <p className="text-muted-foreground">Mumbai, Delhi, Bangalore</p>
              </CardContent>
            </Card>
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

export default About;