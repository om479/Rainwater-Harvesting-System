import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalculateButtonProps {
  onClick: () => void;
  isValid: boolean;
}

export const CalculateButton = ({ onClick, isValid }: CalculateButtonProps) => {
  const [isCalculating, setIsCalculating] = useState(false);

  const handleClick = async () => {
    if (!isValid || isCalculating) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsCalculating(false);
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex justify-center py-8"
    >
      <Button
        variant="calculate"
        size="xl"
        onClick={handleClick}
        disabled={!isValid || isCalculating}
        className={`relative overflow-hidden min-w-[300px] ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <AnimatePresence mode="wait">
          {isCalculating ? (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              {/* Water fill animation */}
              <motion.div
                className="absolute inset-0 bg-secondary/30"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Droplets className="w-6 h-6" />
              </motion.div>
              <span className="relative z-10">Calculating...</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💧
              </motion.span>
              <span>Calculate Rainwater Potential</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on hover */}
        {isValid && !isCalculating && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            whileHover={{
              background: [
                "radial-gradient(circle at center, transparent 0%, transparent 100%)",
                "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
              ],
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </Button>
    </motion.div>
  );
};
