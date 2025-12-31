import { motion } from "framer-motion";
import { Home, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface RoofCardProps {
  roofArea: number;
  roofMaterial: string;
  onRoofAreaChange: (value: number) => void;
  onRoofMaterialChange: (value: string) => void;
}

const roofMaterials = [
  { id: "concrete", name: "Concrete", icon: "🏗️", efficiency: "0.85" },
  { id: "tiled", name: "Tiled", icon: "🧱", efficiency: "0.80" },
  { id: "gi-sheet", name: "GI Sheet", icon: "🪟", efficiency: "0.90" },
  { id: "asbestos", name: "Asbestos", icon: "🏠", efficiency: "0.75" },
];

export const RoofCard = ({
  roofArea,
  roofMaterial,
  onRoofAreaChange,
  onRoofMaterialChange,
}: RoofCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card variant="elevated" className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <span>🏡 Tell us about your roof</span>
            </CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-card border shadow-elevated">
                <p>Roof area and material affect water collection efficiency</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Roof Area Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-muted-foreground">
                Rooftop Area
              </label>
              <motion.div
                key={roofArea}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="px-4 py-2 rounded-xl water-gradient text-primary-foreground font-bold text-lg"
              >
                {roofArea} m²
              </motion.div>
            </div>
            <div className="px-2">
              <Slider
                value={[roofArea]}
                onValueChange={(value) => onRoofAreaChange(value[0])}
                min={50}
                max={500}
                step={10}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>50 m²</span>
                <span>500 m²</span>
              </div>
            </div>
          </div>

          {/* Roof Material Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              Roof Material
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roofMaterials.map((material) => (
                <motion.button
                  key={material.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onRoofMaterialChange(material.id)}
                  className={cn(
                    "relative p-4 rounded-xl border-2 transition-all duration-300 text-left",
                    roofMaterial === material.id
                      ? "border-primary bg-primary/5 shadow-card"
                      : "border-border hover:border-primary/50 bg-card hover:bg-muted/50"
                  )}
                >
                  {roofMaterial === material.id && (
                    <motion.div
                      layoutId="selectedMaterial"
                      className="absolute inset-0 border-2 border-primary rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative flex flex-col items-center gap-2">
                    <span className="text-3xl">{material.icon}</span>
                    <span className="font-medium text-sm">{material.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {(parseFloat(material.efficiency) * 100).toFixed(0)}% efficient
                    </span>
                  </div>
                  {roofMaterial === material.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full water-gradient flex items-center justify-center"
                    >
                      <span className="text-primary-foreground text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <span className="text-lg">📌</span>
            <p className="text-sm text-muted-foreground">
              Different materials have different water collection efficiency
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
