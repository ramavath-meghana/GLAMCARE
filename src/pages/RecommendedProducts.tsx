import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Droplet, Sun, Shield, Leaf } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  skinConcern: string[];
  description: string;
  howToUse: string;
  keyIngredients: string[];
  icon: React.ElementType;
}

const products: Product[] = [
  {
    id: "1",
    name: "GlamCare Gentle Cleanser",
    category: "Cleanser",
    skinConcern: ["All Skin Types", "Sensitive Skin"],
    description: "A pH-balanced, sulfate-free cleanser that gently removes impurities without stripping the skin's natural moisture barrier.",
    howToUse: "Use morning and evening. Massage onto damp skin, then rinse with lukewarm water.",
    keyIngredients: ["Aloe Vera", "Chamomile Extract", "Glycerin"],
    icon: Droplet,
  },
  {
    id: "2",
    name: "GlamCare Hydrating Serum",
    category: "Serum",
    skinConcern: ["Dry Skin", "Dehydration"],
    description: "Lightweight hydrating serum with hyaluronic acid that attracts and retains moisture for plump, healthy-looking skin.",
    howToUse: "Apply 2-3 drops to clean, slightly damp skin before moisturizer. Use morning and night.",
    keyIngredients: ["Hyaluronic Acid", "Vitamin B5", "Aloe Vera"],
    icon: Sparkles,
  },
  {
    id: "3",
    name: "GlamCare Oil Control Moisturizer",
    category: "Moisturizer",
    skinConcern: ["Oily Skin", "Combination Skin"],
    description: "Oil-free, non-comedogenic moisturizer that provides hydration while helping control excess sebum production.",
    howToUse: "Apply a small amount to face and neck after cleansing and serum, morning and night.",
    keyIngredients: ["Niacinamide", "Green Tea Extract", "Salicylic Acid"],
    icon: Leaf,
  },
  {
    id: "4",
    name: "GlamCare Daily Sunscreen SPF 50",
    category: "Sun Protection",
    skinConcern: ["All Skin Types", "Sun Protection"],
    description: "Broad-spectrum sunscreen that protects against UVA and UVB rays without leaving a white cast. Essential for daily skin health.",
    howToUse: "Apply generously 15 minutes before sun exposure. Reapply every 2 hours when outdoors.",
    keyIngredients: ["Zinc Oxide", "Vitamin E", "Aloe Vera"],
    icon: Sun,
  },
  {
    id: "5",
    name: "GlamCare Soothing Night Cream",
    category: "Night Care",
    skinConcern: ["Sensitive Skin", "Redness"],
    description: "Rich, calming night cream that repairs and soothes skin while you sleep. Helps strengthen the skin barrier.",
    howToUse: "Apply to clean face as the last step of your nighttime routine. Massage gently until absorbed.",
    keyIngredients: ["Centella Asiatica", "Ceramides", "Oat Extract"],
    icon: Shield,
  },
  {
    id: "6",
    name: "GlamCare Acne Care Gel",
    category: "Treatment",
    skinConcern: ["Acne", "Blemishes"],
    description: "Targeted treatment gel that helps reduce blemishes and prevent new breakouts without over-drying the skin.",
    howToUse: "Apply a thin layer to affected areas after cleansing, before moisturizer. Use once or twice daily.",
    keyIngredients: ["Tea Tree Oil", "Niacinamide", "Zinc"],
    icon: Leaf,
  },
];

const RecommendedProducts = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">GlamCare Products</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our carefully formulated products are designed to support your skin's natural health. Remember: products are supplementary to a healthy lifestyle, proper hydration, and balanced nutrition.
          </p>
        </div>

        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-center">
            <strong>Note:</strong> These product recommendations are optional and supplementary to lifestyle changes. Always patch test new products and consult a dermatologist if you have specific skin conditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-6 shadow-soft hover:shadow-glow transition-smooth flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-primary">
                  <product.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">{product.category}</span>
                  <h3 className="font-semibold">{product.name}</h3>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {product.skinConcern.map((concern, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {concern}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {product.description}
              </p>

              <div className="space-y-3 pt-4 border-t border-border">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">How to Use:</h4>
                  <p className="text-xs">{product.howToUse}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Key Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {product.keyIngredients.map((ing, idx) => (
                      <span key={idx} className="text-xs bg-muted px-2 py-0.5 rounded">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
