import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Video, Building2, CreditCard, Smartphone, Building, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "paytm", name: "Paytm", icon: Smartphone },
  { id: "gpay", name: "Google Pay", icon: Smartphone },
  { id: "card", name: "Credit/Debit Card", icon: CreditCard },
  { id: "netbanking", name: "Net Banking", icon: Building },
];

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [step, setStep] = useState<"details" | "payment" | "confirmation">("details");
  const [consultationType, setConsultationType] = useState<"online" | "offline">("online");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    concerns: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      toast({ title: "Please select a date", variant: "destructive" });
      return;
    }
    if (!formData.fullName || !formData.email || !formData.phone || !formData.age) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setStep("payment");
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({ title: "Please select a payment method", variant: "destructive" });
      return;
    }
    
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep("confirmation");
    
    toast({
      title: "Payment Successful!",
      description: "Your appointment has been confirmed.",
    });
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="p-8 shadow-soft text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-green-600 mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">Your appointment has been successfully booked</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 text-left space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Patient Name:</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Appointment Date:</span>
                <span className="font-medium">{date && format(date, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consultation Type:</span>
                <span className="font-medium capitalize">{consultationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method:</span>
                <span className="font-medium">{paymentMethods.find(p => p.id === paymentMethod)?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Booking ID:</span>
                <span className="font-medium">GC{Date.now().toString().slice(-8)}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to {formData.email}. 
              {consultationType === "online" && " You will receive a video call link before your appointment."}
            </p>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/doctors")} variant="outline">
                Back to Doctors
              </Button>
              <Button onClick={() => navigate("/")} className="bg-gradient-primary hover:shadow-glow transition-smooth">
                Go to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground">
            {step === "details" ? "Fill in your details to book a consultation" : "Complete payment to confirm your booking"}
          </p>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-sm", 
              step === "details" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-background/20">1</span>
              Details
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full text-sm",
              step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-background/20">2</span>
              Payment
            </div>
          </div>
        </div>

        <Card className="p-8 shadow-soft">
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-6">
              {/* Consultation Type */}
              <div className="space-y-3">
                <Label>Consultation Mode *</Label>
                <RadioGroup value={consultationType} onValueChange={(v) => setConsultationType(v as "online" | "offline")} className="flex gap-4">
                  <div className={cn("flex-1 border rounded-lg p-4 cursor-pointer transition-all",
                    consultationType === "online" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}>
                    <RadioGroupItem value="online" id="online" className="sr-only" />
                    <label htmlFor="online" className="flex items-center gap-3 cursor-pointer">
                      <Video className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Online Consultation</p>
                        <p className="text-xs text-muted-foreground">Video call from home</p>
                      </div>
                    </label>
                  </div>
                  <div className={cn("flex-1 border rounded-lg p-4 cursor-pointer transition-all",
                    consultationType === "offline" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  )}>
                    <RadioGroupItem value="offline" id="offline" className="sr-only" />
                    <label htmlFor="offline" className="flex items-center gap-3 cursor-pointer">
                      <Building2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Clinic Visit</p>
                        <p className="text-xs text-muted-foreground">In-person consultation</p>
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" name="fullName" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input id="age" name="age" type="number" placeholder="Enter your age" value={formData.age} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label>Preferred Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-background">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(date) => date < new Date()} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="concerns">Skin Concerns / Reason for Visit</Label>
                <Textarea id="concerns" name="concerns" placeholder="Describe your skin concerns" value={formData.concerns} onChange={handleChange} rows={3} />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-smooth" size="lg">
                Continue to Payment
              </Button>
            </form>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Appointment Summary</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p>Date: {date && format(date, "PPP")}</p>
                  <p>Type: {consultationType === "online" ? "Online Video Consultation" : "Clinic Visit"}</p>
                  <p>Patient: {formData.fullName}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <span className="font-medium">Consultation Fee</span>
                  <span className="text-xl font-bold text-primary">₹1,500</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Select Payment Method *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "border rounded-lg p-4 cursor-pointer transition-all flex items-center gap-3",
                        paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      )}
                    >
                      <method.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{method.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm">
                <p>🔒 Your payment is secured with 256-bit encryption</p>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep("details")} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handlePayment} 
                  disabled={!paymentMethod || isProcessing} 
                  className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  {isProcessing ? "Processing..." : "Pay ₹1,500"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;
