import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users } from "lucide-react";

interface ServiceCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  capacity: number;
  rating: number;
  arrivalTime: number; // in minutes
  onQuickBook?: (id: string) => void;
}

const ServiceCard = ({
  id = "1",
  name = "Standard Sedan",
  image = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
  price = 25,
  capacity = 4,
  rating = 4.8,
  arrivalTime = 5,
  onQuickBook = () => {},
}: ServiceCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white h-full flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-white/90 text-primary font-medium"
        >
          ${price}/ride
        </Badge>
      </div>

      <CardContent className="pt-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>

        <div className="flex items-center gap-1 text-amber-500 mb-2">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm">{rating.toFixed(1)}</span>
        </div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{arrivalTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>Up to {capacity}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          onClick={() => onQuickBook(id)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Quick Book
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
