import { motion } from "framer-motion";
import { Container, Droplets, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StorageTabProps {
  annualHarvested: number;
  recommendedStorage: number;
}

export const StorageTab = ({ annualHarvested, recommendedStorage }: StorageTabProps) => {
  const fillPercent = Math.min((recommendedStorage / 20000) * 100, 100);

  return (
    <div className="space-y-8">
      {/* Storage Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-water-400 to-water-600 shadow-card">
                  <Droplets className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Water Available From Roof</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-gradient">
                      {annualHarvested.toLocaleString()}
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">
                      Litres/Year
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-eco-400 to-eco-600 shadow-card">
                  <Container className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recommended Storage Capacity</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-gradient">
                      {recommendedStorage.toLocaleString()}
                    </span>
                    <span className="text-lg font-medium text-muted-foreground">
                      Litres
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Based on rainfall pattern and usage
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tank Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="elevated">
          <CardContent className="p-8">
            <h3 className="font-semibold text-lg mb-6 text-center">🛢 Recommended Tank Capacity</h3>
            
            <div className="flex flex-col items-center">
              {/* Tank SVG */}
              <div className="relative w-48 h-64">
                <svg viewBox="0 0 120 180" className="w-full h-full">
                  {/* Tank body */}
                  <defs>
                    <linearGradient id="tankBody" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(200, 20%, 75%)" />
                      <stop offset="50%" stopColor="hsl(200, 20%, 85%)" />
                      <stop offset="100%" stopColor="hsl(200, 20%, 70%)" />
                    </linearGradient>
                    <linearGradient id="waterFill" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="hsl(200, 85%, 45%)" />
                      <stop offset="100%" stopColor="hsl(200, 85%, 60%)" />
                    </linearGradient>
                    <clipPath id="tankClip">
                      <rect x="15" y="30" width="90" height="130" rx="8" />
                    </clipPath>
                  </defs>
                  
                  {/* Tank outline */}
                  <rect
                    x="15"
                    y="30"
                    width="90"
                    height="130"
                    rx="8"
                    fill="url(#tankBody)"
                    stroke="hsl(200, 20%, 55%)"
                    strokeWidth="3"
                  />
                  
                  {/* Water fill animation */}
                  <motion.rect
                    x="18"
                    y="160"
                    width="84"
                    height="0"
                    fill="url(#waterFill)"
                    rx="5"
                    clipPath="url(#tankClip)"
                    initial={{ height: 0, y: 157 }}
                    animate={{ 
                      height: (fillPercent / 100) * 124,
                      y: 157 - (fillPercent / 100) * 124
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  
                  {/* Water surface shine */}
                  <motion.rect
                    x="20"
                    y="157"
                    width="80"
                    height="4"
                    fill="hsl(200, 85%, 70%)"
                    opacity="0.5"
                    rx="2"
                    initial={{ y: 157 }}
                    animate={{ y: 157 - (fillPercent / 100) * 124 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  
                  {/* Tank lid */}
                  <rect
                    x="10"
                    y="20"
                    width="100"
                    height="15"
                    rx="4"
                    fill="hsl(200, 20%, 50%)"
                  />
                  
                  {/* Lid handle */}
                  <rect
                    x="50"
                    y="12"
                    width="20"
                    height="10"
                    rx="3"
                    fill="hsl(200, 20%, 45%)"
                  />
                  
                  {/* Capacity markers */}
                  {[25, 50, 75, 100].map((percent, i) => (
                    <g key={percent}>
                      <line
                        x1="108"
                        y1={157 - (percent / 100) * 124}
                        x2="115"
                        y2={157 - (percent / 100) * 124}
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth="1"
                      />
                      <text
                        x="118"
                        y={160 - (percent / 100) * 124}
                        fontSize="8"
                        fill="hsl(var(--muted-foreground))"
                      >
                        {percent}%
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Capacity label */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
                >
                  <span className="text-2xl font-bold text-primary-foreground drop-shadow-lg">
                    {recommendedStorage.toLocaleString()}L
                  </span>
                </motion.div>
              </div>

              <p className="text-center text-muted-foreground mt-4 max-w-md">
                Based on your roof area and local rainfall, this is the optimal tank size to maximize rainwater collection
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Info Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                You don't need to store all rainwater at once — optimal tank size is calculated based on 
                monthly rainfall distribution and your daily usage pattern.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
