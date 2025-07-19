import React, { useState } from "react";
import { MapPin, Navigation, Car, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Vehicle {
  id: string;
  type: string;
  location: { lat: number; lng: number };
  estimatedArrival: string;
  distance: string;
}

interface InteractiveMapProps {
  pickupLocation?: { lat: number; lng: number; address: string };
  dropoffLocation?: { lat: number; lng: number; address: string };
  availableVehicles?: Vehicle[];
  onVehicleSelect?: (vehicleId: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  pickupLocation = { lat: 40.7128, lng: -74.006, address: "New York City, NY" },
  dropoffLocation = {
    lat: 40.7614,
    lng: -73.9776,
    address: "Central Park, NY",
  },
  availableVehicles = [
    {
      id: "v1",
      type: "Sedan",
      location: { lat: 40.72, lng: -74.01 },
      estimatedArrival: "5 min",
      distance: "0.8 mi",
    },
    {
      id: "v2",
      type: "SUV",
      location: { lat: 40.715, lng: -74.005 },
      estimatedArrival: "7 min",
      distance: "1.2 mi",
    },
    {
      id: "v3",
      type: "Luxury",
      location: { lat: 40.718, lng: -74.008 },
      estimatedArrival: "10 min",
      distance: "1.5 mi",
    },
  ],
  onVehicleSelect = () => {},
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [showRouteDetails, setShowRouteDetails] = useState(false);

  const handleVehicleClick = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleSelect(vehicleId);
  };

  const toggleRouteDetails = () => {
    setShowRouteDetails(!showRouteDetails);
  };

  return (
    <div className="w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden relative">
      {/* Map placeholder - in a real implementation, this would be replaced with a map library like Google Maps or Mapbox */}
      <div className="w-full h-full bg-[#e8ecf0] relative">
        {/* Simulated map background with grid lines */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577086664693-894d8405334a?w=1200&q=80')] bg-cover bg-center opacity-50"></div>

        {/* Route line between pickup and dropoff */}
        <div
          className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-blue-500 transform -translate-y-1/2"
          style={{
            background: "linear-gradient(90deg, #1e40af 0%, #f97316 100%)",
          }}
        ></div>

        {/* Pickup location marker */}
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer animate-pulse">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pickup: {pickupLocation.address}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Dropoff location marker */}
        <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer">
                  <Navigation className="w-4 h-4 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dropoff: {dropoffLocation.address}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Vehicle markers */}
        {availableVehicles.map((vehicle) => {
          const isSelected = selectedVehicle === vehicle.id;
          const left = `${30 + (vehicle.location.lng - pickupLocation.lng) * 100}%`;
          const top = `${50 + (vehicle.location.lat - pickupLocation.lat) * 100}%`;

          return (
            <div
              key={vehicle.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSelected ? "scale-125 z-10" : "z-0"}`}
              style={{ left, top }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-8 h-8 rounded-full ${isSelected ? "bg-blue-700" : "bg-blue-500"} flex items-center justify-center cursor-pointer hover:scale-110 transition-transform`}
                      onClick={() => handleVehicleClick(vehicle.id)}
                    >
                      <Car className="w-5 h-5 text-white" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-sm">
                      <p className="font-medium">{vehicle.type}</p>
                      <p>Arrival: {vehicle.estimatedArrival}</p>
                      <p>Distance: {vehicle.distance}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="outline" size="sm" className="bg-white">
          <span className="sr-only">Zoom In</span>
          <span className="text-lg">+</span>
        </Button>
        <Button variant="outline" size="sm" className="bg-white">
          <span className="sr-only">Zoom Out</span>
          <span className="text-lg">-</span>
        </Button>
      </div>

      {/* Route details panel */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium">
                  Estimated travel time: 15 min
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={toggleRouteDetails}>
                {showRouteDetails ? "Hide Details" : "Show Details"}
              </Button>
            </div>

            {showRouteDetails && (
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Distance:</span>
                  <span className="font-medium">3.2 miles</span>
                </div>
                <div className="flex justify-between">
                  <span>Traffic:</span>
                  <span className="font-medium text-green-600">Light</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated fare:</span>
                  <span className="font-medium">$12 - $15</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
