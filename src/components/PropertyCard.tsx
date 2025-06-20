
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home, Image } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/data/properties';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  image: string;
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
        <div className="relative overflow-hidden">
          <img
            src={`https://images.unsplash.com/${property.image}?auto=format&fit=crop&w=800&q=80`}
            alt={property.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {property.featured && (
            <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
              Featured
            </Badge>
          )}
          <Badge className="absolute top-3 right-3 bg-white text-gray-800 capitalize">
            {property.type}
          </Badge>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(property.price)}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Home className="h-4 w-4 mr-1" />
              {property.area} sq ft
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{property.bedrooms} bed</span>
            <span>{property.bathrooms} bath</span>
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {property.type}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
