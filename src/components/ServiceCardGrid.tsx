import React, { useState } from "react";
import ServiceCard from "./ServiceCard";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Vehicle {
  id: string;
  name: string;
  image: string;
  price: number;
  capacity: number;
  rating: number;
  arrivalTime: number; // in minutes
  type: "economy" | "standard" | "premium" | "luxury";
}

interface ServiceCardGridProps {
  vehicles?: Vehicle[];
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

const ServiceCardGrid = ({
  vehicles = defaultVehicles,
  onSelectVehicle = () => {},
}: ServiceCardGridProps) => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [maxArrivalTime, setMaxArrivalTime] = useState<number>(30);
  const [minRating, setMinRating] = useState<number>(0);

  // Apply filters when any filter changes
  React.useEffect(() => {
    const filtered = vehicles.filter((vehicle) => {
      const matchesPrice =
        vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
      const matchesType =
        selectedType === "all" || vehicle.type === selectedType;
      const matchesArrival = vehicle.arrivalTime <= maxArrivalTime;
      const matchesRating = vehicle.rating >= minRating;

      return matchesPrice && matchesType && matchesArrival && matchesRating;
    });

    setFilteredVehicles(filtered);
  }, [vehicles, priceRange, selectedType, maxArrivalTime, minRating]);

  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Available Vehicles
            </h2>
            <p className="text-gray-600">
              Select from our range of premium vehicles for your journey
            </p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <Tabs defaultValue="filters" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="sort">Sort</TabsTrigger>
              </TabsList>

              <TabsContent value="filters" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Price Range (${priceRange[0]} - ${priceRange[1]})
                    </label>
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </div>

                  {/* Vehicle Type Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vehicle Type</label>
                    <Select
                      value={selectedType}
                      onValueChange={setSelectedType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Arrival Time Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Max Arrival Time ({maxArrivalTime} min)
                    </label>
                    <Slider
                      defaultValue={[30]}
                      max={60}
                      step={5}
                      value={[maxArrivalTime]}
                      onValueChange={(value) => setMaxArrivalTime(value[0])}
                    />
                  </div>

                  {/* Rating Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Minimum Rating ({minRating})
                    </label>
                    <Slider
                      defaultValue={[0]}
                      max={5}
                      step={0.5}
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sort" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                    onClick={() => {
                      const sorted = [...filteredVehicles].sort(
                        (a, b) => a.price - b.price,
                      );
                      setFilteredVehicles(sorted);
                    }}
                  >
                    Price: Low to High
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                    onClick={() => {
                      const sorted = [...filteredVehicles].sort(
                        (a, b) => b.price - a.price,
                      );
                      setFilteredVehicles(sorted);
                    }}
                  >
                    Price: High to Low
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                    onClick={() => {
                      const sorted = [...filteredVehicles].sort(
                        (a, b) => a.arrivalTime - b.arrivalTime,
                      );
                      setFilteredVehicles(sorted);
                    }}
                  >
                    Fastest Arrival
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                    onClick={() => {
                      const sorted = [...filteredVehicles].sort(
                        (a, b) => b.rating - a.rating,
                      );
                      setFilteredVehicles(sorted);
                    }}
                  >
                    Highest Rated
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredVehicles.length} vehicles found
            </p>
            <div className="flex space-x-2">
              {selectedType !== "all" && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {selectedType}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setSelectedType("all")}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {priceRange[0] > 0 || priceRange[1] < 100 ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <button
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    onClick={() => setPriceRange([0, 100])}
                  >
                    ×
                  </button>
                </Badge>
              ) : null}
            </div>
          </div>

          {/* Service Cards Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <ServiceCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onSelect={() => onSelectVehicle(vehicle)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">
                No vehicles match your filters
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={() => {
                  setPriceRange([0, 100]);
                  setSelectedType("all");
                  setMaxArrivalTime(30);
                  setMinRating(0);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Default vehicles data for development and when no props are provided
const defaultVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Economy Sedan",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
    price: 25,
    capacity: 4,
    rating: 4.2,
    arrivalTime: 8,
    type: "economy",
  },
  {
    id: "2",
    name: "Standard SUV",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    price: 35,
    capacity: 5,
    rating: 4.5,
    arrivalTime: 12,
    type: "standard",
  },
  {
    id: "3",
    name: "Premium Sedan",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
    price: 50,
    capacity: 4,
    rating: 4.8,
    arrivalTime: 10,
    type: "premium",
  },
  {
    id: "4",
    name: "Luxury SUV",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    price: 75,
    capacity: 6,
    rating: 4.9,
    arrivalTime: 15,
    type: "luxury",
  },
  {
    id: "5",
    name: "Economy Compact",
    image:
      "https://images.unsplash.com/photo-1471289549423-04adaecfa1f1?w=800&q=80",
    price: 20,
    capacity: 2,
    rating: 4.0,
    arrivalTime: 5,
    type: "economy",
  },
  {
    id: "6",
    name: "Standard Minivan",
    image:
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80",
    price: 45,
    capacity: 7,
    rating: 4.3,
    arrivalTime: 18,
    type: "standard",
  },
  {
    id: "7",
    name: "Premium Electric",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    price: 65,
    capacity: 5,
    rating: 4.7,
    arrivalTime: 14,
    type: "premium",
  },
  {
    id: "8",
    name: "Luxury Limousine",
    image:
      "https://images.unsplash.com/photo-1539713904642-b4d144f769d9?w=800&q=80",
    price: 95,
    capacity: 8,
    rating: 5.0,
    arrivalTime: 25,
    type: "luxury",
  },
];

export default ServiceCardGrid;
