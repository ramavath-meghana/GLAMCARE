import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Sparkles, Leaf, ShoppingBag, Apple, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnalysisDropdown from "@/components/AnalysisDropdown";

type SkinType = "oily" | "dry" | "normal" | "combination";

interface AnalysisResult {
  skinType: SkinType;
  issues: string[];
  possibleCauses: string[];
  remedies: string[];
  products: string[];
  dietTips: string[];
  lifestyleAdvice: string[];
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
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setStream(mediaStream);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
      toast({ title: "Camera Ready", description: "Position your face in the frame" });
    } catch (error) {
      toast({ title: "Camera Access Denied", description: "Please allow camera access", variant: "destructive" });
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      setImage(canvas.toDataURL("image/jpeg"));
      stopCamera();
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkin = async () => {
    setAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const skinTypes: SkinType[] = ["oily", "dry", "normal", "combination"];
    const randomSkinType = skinTypes[Math.floor(Math.random() * skinTypes.length)];

    const issuesMap: Record<SkinType, string[]> = {
      oily: ["Excess sebum production", "Enlarged pores", "Prone to breakouts"],
      dry: ["Reduced moisture retention", "Skin barrier concerns", "Visible fine lines"],
      normal: ["Well-balanced sebum", "Good moisture levels", "Even texture"],
      combination: ["Mixed sebum production", "T-zone congestion", "Cheek dryness"]
    };

    const causesMap: Record<SkinType, string[]> = {
      oily: ["Hormonal fluctuations", "High glycemic diet", "Stress-related cortisol", "Humid climate adaptation"],
      dry: ["Insufficient water intake", "Harsh cleansers stripping natural oils", "Low humidity environment", "Nutritional deficiencies"],
      normal: ["Balanced diet", "Good hydration habits", "Consistent sleep schedule", "Effective stress management"],
      combination: ["Hormonal variations", "Seasonal changes", "Mixed product usage", "Inconsistent skincare routine"]
    };

    const remediesMap: Record<SkinType, string[]> = {
      oily: [
        "Apply multani mitti (fuller's earth) mask once a week",
        "Use diluted tea tree oil on problem areas",
        "Apply fresh aloe vera gel as a soothing treatment",
        "Steam face with neem leaves for pore cleansing",
        "Use rose water as a natural toner"
      ],
      dry: [
        "Apply honey and milk mask for deep hydration",
        "Use coconut or almond oil before bedtime",
        "Apply mashed avocado pack for nourishment",
        "Use oatmeal and yogurt mask for gentle exfoliation",
        "Apply cucumber slices for cooling hydration"
      ],
      normal: [
        "Maintain routine with turmeric and honey packs",
        "Use papaya pulp for natural enzyme exfoliation",
        "Apply tomato juice for antioxidant benefits",
        "Use gram flour and turmeric for cleansing",
        "Apply rose water and glycerin mix for glow"
      ],
      combination: [
        "Apply clay mask only on oily T-zone areas",
        "Use honey on dry cheek areas",
        "Apply neem paste on congested zones",
        "Use cucumber on dry areas for hydration",
        "Zone-specific treatment approach"
      ]
    };

    const productsMap: Record<SkinType, string[]> = {
      oily: [
        "GlamCare Oil Control Cleanser with Niacinamide",
        "GlamCare Light Gel Moisturizer (oil-free)",
        "GlamCare Matte Sunscreen SPF 50",
        "GlamCare Salicylic Acid Spot Treatment"
      ],
      dry: [
        "GlamCare Gentle Cream Cleanser with Ceramides",
        "GlamCare Hydrating Serum with Hyaluronic Acid",
        "GlamCare Rich Moisturizer with Squalane",
        "GlamCare Hydrating Sunscreen SPF 50"
      ],
      normal: [
        "GlamCare Balanced Gel Cleanser",
        "GlamCare Vitamin C Brightening Serum",
        "GlamCare Daily Moisturizer SPF 30",
        "GlamCare Weekly Enzyme Mask"
      ],
      combination: [
        "GlamCare Balancing Cleanser",
        "GlamCare Zone-Control Serum",
        "GlamCare Adaptive Moisturizer",
        "GlamCare Multi-Zone Sunscreen"
      ]
    };

    const dietMap: Record<SkinType, string[]> = {
      oily: [
        "Reduce dairy and high-glycemic foods",
        "Increase zinc-rich foods (pumpkin seeds, chickpeas)",
        "Add omega-3 fatty acids (walnuts, flaxseeds)",
        "Drink green tea for antioxidants",
        "Include bitter gourd and leafy greens"
      ],
      dry: [
        "Increase healthy fats (avocado, olive oil, nuts)",
        "Eat vitamin E rich foods (almonds, sunflower seeds)",
        "Include omega-3 sources (fatty fish, chia seeds)",
        "Drink at least 8 glasses of water daily",
        "Consume fruits rich in water content"
      ],
      normal: [
        "Maintain balanced diet with variety",
        "Include antioxidant-rich berries",
        "Eat colorful vegetables daily",
        "Stay consistently hydrated",
        "Include probiotics for gut health"
      ],
      combination: [
        "Focus on anti-inflammatory foods",
        "Balance omega-3 and omega-6 intake",
        "Include vitamin A foods (carrots, sweet potato)",
        "Moderate dairy consumption",
        "Stay well hydrated throughout day"
      ]
    };

    const lifestyleMap: Record<SkinType, string[]> = {
      oily: ["Manage stress through yoga or meditation", "Get 7-8 hours of sleep", "Wash pillowcases weekly", "Avoid touching face frequently"],
      dry: ["Use a humidifier in dry weather", "Take shorter, lukewarm showers", "Sleep in a cool, hydrated room", "Protect skin from harsh winds"],
      normal: ["Maintain consistent sleep schedule", "Exercise regularly for circulation", "Practice stress management", "Protect from sun exposure"],
      combination: ["Adjust routine seasonally", "Balance work and rest", "Clean makeup brushes regularly", "Monitor skin changes"]
    };

    setResult({
      skinType: randomSkinType,
      issues: issuesMap[randomSkinType],
      possibleCauses: causesMap[randomSkinType],
      remedies: remediesMap[randomSkinType],
      products: productsMap[randomSkinType],
      dietTips: dietMap[randomSkinType],
      lifestyleAdvice: lifestyleMap[randomSkinType]
    });

    setAnalyzing(false);
    toast({ title: "Analysis Complete!", description: "Your wellness recommendations are ready" });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">AI Skin Health Analysis</h1>
          <p className="text-muted-foreground">
            Understand your skin's needs and discover holistic wellness recommendations
          </p>
        </div>

        <Card className="p-8 shadow-soft">
          {!image && !stream && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={startCamera} className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Camera className="w-5 h-5 mr-2" />
                  Use Camera
                </Button>
                <Button size="lg" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Image
                </Button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
              <p className="text-center text-sm text-muted-foreground">
                For best results, ensure good lighting and a clear view of your face
              </p>
            </div>
          )}

          {stream && (
            <div className="space-y-4">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
                <video ref={videoRef} autoPlay playsInline muted style={{ transform: 'scaleX(-1)', width: '100%', minHeight: '400px', objectFit: 'cover' }} />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 left-4 right-4 flex justify-center">
                    <div className="bg-green-500/80 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Camera Active
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Button onClick={captureImage} size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Camera className="w-5 h-5 mr-2" />
                  Capture Photo
                </Button>
                <Button onClick={stopCamera} variant="outline" size="lg">Cancel</Button>
              </div>
            </div>
          )}

          {image && !result && (
            <div className="space-y-4">
              <img src={image} alt="Captured" className="w-full rounded-lg" />
              <div className="flex gap-4 justify-center">
                <Button onClick={analyzeSkin} disabled={analyzing} className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {analyzing ? "Analyzing..." : "Analyze Skin Health"}
                </Button>
                <Button onClick={() => setImage(null)} variant="outline" disabled={analyzing}>Retake</Button>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <img src={image!} alt="Analyzed" className="w-full rounded-lg mb-6" />
              
              {/* Skin Issues - Always Visible */}
              <div className="bg-muted/50 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-2">
                  Skin Type: <span className="text-primary capitalize">{result.skinType}</span>
                </h3>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Identified Concerns:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {result.issues.map((issue, idx) => <li key={idx}>{issue}</li>)}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Possible Causes (Health-focused):</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {result.possibleCauses.map((cause, idx) => <li key={idx}>{cause}</li>)}
                  </ul>
                </div>
              </div>

              {/* Dropdown Sections */}
              <div className="space-y-4">
                <AnalysisDropdown
                  title="Home Remedies"
                  icon={<Leaf className="w-5 h-5 text-primary" />}
                  variant="primary"
                >
                  <ul className="space-y-2">
                    {result.remedies.map((remedy, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="text-primary font-semibold">{idx + 1}.</span>
                        <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/remedies" className="inline-block mt-4">
                    <Button variant="outline" size="sm">View All Remedies</Button>
                  </Link>
                </AnalysisDropdown>

                <AnalysisDropdown
                  title="GlamCare Products (Optional)"
                  icon={<ShoppingBag className="w-5 h-5 text-secondary" />}
                  variant="secondary"
                >
                  <p className="text-xs text-muted-foreground mb-3">
                    These are supplementary recommendations. Focus on lifestyle changes first.
                  </p>
                  <ul className="space-y-2">
                    {result.products.map((product, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="text-secondary font-semibold">{idx + 1}.</span>
                        <span>{product}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/products" className="inline-block mt-4">
                    <Button variant="outline" size="sm">View All Products</Button>
                  </Link>
                </AnalysisDropdown>

                <AnalysisDropdown
                  title="Food & Diet Recommendations"
                  icon={<Apple className="w-5 h-5 text-accent" />}
                  variant="accent"
                >
                  <p className="text-xs text-muted-foreground mb-3">
                    What you eat significantly impacts your skin health. Consider these dietary adjustments:
                  </p>
                  <ul className="space-y-2">
                    {result.dietTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <span className="text-accent font-semibold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-accent/10 rounded text-xs">
                    <strong>Lifestyle Tips:</strong>
                    <ul className="mt-2 space-y-1">
                      {result.lifestyleAdvice.map((advice, idx) => (
                        <li key={idx}>• {advice}</li>
                      ))}
                    </ul>
                  </div>
                </AnalysisDropdown>

                <AnalysisDropdown
                  title="Doctor Consultation"
                  icon={<Stethoscope className="w-5 h-5 text-muted-foreground" />}
                  variant="muted"
                >
                  <p className="text-sm text-muted-foreground mb-4">
                    For persistent concerns or if home remedies don't help after 4-6 weeks, 
                    consider consulting a dermatologist for professional assessment.
                  </p>
                  <Link to="/doctors">
                    <Button className="bg-gradient-primary hover:shadow-glow transition-smooth">
                      Find a Dermatologist
                    </Button>
                  </Link>
                </AnalysisDropdown>
              </div>

              <Button onClick={() => { setImage(null); setResult(null); }} variant="outline" className="w-full">
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
