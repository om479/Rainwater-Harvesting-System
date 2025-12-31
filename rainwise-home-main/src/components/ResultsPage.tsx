import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Container, IndianRupee, Wrench, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultsTab } from "@/components/ResultsTab";
import { StorageTab } from "@/components/StorageTab";
import { CostTab } from "@/components/CostTab";
import { RecommendationsTab } from "@/components/RecommendationsTab";
import { cn } from "@/lib/utils";
import { getRainfallByLocation, validLocations } from "@/data/rainfallData";

interface ResultsPageProps {
  inputs: {
    location: string;
    roofArea: number;
    roofMaterial: string;
    familyMembers: number;
    waterUsage: number;
  };
  onBack: () => void;
}

const tabs = [
  { id: "results", label: "Results", icon: BarChart3, emoji: "📊" },
  { id: "storage", label: "Storage", icon: Container, emoji: "🛢" },
  { id: "cost", label: "Cost", icon: IndianRupee, emoji: "💰" },
  { id: "recommendations", label: "Recommendations", icon: Wrench, emoji: "🛠" },
];

const roofEfficiency: Record<string, number> = {
  "concrete": 0.85,
  "tiled": 0.80,
  "gi-sheet": 0.90,
  "asbestos": 0.75,
};

export const ResultsPage = ({ inputs, onBack }: ResultsPageProps) => {
  const [activeTab, setActiveTab] = useState("results");

  // Get location display name
  const locationData = validLocations.find(loc => loc.name === inputs.location);
  const locationDisplayName = locationData?.displayName || inputs.location;

  // Calculate results
  const rainfall = getRainfallByLocation(inputs.location) || 1000; // mm/year
  const efficiency = roofEfficiency[inputs.roofMaterial] || 0.85;
  
  // Annual harvested water (litres) = Roof Area (m²) × Rainfall (mm) × Efficiency
  const annualHarvested = Math.round(inputs.roofArea * rainfall * efficiency);
  
  // Daily water requirement
  const dailyRequirement = inputs.familyMembers * inputs.waterUsage;
  const annualRequirement = dailyRequirement * 365;
  
  // Coverage percentage
  const coveragePercent = (annualHarvested / annualRequirement) * 100;
  
  // Recommended storage (approximately 15-20% of annual harvest, minimum 2 weeks of usage)
  const minStorage = dailyRequirement * 14;
  const recommendedStorage = Math.max(
    Math.round(annualHarvested * 0.12 / 1000) * 1000,
    Math.round(minStorage / 1000) * 1000
  );
  
  // Cost estimation
  const waterRate = 15; // ₹ per kL
  const annualSavings = Math.round((annualHarvested / 1000) * waterRate * 4); // x4 for actual savings
  const installationCost = Math.round((recommendedStorage * 2.5) + 10000); // Base cost + tank cost
  const paybackPeriod = installationCost / annualSavings;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Calculator
            </Button>
            <h1 className="text-lg font-semibold text-gradient hidden sm:block">
              💧 Your Rainwater Potential
            </h1>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-[73px] z-40 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300",
                  activeTab === tab.id
                    ? "water-gradient text-primary-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "results" && (
              <ResultsTab
                annualHarvested={annualHarvested}
                dailyRequirement={dailyRequirement}
                coveragePercent={coveragePercent}
              />
            )}
            {activeTab === "storage" && (
              <StorageTab
                annualHarvested={annualHarvested}
                recommendedStorage={recommendedStorage}
              />
            )}
            {activeTab === "cost" && (
              <CostTab
                annualSavings={annualSavings}
                installationCost={installationCost}
                paybackPeriod={paybackPeriod}
              />
            )}
            {activeTab === "recommendations" && (
              <RecommendationsTab
                roofMaterial={inputs.roofMaterial}
                location={locationDisplayName}
                recommendedStorage={recommendedStorage}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
