import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets } from "lucide-react";
import { HouseIllustration } from "@/components/HouseIllustration";
import { LocationCard } from "@/components/LocationCard";
import { RoofCard } from "@/components/RoofCard";
import { FamilyCard } from "@/components/FamilyCard";
import { CalculateButton } from "@/components/CalculateButton";
import { ResultsPage } from "@/components/ResultsPage";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  
  // Form state
  const [location, setLocation] = useState("");
  const [roofArea, setRoofArea] = useState(150);
  const [roofMaterial, setRoofMaterial] = useState("");
  const [familyMembers, setFamilyMembers] = useState(4);
  const [waterUsage, setWaterUsage] = useState(135);

  const isFormValid = location && roofMaterial;

  const handleCalculate = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <ResultsPage
        inputs={{
          location,
          roofArea,
          roofMaterial,
          familyMembers,
          waterUsage,
        }}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen hero-gradient">
      {/* Hero Section */}
      <header className="container mx-auto px-4 pt-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <div className="p-2 rounded-xl water-gradient shadow-card">
            <Droplets className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-gradient">RainHarvest</span>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              💧 Calculate How Much{" "}
              <span className="text-gradient">Rainwater</span> Your Home Can Save
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Enter basic details and see how rainwater harvesting can meet your family's water needs.
            </p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                <span className="text-lg">🏠</span>
                <span className="text-sm font-medium">Any Roof Type</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                <span className="text-lg">📍</span>
                <span className="text-sm font-medium">10+ States</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted">
                <span className="text-lg">💰</span>
                <span className="text-sm font-medium">Cost Analysis</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HouseIllustration />
          </motion.div>
        </div>

        {/* Input Cards Section */}
        <div className="max-w-2xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl font-bold mb-2">Enter Your Details</h2>
            <p className="text-muted-foreground">
              Fill in the information below to calculate your rainwater potential
            </p>
          </motion.div>

          <LocationCard
            location={location}
            onLocationChange={setLocation}
          />

          <RoofCard
            roofArea={roofArea}
            roofMaterial={roofMaterial}
            onRoofAreaChange={setRoofArea}
            onRoofMaterialChange={setRoofMaterial}
          />

          <FamilyCard
            familyMembers={familyMembers}
            waterUsage={waterUsage}
            onFamilyMembersChange={setFamilyMembers}
            onWaterUsageChange={setWaterUsage}
          />

          <CalculateButton onClick={handleCalculate} isValid={!!isFormValid} />

          {!isFormValid && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-muted-foreground"
            >
              Please fill in all required fields to calculate
            </motion.p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>💧 Save water, save the future. Calculate your rainwater harvesting potential today.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
