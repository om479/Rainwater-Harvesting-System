import { motion } from "framer-motion";
import { IndianRupee, Wrench, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface CostTabProps {
  annualSavings: number;
  installationCost: number;
  paybackPeriod: number;
}

export const CostTab = ({ annualSavings, installationCost, paybackPeriod }: CostTabProps) => {
  // Generate savings over years data
  const yearsData = Array.from({ length: 10 }, (_, i) => ({
    year: `Year ${i + 1}`,
    savings: annualSavings * (i + 1),
    cost: installationCost,
  }));

  const breakEvenYear = Math.ceil(paybackPeriod);

  const costMetrics = [
    {
      icon: IndianRupee,
      label: "Annual Water Cost Savings",
      value: `₹${annualSavings.toLocaleString()}`,
      unit: "/year",
      color: "from-eco-400 to-eco-600",
    },
    {
      icon: Wrench,
      label: "System Installation Cost",
      value: `₹${installationCost.toLocaleString()}`,
      unit: "(one-time)",
      color: "from-water-400 to-water-600",
    },
    {
      icon: Clock,
      label: "Payback Period",
      value: paybackPeriod.toFixed(1),
      unit: "Years",
      color: "from-accent to-primary",
      highlight: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Cost Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {costMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              variant="elevated" 
              className={metric.highlight ? "ring-2 ring-primary/30" : ""}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-card`}>
                    <metric.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        className="text-2xl font-bold text-gradient"
                      >
                        {metric.value}
                      </motion.span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {metric.unit}
                      </span>
                    </div>
                    {metric.highlight && (
                      <p className="text-xs text-primary mt-1 font-medium">
                        ⭐ Great investment!
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ROI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card variant="elevated" className="overflow-hidden">
          <div className="water-gradient p-6 text-primary-foreground">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <div>
                <h3 className="font-semibold text-lg">10-Year Savings Potential</h3>
                <p className="opacity-90">
                  Total savings: <span className="font-bold text-2xl">₹{(annualSavings * 10).toLocaleString()}</span>
                </p>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              After the initial investment of ₹{installationCost.toLocaleString()}, you'll save ₹{annualSavings.toLocaleString()} every year. 
              Your system pays for itself in just <span className="font-semibold text-foreground">{paybackPeriod.toFixed(1)} years</span>, 
              and then it's pure savings!
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Savings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="elevated">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-6">📉 Cumulative Savings Over Time</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "var(--shadow-card)",
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, "Cumulative Savings"]}
                  />
                  <ReferenceLine
                    y={installationCost}
                    stroke="hsl(var(--destructive))"
                    strokeDasharray="5 5"
                    label={{
                      value: "Break-even",
                      fill: "hsl(var(--destructive))",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="hsl(160, 60%, 45%)"
                    strokeWidth={3}
                    dot={{ fill: "hsl(160, 60%, 45%)", strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: "hsl(160, 60%, 45%)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-eco-100/50 dark:bg-eco-900/20">
              <span className="text-lg">💡</span>
              <p className="text-sm text-muted-foreground">
                Break-even point highlighted in red. After Year {breakEvenYear}, every rupee saved is profit!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
