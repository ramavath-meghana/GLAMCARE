import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, IndianRupee } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  city: string;
  clinic: string;
  rating: number;
  reviews: number;
  fee: number;
  availability: string;
}

const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    specialty: "Dermatologist & Cosmetologist",
    city: "Mumbai",
    clinic: "Skin Care Clinic, Bandra",
    rating: 4.8,
    reviews: 234,
    fee: 1500,
    availability: "Mon-Sat, 10 AM - 6 PM",
  },
  {
    id: "2",
    name: "Dr. Rajesh Kumar",
    specialty: "Clinical Dermatologist",
    city: "Delhi",
    clinic: "Derma Care Center, Connaught Place",
    rating: 4.9,
    reviews: 312,
    fee: 1800,
    availability: "Mon-Fri, 9 AM - 5 PM",
  },
  {
    id: "3",
    name: "Dr. Aisha Patel",
    specialty: "Dermatologist",
    city: "Bangalore",
    clinic: "Skin Solutions, Koramangala",
    rating: 4.7,
    reviews: 189,
    fee: 1200,
    availability: "Tue-Sun, 11 AM - 7 PM",
  },
  {
    id: "4",
    name: "Dr. Suresh Reddy",
    specialty: "Cosmetic Dermatologist",
    city: "Hyderabad",
    clinic: "Elite Skin Clinic, Banjara Hills",
    rating: 4.6,
    reviews: 156,
    fee: 1400,
    availability: "Mon-Sat, 10 AM - 6 PM",
  },
  {
    id: "5",
    name: "Dr. Meera Iyer",
    specialty: "Dermatologist & Trichologist",
    city: "Chennai",
    clinic: "Skin & Hair Clinic, T Nagar",
    rating: 4.8,
    reviews: 267,
    fee: 1300,
    availability: "Mon-Sat, 9 AM - 5 PM",
  },
  {
    id: "6",
    name: "Dr. Arjun Verma",
    specialty: "Clinical Dermatologist",
    city: "Kolkata",
    clinic: "Advanced Derma Care, Park Street",
    rating: 4.7,
    reviews: 198,
    fee: 1100,
    availability: "Mon-Fri, 10 AM - 6 PM",
  },
];

const cities = ["All Cities", ...Array.from(new Set(doctors.map(d => d.city)))];

const Doctors = () => {
  const [selectedCity, setSelectedCity] = useState("All Cities");

  const filteredDoctors = selectedCity === "All Cities" 
    ? doctors 
    : doctors.filter(d => d.city === selectedCity);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Find Expert Dermatologists</h1>
          <p className="text-muted-foreground mb-6">
            Book appointments with verified dermatologists across India
          </p>
          
          <div className="flex gap-4 items-center">
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 shadow-soft hover:shadow-glow transition-smooth">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-semibold">{doctor.rating}</span>
                  <span className="text-xs text-muted-foreground">({doctor.reviews})</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.clinic}, {doctor.city}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="w-4 h-4" />
                  <span className="font-semibold text-primary">₹{doctor.fee}</span>
                  <span className="text-muted-foreground">consultation fee</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Available: {doctor.availability}
                </p>
              </div>

              <Link to={`/book/${doctor.id}`}>
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-smooth">
                  Book Appointment
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
