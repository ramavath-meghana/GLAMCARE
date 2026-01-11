import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your GlamCare AI assistant. How can I help you with your skincare today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes("oily") || lowerInput.includes("acne")) {
      return "For oily skin and acne, I recommend using a gentle foaming cleanser twice daily, clay masks 2-3 times per week, and oil-free moisturizers. Natural remedies include tea tree oil and aloe vera gel. Would you like specific product recommendations?";
    }
    
    if (lowerInput.includes("dry") || lowerInput.includes("flaky")) {
      return "Dry skin needs extra hydration! Use a creamy cleanser, apply honey or almond oil masks, and use rich moisturizers with hyaluronic acid. Drink plenty of water and consider using a humidifier. Would you like more detailed tips?";
    }
    
    if (lowerInput.includes("dark circles") || lowerInput.includes("eye")) {
      return "For dark circles, try cold cucumber slices, apply almond oil before bed, ensure adequate sleep (7-8 hours), and use a good under-eye cream. Vitamin K and caffeine-based eye creams can help. Would you like to book a consultation?";
    }
    
    if (lowerInput.includes("sunscreen") || lowerInput.includes("sun protection")) {
      return "Sunscreen is crucial! Use SPF 30+ daily, even indoors. Apply 15 minutes before sun exposure and reapply every 2-3 hours. Look for broad-spectrum protection. Would you like product suggestions?";
    }
    
    return "That's a great question! For personalized advice, I recommend our AI skin analysis tool or booking a consultation with one of our expert dermatologists. Would you like me to help you with either option?";
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-primary hover:shadow-glow transition-smooth shadow-soft"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-glow flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-gradient-primary rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary-foreground" />
          <h3 className="font-semibold text-primary-foreground">GlamCare Assistant</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about skincare..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="bg-gradient-primary hover:shadow-glow transition-smooth"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;
