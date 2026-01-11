import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SkinType = "oily" | "dry" | "normal" | "combination";

interface AnalysisResult {
  skinType: SkinType;
  issues: string[];
  remedies: string[];
  products: string[];
}

const SkinAnalysis = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      console.log("Requesting camera access...");
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      console.log("Camera access granted, stream:", mediaStream);
      setStream(mediaStream);
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(err => {
            console.error("Error playing video:", err);
          });
          console.log("Video element connected to stream");
        }
      }, 100);
      
      toast({
        title: "Camera Ready",
        description: "Position your face in the frame",
      });
    } catch (error) {
      console.error("Camera error:", error);
      toast({
        title: "Camera Access Denied",
        description: "Please allow camera access in your browser settings",
        variant: "destructive",
      });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setImage(imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkin = async () => {
    setAnalyzing(true);
    console.log("Starting skin analysis...");
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate truly random skin type using timestamp for better randomization
    const skinTypes: SkinType[] = ["oily", "dry", "normal", "combination"];
    const randomIndex = Math.floor((Math.random() * Date.now()) % skinTypes.length);
    const randomSkinType = skinTypes[randomIndex];
    
    console.log("Analysis complete. Detected skin type:", randomSkinType);

    const remediesMap: Record<SkinType, string[]> = {
      oily: [
        "Use a gentle, foaming cleanser twice daily",
        "Apply clay masks 2-3 times per week to control oil",
        "Use oil-free, non-comedogenic moisturizers",
        "Try tea tree oil as a natural astringent",
        "Use aloe vera gel to soothe and control shine"
      ],
      dry: [
        "Use a creamy, hydrating cleanser",
        "Apply honey masks for deep hydration",
        "Use rich moisturizers with hyaluronic acid",
        "Try coconut oil or almond oil before bed",
        "Drink plenty of water and use a humidifier"
      ],
      normal: [
        "Maintain routine with gentle cleansing",
        "Use vitamin C serums for brightness",
        "Apply rosewater toner for balance",
        "Weekly exfoliation with mild scrubs",
        "Use cucumber face packs for freshness"
      ],
      combination: [
        "Use different products for different zones",
        "Apply clay masks only on oily areas",
        "Use lightweight, balanced moisturizers",
        "Try multani mitti (fuller's earth) masks",
        "Use neem-based products for balance"
      ]
    };

    const productsMap: Record<SkinType, string[]> = {
      oily: [
        "Salicylic Acid 2% cleanser (BHA for deep pore cleansing)",
        "Niacinamide 10% + Zinc 1% serum (oil control & pore minimizing)",
        "Benzoyl Peroxide 2.5% spot treatment (for acne)",
        "Oil-free gel moisturizer with hyaluronic acid",
        "Mattifying sunscreen SPF 50+ (non-comedogenic)"
      ],
      dry: [
        "Gentle cream cleanser with ceramides",
        "Hyaluronic Acid + Vitamin B5 serum (intense hydration)",
        "Retinol 0.5% night cream (anti-aging & cell renewal)",
        "Rich moisturizer with peptides and squalane",
        "Hydrating sunscreen SPF 50+ with antioxidants"
      ],
      normal: [
        "Balanced pH cleanser with glycolic acid",
        "Vitamin C 15% serum (brightening & antioxidant)",
        "Lightweight moisturizer with SPF for day use",
        "Gentle AHA/BHA toner for weekly exfoliation",
        "Mineral sunscreen SPF 40+"
      ],
      combination: [
        "Gel-cream cleanser suitable for mixed skin",
        "Niacinamide serum for balance (use all over)",
        "Lightweight moisturizer + richer cream for dry areas",
        "Clay mask for T-zone, hydrating mask for cheeks",
        "Broad-spectrum sunscreen SPF 50+ (gel formula)"
      ]
    };

    const issuesMap: Record<SkinType, string[]> = {
      oily: ["Excess sebum production", "Enlarged pores", "Prone to acne"],
      dry: ["Flaky skin", "Tight feeling", "Fine lines"],
      normal: ["Well-balanced", "Minimal concerns"],
      combination: ["Oily T-zone", "Dry cheeks", "Mixed texture"]
    };

    setResult({
      skinType: randomSkinType,
      issues: issuesMap[randomSkinType],
      remedies: remediesMap[randomSkinType],
      products: productsMap[randomSkinType],
    });

    setAnalyzing(false);
    
    toast({
      title: "Analysis Complete!",
      description: "Your personalized skincare recommendations are ready",
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Skin Analysis</h1>
          <p className="text-muted-foreground">
            Take a photo or upload an image for instant skin analysis
          </p>
        </div>

        <Card className="p-8 shadow-soft">
          {!image && !stream && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={startCamera}
                  className="bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Use Camera
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="transition-smooth"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                For best results, ensure good lighting and a clear view of your face
              </p>
            </div>
          )}

          {stream && (
            <div className="space-y-4">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    transform: 'scaleX(-1)',
                    width: '100%',
                    height: 'auto',
                    minHeight: '400px',
                    objectFit: 'cover'
                  }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 right-4 flex justify-center">
                    <div className="bg-green-500/80 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Camera Active - Position Your Face
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="border-4 border-white/30 rounded-full w-64 h-64 md:w-80 md:h-80" />
                      <div className="absolute inset-0 border-2 border-primary rounded-full w-64 h-64 md:w-80 md:h-80 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={captureImage} 
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
                <Button onClick={stopCamera} variant="outline" size="lg">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {image && !result && (
            <div className="space-y-4">
              <img src={image} alt="Captured" className="w-full rounded-lg" />
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={analyzeSkin}
                  disabled={analyzing}
                  className="bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {analyzing ? "Analyzing..." : "Analyze Skin"}
                </Button>
                <Button
                  onClick={() => setImage(null)}
                  variant="outline"
                  disabled={analyzing}
                >
                  Retake
                </Button>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <img src={image!} alt="Analyzed" className="w-full rounded-lg mb-6" />
              
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">
                  Your Skin Type: <span className="text-primary capitalize">{result.skinType}</span>
                </h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-2">Detected Issues:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {result.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-primary/10 p-6 rounded-lg border border-primary/20">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Natural Home Remedies
                </h4>
                <ul className="space-y-3">
                  {result.remedies.map((remedy, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-primary font-semibold">{idx + 1}.</span>
                      <span>{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary" />
                  Recommended Products (Active Ingredients)
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Consult with a dermatologist before starting any new skincare products
                </p>
                <ul className="space-y-3">
                  {result.products.map((product, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="text-secondary font-semibold">{idx + 1}.</span>
                      <span>{product}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={() => {
                  setImage(null);
                  setResult(null);
                }}
                variant="outline"
                className="w-full"
              >
                Analyze Again
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SkinAnalysis;
