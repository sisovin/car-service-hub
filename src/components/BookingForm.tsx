import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";

interface BookingFormProps {
  onSubmit?: (formData: BookingFormData) => void;
  className?: string;
  isCollapsible?: boolean;
}

export interface BookingFormData {
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  date: Date | undefined;
  time: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit = () => {},
  className = "",
  isCollapsible = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsible);
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: "",
    dropoffLocation: "",
    vehicleType: "sedan",
    date: new Date(),
    time: "12:00",
  });

  const vehicleTypes = [
    { value: "sedan", label: "Sedan" },
    { value: "suv", label: "SUV" },
    { value: "luxury", label: "Luxury" },
    { value: "van", label: "Van" },
  ];

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleCollapse = () => {
    if (isCollapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Book Your Ride</h2>
        {isCollapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCollapse}
            className="text-gray-500"
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </Button>
        )}
      </div>

      {!isCollapsed && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup" className="text-gray-700">
              Pickup Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="pickup"
                placeholder="Enter pickup address"
                className="pl-10"
                value={formData.pickupLocation}
                onChange={(e) =>
                  handleInputChange("pickupLocation", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropoff" className="text-gray-700">
              Dropoff Location
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                id="dropoff"
                placeholder="Enter destination address"
                className="pl-10"
                value={formData.dropoffLocation}
                onChange={(e) =>
                  handleInputChange("dropoffLocation", e.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle-type" className="text-gray-700">
              Vehicle Type
            </Label>
            <Select
              value={formData.vehicleType}
              onValueChange={(value) => handleInputChange("vehicleType", value)}
            >
              <SelectTrigger id="vehicle-type">
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                {vehicleTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-700">
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.date ? (
                      format(formData.date, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleInputChange("date", date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-700">
                Time
              </Label>
              <div className="relative">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-800 hover:bg-blue-900 text-white"
          >
            Book Now
          </Button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
