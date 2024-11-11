"use client";
import { type ReactNode, type HTMLProps, forwardRef, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/client";

import type { ICollisionMechanismProps, TCollision } from "@/types/client";

function Explosion({ ...props }: HTMLProps<HTMLDivElement>): ReactNode {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
}

export const CollisionMechanism = forwardRef<HTMLDivElement, ICollisionMechanismProps>(
  ({ parentRef, containerRef, beamOptions = {} }, _ref) => {
    // State
    const [collision, setCollision] = useState<TCollision>({ detected: false, coordinates: null });
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState<boolean>(false);
    const [beamKey, setBeamKey] = useState<number>(0);
    const beamRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const checkCollision = () => {
        if (beamRef.current && containerRef.current && parentRef.current && !cycleCollisionDetected) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const parentRect = parentRef.current.getBoundingClientRect();
          const beamRect = beamRef.current.getBoundingClientRect();

          if (beamRect.bottom >= containerRect.top) {
            const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = beamRect.bottom - parentRect.top;

            setCollision({ detected: true, coordinates: { x: relativeX, y: relativeY } });
            setCycleCollisionDetected(true);
          }
        }
      };

      const animationInterval = setInterval(checkCollision, 50);

      return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
      if (collision.detected && collision.coordinates) {
        setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 2000);

        setTimeout(() => setBeamKey((prevKey) => prevKey + 1), 2000);
      }
    }, [collision]);

    return (
      <>
        <motion.div
          key={beamKey}
          ref={beamRef}
          animate="animate"
          initial={{
            translateY: beamOptions.initialY || "-200px",
            translateX: beamOptions.initialX || "0px",
            rotate: beamOptions.rotate || 0,
          }}
          variants={{
            animate: {
              translateY: beamOptions.translateY || "1800px",
              translateX: beamOptions.translateX || "0px",
              rotate: beamOptions.rotate || 0,
            },
          }}
          transition={{
            duration: beamOptions.duration || 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beamOptions.delay || 0,
            repeatDelay: beamOptions.repeatDelay || 0,
          }}
          className={cn(
            "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
            beamOptions.className
          )}
        />
        <AnimatePresence>
          {collision.detected && collision.coordinates && (
            <Explosion
              key={`${collision.coordinates.x}-${collision.coordinates.y}`}
              className=""
              style={{
                left: `${collision.coordinates.x}px`,
                top: `${collision.coordinates.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";
