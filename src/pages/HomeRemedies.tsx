import { Card } from "@/components/ui/card";
import { Leaf, Droplets, Sun, Moon, Heart, Apple } from "lucide-react";

interface Remedy {
  id: string;
  title: string;
  concern: string;
  ingredients: string[];
  instructions: string;
  frequency: string;
  caution: string;
  icon: React.ElementType;
}

const remedies: Remedy[] = [
  {
    id: "1",
    title: "Honey & Turmeric Face Pack",
    concern: "Acne & Inflammation",
    ingredients: ["1 tbsp raw honey", "1/4 tsp turmeric powder", "Few drops of lemon (optional)"],
    instructions: "Mix ingredients to form a paste. Apply evenly on cleansed face, leave for 15-20 minutes, then rinse with lukewarm water.",
    frequency: "2-3 times per week",
    caution: "Turmeric may temporarily stain fair skin. Do a patch test first.",
    icon: Leaf,
  },
  {
    id: "2",
    title: "Aloe Vera Gel Application",
    concern: "Dryness & Irritation",
    ingredients: ["Fresh aloe vera gel (from leaf or pure store-bought)"],
    instructions: "Apply a thin layer of pure aloe vera gel on cleansed skin. Leave overnight or for 30 minutes before rinsing.",
    frequency: "Daily, preferably at night",
    caution: "Some people may be allergic. Test on a small area first.",
    icon: Droplets,
  },
  {
    id: "3",
    title: "Multani Mitti (Fuller's Earth) Mask",
    concern: "Oily Skin & Excess Sebum",
    ingredients: ["2 tbsp multani mitti", "Rose water (enough to make paste)", "1 tsp neem powder (optional)"],
    instructions: "Mix ingredients to form a smooth paste. Apply on face avoiding eye area. Let dry naturally (10-15 mins), then wash off.",
    frequency: "Once or twice a week",
    caution: "Not recommended for very dry skin. Moisturize after use.",
    icon: Sun,
  },
  {
    id: "4",
    title: "Cucumber & Potato Eye Treatment",
    concern: "Dark Circles & Puffiness",
    ingredients: ["Fresh cucumber slices", "Or raw potato slices"],
    instructions: "Chill cucumber/potato slices in refrigerator. Place over closed eyes for 15-20 minutes. Rinse face after.",
    frequency: "Daily, especially after inadequate sleep",
    caution: "Avoid if you have any cuts or irritation around eyes.",
    icon: Moon,
  },
  {
    id: "5",
    title: "Oatmeal & Yogurt Scrub",
    concern: "Dull Skin & Gentle Exfoliation",
    ingredients: ["2 tbsp ground oatmeal", "1 tbsp plain yogurt", "1 tsp honey"],
    instructions: "Mix ingredients. Gently massage on damp face in circular motions for 2-3 minutes. Rinse with cool water.",
    frequency: "Once a week",
    caution: "Be gentle. Over-exfoliation can damage skin barrier.",
    icon: Heart,
  },
  {
    id: "6",
    title: "Papaya Face Pack",
    concern: "Uneven Texture & Natural Glow",
    ingredients: ["Ripe papaya (mashed)", "1 tsp honey", "1/2 tsp lemon juice"],
    instructions: "Mash ripe papaya and mix with other ingredients. Apply evenly, leave 15-20 minutes, rinse off.",
    frequency: "Once a week",
    caution: "Papaya enzymes may cause tingling. Avoid on broken skin.",
    icon: Apple,
  },
];

const HomeRemedies = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-gradient-soft">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Natural Home Remedies</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Safe, natural remedies using ingredients from your kitchen. Remember: external skin health reflects internal wellness - these remedies work best alongside a healthy diet and lifestyle.
          </p>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8">
          <p className="text-sm text-center">
            <strong>Important:</strong> Always do a patch test before trying any new remedy. If you experience irritation, discontinue use. For persistent skin concerns, consult a dermatologist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {remedies.map((remedy) => (
            <Card key={remedy.id} className="p-6 shadow-soft hover:shadow-glow transition-smooth">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-primary">
                  <remedy.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{remedy.title}</h3>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary mb-3">
                    {remedy.concern}
                  </span>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Ingredients:</h4>
                      <ul className="list-disc list-inside text-sm space-y-0.5">
                        {remedy.ingredients.map((ing, idx) => (
                          <li key={idx}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">How to Use:</h4>
                      <p className="text-sm">{remedy.instructions}</p>
                    </div>
                    
                    <div className="flex gap-4 text-sm">
                      <span className="text-primary font-medium">📅 {remedy.frequency}</span>
                    </div>
                    
                    <div className="bg-muted/50 rounded p-2 text-xs text-muted-foreground">
                      ⚠️ {remedy.caution}
                    </div>
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

export default HomeRemedies;
