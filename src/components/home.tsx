import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ChevronDown, Search, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import BookingForm from "./BookingForm";
import ServiceCardGrid from "./ServiceCardGrid";
import InteractiveMap from "./InteractiveMap";

const Home = () => {
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("booking");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Your Premium Car Service
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl mb-8 text-blue-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Book a comfortable ride with our professional drivers and luxury
                vehicles.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden md:flex gap-4"
              >
                <Button
                  variant="default"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-xl p-6"
              >
                <BookingForm />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Mobile Tabs */}
      <div className="md:hidden sticky top-0 z-10 bg-white shadow-md">
        <div className="flex justify-around p-4">
          <Button
            variant={activeSection === "booking" ? "default" : "ghost"}
            onClick={() => setActiveSection("booking")}
            className={activeSection === "booking" ? "bg-blue-900" : ""}
          >
            <MapPin className="mr-2 h-4 w-4" /> Book
          </Button>
          <Button
            variant={activeSection === "services" ? "default" : "ghost"}
            onClick={() => setActiveSection("services")}
            className={activeSection === "services" ? "bg-blue-900" : ""}
          >
            <Calendar className="mr-2 h-4 w-4" /> Services
          </Button>
          <Button
            variant={activeSection === "map" ? "default" : "ghost"}
            onClick={() => setActiveSection("map")}
            className={activeSection === "map" ? "bg-blue-900" : ""}
          >
            <MapPin className="mr-2 h-4 w-4" /> Map
          </Button>
        </div>
      </div>

      {/* Mobile Booking Form (Collapsible) */}
      <div className="md:hidden">
        {activeSection === "booking" && (
          <div className="p-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Book Your Ride</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFormCollapsed(!isFormCollapsed)}
                  >
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${isFormCollapsed ? "" : "rotate-180"}`}
                    />
                  </Button>
                </div>
                {!isFormCollapsed && <BookingForm />}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Services Section */}
      <section
        id="services"
        className={`py-12 px-4 ${activeSection === "services" || !activeSection || activeSection === "booking" ? "block" : "hidden md:block"}`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Our Services
              </h2>
              <p className="text-gray-600">
                Choose from our range of premium vehicles
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search services"
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </div>

          <ServiceCardGrid />
        </div>
      </section>

      {/* Map Section */}
      <section
        id="map"
        className={`py-12 px-4 bg-gray-100 ${activeSection === "map" ? "block" : "hidden md:block"}`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Find Available Vehicles
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[500px]">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Premium Car Service</h3>
              <p className="text-blue-200 mb-4">
                Providing luxury transportation services for all your needs.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-orange-400">
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-orange-400">
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-orange-400">
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-blue-200 hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a href="#map" className="text-blue-200 hover:text-white">
                    Find Vehicles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-blue-200">
                <p className="mb-2">123 Transport Street</p>
                <p className="mb-2">New York, NY 10001</p>
                <p className="mb-2">Email: info@carservice.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300">
            <p>
              &copy; {new Date().getFullYear()} Premium Car Service. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="flex justify-around py-3">
          <button
            className="flex flex-col items-center text-xs"
            onClick={() => setActiveSection("booking")}
          >
            <MapPin
              className={`h-5 w-5 ${activeSection === "booking" ? "text-blue-900" : "text-gray-500"}`}
            />
            <span
              className={
                activeSection === "booking" ? "text-blue-900" : "text-gray-500"
              }
            >
              Book
            </span>
          </button>
          <button
            className="flex flex-col items-center text-xs"
            onClick={() => setActiveSection("services")}
          >
            <Calendar
              className={`h-5 w-5 ${activeSection === "services" ? "text-blue-900" : "text-gray-500"}`}
            />
            <span
              className={
                activeSection === "services" ? "text-blue-900" : "text-gray-500"
              }
            >
              Services
            </span>
          </button>
          <button
            className="flex flex-col items-center text-xs"
            onClick={() => setActiveSection("map")}
          >
            <MapPin
              className={`h-5 w-5 ${activeSection === "map" ? "text-blue-900" : "text-gray-500"}`}
            />
            <span
              className={
                activeSection === "map" ? "text-blue-900" : "text-gray-500"
              }
            >
              Map
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
