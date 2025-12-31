import { motion } from "framer-motion";
import {
  Droplets,
  PipetteIcon,
  Filter,
  Container,
  Download,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { downloadPDF } from "@/utils/downloadPdf";

interface RecommendationsTabProps {
  roofMaterial: string;
  location: string;
  recommendedStorage: number;
}

const steps = [
  {
    step: 1,
    title: "Catchment",
    icon: Droplets,
    items: [
      "Use existing rooftop",
      "Keep roof clean regularly",
      "Remove debris and leaves",
    ],
    color: "from-water-400 to-water-600",
  },
  {
    step: 2,
    title: "Conveyance",
    icon: PipetteIcon,
    items: [
      "PVC pipes (110mm diameter)",
      "Leaf guards at entry points",
      "Proper slope for water flow",
    ],
    color: "from-accent to-primary",
  },
  {
    step: 3,
    title: "Filtration",
    icon: Filter,
    items: [
      "Sand + charcoal filter",
      "First-flush diverter system",
      "Mesh screens for debris",
    ],
    color: "from-eco-400 to-eco-600",
  },
  {
    step: 4,
    title: "Storage",
    icon: Container,
    items: [
      "Underground or overhead tank",
      "Overflow connection to recharge",
      "Regular cleaning every 6 months",
    ],
    color: "from-primary to-water-600",
  },
];

const roofMaterialNames: Record<string, string> = {
  concrete: "Concrete",
  tiled: "Tiled",
  "gi-sheet": "GI Sheet",
  asbestos: "Asbestos",
};

export const RecommendationsTab = ({
  roofMaterial,
  location,
  recommendedStorage,
}: RecommendationsTabProps) => {
  const tankType = recommendedStorage > 10000 ? "underground" : "overhead";
  const materialName = roofMaterialNames[roofMaterial] || roofMaterial;

  /* ===============================
     PDF DOWNLOAD HANDLER (DYNAMIC)
     =============================== */
  const handleDownloadPDF = () => {
    downloadPDF({
      state: "N/A", // state not available in this component
      city: location,
      roofArea: 0, // roof area not passed here
      annualRainfall: null, // rainfall not passed here
      harvestedWater: recommendedStorage, // ACTUAL calculated result
    });
  };

  return (
    <div className="space-y-8">
      {/* Personalized Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="water-gradient text-primary-foreground overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-foreground/20">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  🌟 Personalized Recommendation
                </h3>
                <p className="opacity-95">
                  For a{" "}
                  <span className="font-bold">{materialName} roof</span> in{" "}
                  <span className="font-bold">{location}</span>, we recommend an{" "}
                  <span className="font-bold">{tankType} tank</span> of{" "}
                  <span className="font-bold">
                    {recommendedStorage.toLocaleString()} L
                  </span>{" "}
                  capacity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* How to Build Your System */}
      <div>
        <h3 className="font-semibold text-lg mb-4">
          🧱 How to Build Your System
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="elevated" className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${step.color} shadow-card`}
                    >
                      <step.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Step {step.step}
                      </span>
                      <CardTitle className="text-lg">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pro Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="elevated">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">💡 Pro Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                <span className="text-2xl">🔧</span>
                <div>
                  <h4 className="font-medium mb-1">Maintenance</h4>
                  <p className="text-sm text-muted-foreground">
                    Clean filters monthly during monsoon. Inspect pipes yearly.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-medium mb-1">First Flush</h4>
                  <p className="text-sm text-muted-foreground">
                    Use a first-flush diverter to remove roof pollutants.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Download Report Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          variant="water"
          size="xl"
          className="gap-3"
          onClick={handleDownloadPDF}
        >
          <Download className="w-5 h-5" />
          📄 Download PDF Report
        </Button>
      </motion.div>
    </div>
  );
};
