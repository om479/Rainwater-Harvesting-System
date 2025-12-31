import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

export const HouseIllustration = () => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 350" className="w-full h-auto">
        {/* Sky background */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 85%, 90%)" />
            <stop offset="100%" stopColor="hsl(200, 85%, 97%)" />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(15, 70%, 45%)" />
            <stop offset="100%" stopColor="hsl(15, 60%, 35%)" />
          </linearGradient>
          <linearGradient id="wallGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(40, 30%, 95%)" />
            <stop offset="100%" stopColor="hsl(40, 25%, 88%)" />
          </linearGradient>
          <linearGradient id="tankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 20%, 70%)" />
            <stop offset="100%" stopColor="hsl(200, 20%, 55%)" />
          </linearGradient>
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 85%, 55%)" />
            <stop offset="100%" stopColor="hsl(200, 85%, 45%)" />
          </linearGradient>
        </defs>

        {/* Clouds */}
        <motion.g
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="80" cy="50" rx="30" ry="15" fill="white" opacity="0.8" />
          <ellipse cx="100" cy="45" rx="25" ry="12" fill="white" opacity="0.9" />
          <ellipse cx="60" cy="48" rx="20" ry="10" fill="white" opacity="0.7" />
        </motion.g>

        <motion.g
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="320" cy="40" rx="25" ry="12" fill="white" opacity="0.8" />
          <ellipse cx="340" cy="35" rx="20" ry="10" fill="white" opacity="0.9" />
        </motion.g>

        {/* House base/wall */}
        <rect x="100" y="150" width="200" height="130" fill="url(#wallGradient)" rx="4" />
        
        {/* Roof */}
        <polygon points="200,70 80,150 320,150" fill="url(#roofGradient)" />
        <polygon points="200,70 100,150 300,150" fill="hsl(15, 65%, 40%)" opacity="0.3" />

        {/* Windows */}
        <rect x="130" y="180" width="45" height="55" fill="hsl(200, 50%, 80%)" rx="3" />
        <rect x="135" y="185" width="35" height="20" fill="hsl(200, 60%, 90%)" rx="2" />
        <rect x="135" y="210" width="35" height="20" fill="hsl(200, 60%, 90%)" rx="2" />

        <rect x="225" y="180" width="45" height="55" fill="hsl(200, 50%, 80%)" rx="3" />
        <rect x="230" y="185" width="35" height="20" fill="hsl(200, 60%, 90%)" rx="2" />
        <rect x="230" y="210" width="35" height="20" fill="hsl(200, 60%, 90%)" rx="2" />

        {/* Door */}
        <rect x="175" y="210" width="50" height="70" fill="hsl(25, 50%, 35%)" rx="3" />
        <circle cx="215" cy="250" r="4" fill="hsl(45, 70%, 50%)" />

        {/* Pipe from roof */}
        <path
          d="M310 150 L310 180 Q310 200 330 200 L330 280"
          stroke="hsl(200, 20%, 60%)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Water tank */}
        <rect x="315" y="230" width="60" height="90" fill="url(#tankGradient)" rx="8" />
        
        {/* Water in tank */}
        <motion.rect
          x="318"
          y="270"
          width="54"
          height="47"
          fill="url(#waterGradient)"
          rx="5"
          initial={{ height: 0, y: 317 }}
          animate={{ height: 47, y: 270 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        />

        {/* Tank lid */}
        <rect x="310" y="223" width="70" height="12" fill="hsl(200, 20%, 50%)" rx="4" />

        {/* Rain drops animation */}
        {[...Array(8)].map((_, i) => (
          <motion.g key={i}>
            <motion.line
              x1={100 + i * 30}
              y1={30}
              x2={100 + i * 30}
              y2={45}
              stroke="hsl(200, 85%, 55%)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 70, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 1.2,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            />
          </motion.g>
        ))}

        {/* Water flow from pipe */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.circle
              key={i}
              cx={330}
              cy={200}
              r={4}
              fill="hsl(200, 85%, 55%)"
              initial={{ cy: 200, opacity: 1 }}
              animate={{ cy: 230, opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.2 + 1,
                repeat: Infinity,
                repeatDelay: 0.4,
              }}
            />
          ))}
        </motion.g>

        {/* Ground */}
        <rect x="0" y="280" width="400" height="70" fill="hsl(140, 40%, 45%)" rx="0" />
        <ellipse cx="50" cy="300" rx="30" ry="8" fill="hsl(140, 35%, 40%)" />
        <ellipse cx="380" cy="310" rx="25" ry="7" fill="hsl(140, 35%, 40%)" />
      </svg>

      {/* Floating water drop indicator */}
      <motion.div
        className="absolute top-4 right-4 flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Droplets className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-primary">Collecting Rain</span>
      </motion.div>
    </div>
  );
};
