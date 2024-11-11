import { LinePaths, LineColors, LinePathVariants } from "@/utils/client";
import { motion } from "framer-motion";

import type { ILineSVGProps } from "@/types/client";
import type { ReactNode } from "react";

export default function LineSVG({ svgOptions }: ILineSVGProps): ReactNode {
  return (
    <motion.svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      {LinePaths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={LineColors[idx]}
          strokeWidth="2.3"
          strokeLinecap="round"
          variants={LinePathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: svgOptions?.duration || 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.floor(Math.random() * 10),
            repeatDelay: Math.floor(Math.random() * 10 + 2),
          }}
          key={`path-first-${idx}`}
        />
      ))}

      {/* duplicate for more paths */}
      {LinePaths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={LineColors[idx]}
          strokeWidth="2.3"
          strokeLinecap="round"
          variants={LinePathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: svgOptions?.duration || 10,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.floor(Math.random() * 10),
            repeatDelay: Math.floor(Math.random() * 10 + 2),
          }}
          key={`path-second-${idx}`}
        />
      ))}
    </motion.svg>
  );
}
