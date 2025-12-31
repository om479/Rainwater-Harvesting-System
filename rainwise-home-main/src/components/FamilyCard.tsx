import { motion } from "framer-motion";
import { Users, Minus, Plus, HelpCircle, Droplets } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FamilyCardProps {
  familyMembers: number;
  waterUsage: number;
  onFamilyMembersChange: (value: number) => void;
  onWaterUsageChange: (value: number) => void;
}

export const FamilyCard = ({
  familyMembers,
  waterUsage,
  onFamilyMembersChange,
  onWaterUsageChange,
}: FamilyCardProps) => {
  const handleWaterUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onWaterUsageChange(Math.min(300, Math.max(0, value)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card variant="elevated" className="overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span>👨‍👩‍👧 Your household water usage</span>
            </CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs bg-card border shadow-elevated">
                <p>Help us calculate your family's daily water requirement</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Family Members Counter */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              Family Members
            </label>
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="counter"
                size="counter"
                onClick={() => onFamilyMembersChange(Math.max(1, familyMembers - 1))}
                disabled={familyMembers <= 1}
              >
                <Minus className="w-5 h-5" />
              </Button>
              <motion.div
                key={familyMembers}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center"
              >
                <span className="text-5xl font-bold text-gradient">{familyMembers}</span>
                <span className="text-sm text-muted-foreground">
                  {familyMembers === 1 ? "person" : "people"}
                </span>
              </motion.div>
              <Button
                variant="counter"
                size="counter"
                onClick={() => onFamilyMembersChange(Math.min(15, familyMembers + 1))}
                disabled={familyMembers >= 15}
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Water Usage Input */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-muted-foreground">
              Water Usage Per Person Per Day
            </label>
            <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-border bg-card">
              <div className="text-2xl">🚿</div>
              <Input
                type="number"
                value={waterUsage || ""}
                onChange={handleWaterUsageChange}
                min={50}
                max={300}
                placeholder="135"
                className="text-xl font-semibold border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-24 text-center"
              />
              <span className="text-muted-foreground font-medium">L/day</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
            <span className="text-lg">📌</span>
            <p className="text-sm text-muted-foreground">
              135 L/day is recommended by CPHEEO (Central Public Health & Environmental Engineering Organisation)
            </p>
          </div>

          {/* Daily requirement preview */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Your daily water requirement</p>
                <p className="text-2xl font-bold text-gradient">
                  {familyMembers * waterUsage} Litres/day
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};