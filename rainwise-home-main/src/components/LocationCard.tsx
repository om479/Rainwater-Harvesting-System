import { motion } from "framer-motion";
import { MapPin, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { validLocations } from "@/data/rainfallData";

interface LocationCardProps {
  location: string;
  onLocationChange: (value: string) => void;
}

export const LocationCard = ({
  location,
  onLocationChange,
}: LocationCardProps) => {
  const selectedLocation = validLocations.find(loc => loc.name === location);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="elevated" className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span>📍 Where is your home located?</span>
            </CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-card border shadow-elevated">
                <p>We use location to estimate annual rainfall in your area</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Location</label>
            <Select value={location} onValueChange={onLocationChange}>
              <SelectTrigger className="h-12 rounded-xl border-2 border-border hover:border-primary/50 transition-colors bg-background">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Select your location" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-card border shadow-elevated rounded-xl max-h-[300px]">
                {validLocations.map((loc) => (
                  <SelectItem
                    key={loc.name}
                    value={loc.name}
                    className="rounded-lg hover:bg-primary/10 focus:bg-primary/10 cursor-pointer"
                  >
                    {loc.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedLocation && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-primary/10 border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🌧️</span>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Rainfall</p>
                  <p className="font-semibold text-primary">{selectedLocation.annualRainfall} mm/year</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <span className="text-lg">💡</span>
            <p className="text-sm text-muted-foreground">
              We use location to estimate annual rainfall
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
