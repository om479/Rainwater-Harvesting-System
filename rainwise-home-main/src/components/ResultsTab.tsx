import { motion } from "framer-motion";
import { Droplets, Droplet, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

interface ResultsTabProps {
  annualHarvested: number;
  dailyRequirement: number;
  coveragePercent: number;
}

export const ResultsTab = ({
  annualHarvested,
  dailyRequirement,
  coveragePercent,
}: ResultsTabProps) => {
  const annualRequirement = dailyRequirement * 365;
  
  const monthlyData = [
    { month: "Jan", harvested: Math.round(annualHarvested * 0.02), required: Math.round(annualRequirement / 12) },
    { month: "Feb", harvested: Math.round(annualHarvested * 0.02), required: Math.round(annualRequirement / 12) },
    { month: "Mar", harvested: Math.round(annualHarvested * 0.03), required: Math.round(annualRequirement / 12) },
    { month: "Apr", harvested: Math.round(annualHarvested * 0.05), required: Math.round(annualRequirement / 12) },
    { month: "May", harvested: Math.round(annualHarvested * 0.08), required: Math.round(annualRequirement / 12) },
    { month: "Jun", harvested: Math.round(annualHarvested * 0.18), required: Math.round(annualRequirement / 12) },
    { month: "Jul", harvested: Math.round(annualHarvested * 0.22), required: Math.round(annualRequirement / 12) },
    { month: "Aug", harvested: Math.round(annualHarvested * 0.18), required: Math.round(annualRequirement / 12) },
    { month: "Sep", harvested: Math.round(annualHarvested * 0.12), required: Math.round(annualRequirement / 12) },
    { month: "Oct", harvested: Math.round(annualHarvested * 0.06), required: Math.round(annualRequirement / 12) },
    { month: "Nov", harvested: Math.round(annualHarvested * 0.02), required: Math.round(annualRequirement / 12) },
    { month: "Dec", harvested: Math.round(annualHarvested * 0.02), required: Math.round(annualRequirement / 12) },
  ];

  const metrics = [
    {
      icon: Droplets,
      label: "Annual Harvested Water",
      value: annualHarvested.toLocaleString(),
      unit: "Litres/Year",
      subtext: "From your rooftop",
      color: "from-water-400 to-water-600",
    },
    {
      icon: Droplet,
      label: "Daily Water Requirement",
      value: dailyRequirement.toLocaleString(),
      unit: "Litres/Day",
      subtext: "For your family",
      color: "from-accent to-primary",
    },
    {
      icon: CheckCircle,
      label: "Coverage",
      value: coveragePercent.toFixed(0),
      unit: "%",
      subtext: "Of your annual water needs",
      color: "from-eco-400 to-eco-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="elevated" className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-card`}>
                    <metric.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                        className="text-3xl font-bold text-gradient"
                      >
                        {metric.value}
                      </motion.span>
                      <span className="text-lg font-medium text-muted-foreground">
                        {metric.unit}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{metric.subtext}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Coverage Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card variant="elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Water Needs Coverage</h3>
              <span className="text-2xl font-bold text-gradient">{coveragePercent.toFixed(0)}%</span>
            </div>
            <div className="relative h-4 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 water-gradient rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(coveragePercent, 100)}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              💧 Your roof can supply water for approximately{" "}
              <span className="font-semibold text-foreground">
                {Math.round((coveragePercent / 100) * 12)} months
              </span>{" "}
              of the year
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Monthly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="elevated">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-6">📈 Harvested vs Required Water (Monthly)</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      boxShadow: "var(--shadow-card)",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value.toLocaleString()} L`,
                      name === "harvested" ? "Harvested" : "Required",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="harvested"
                    name="Harvested"
                    fill="hsl(200, 85%, 45%)"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="required"
                    name="Required"
                    fill="hsl(var(--muted-foreground))"
                    radius={[4, 4, 0, 0]}
                    opacity={0.5}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
