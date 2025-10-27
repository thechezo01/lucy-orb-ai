import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface ParticleOrbProps {
  isListening: boolean;
  onClick: () => void;
  className?: string;
  isProcessing?: boolean;
}

const ParticleOrb = ({ isListening, onClick, className = "w-80 h-80", isProcessing = false }: ParticleOrbProps) => {
  const [rotation, setRotation] = useState(0);
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isListening) {
        setRotation((prev) => (prev + 0.8) % 360);
      } else {
        setRotation((prev) => (prev + 0.15) % 360);
      }
      setFloatOffset((prev) => (prev + 0.02) % (Math.PI * 2));
    }, 16);

    return () => clearInterval(interval);
  }, [isListening]);

  // Generate dynamic particles with flow
  const particles = useMemo(() => {
    const count = isListening ? 100 : 80;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (360 / count) * i,
      baseDistance: isListening ? 140 : 120,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.5,
      floatSpeed: Math.random() * 0.5 + 0.5,
      floatAmplitude: Math.random() * 15 + 5,
      orbitOffset: Math.random() * Math.PI * 2,
    }));
  }, [isListening]);

  // Standby floating particles - vertical stack
  const floatingParticles = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => {
      const spacing = 8; // Vertical spacing between particles
      const stackHeight = 60 * spacing;
      const yPosition = (i * spacing) - (stackHeight / 2); // Center the stack
      return {
        id: i,
        x: (Math.random() - 0.5) * 20, // Small horizontal variance
        y: yPosition,
        size: Math.random() * 6 + 2,
        floatSpeed: Math.random() * 0.3 + 0.2,
        floatRadius: Math.random() * 8 + 4,
        phase: Math.random() * Math.PI * 2,
      };
    }), []);

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={onClick}
        className={cn(
          "relative rounded-full",
          className,
          "transition-all duration-700 cursor-pointer",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-0",
          isProcessing && "animate-pulse"
        )}
        aria-label={isListening ? "Stop listening" : "Start listening"}
      >
        {/* Fluid Particle ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-full h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "none",
            }}
          >
            {particles.map((particle) => {
              const radians = (particle.angle * Math.PI) / 180;
              const floatWave = Math.sin(floatOffset * particle.floatSpeed + particle.orbitOffset) * particle.floatAmplitude;
              const distance = particle.baseDistance + floatWave;
              const x = Math.cos(radians) * distance;
              const y = Math.sin(radians) * distance;

              return (
                <div
                  key={particle.id}
                  className={cn(
                    "absolute rounded-full transition-all duration-300",
                    isListening ? "bg-primary" : "bg-primary/60"
                  )}
                  style={{
                    left: "50%",
                    top: "50%",
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    opacity: particle.opacity,
                    boxShadow: isListening
                      ? `0 0 ${particle.size * 6}px hsl(var(--primary) / 0.8), 0 0 ${particle.size * 3}px hsl(var(--primary))`
                      : `0 0 ${particle.size * 4}px hsl(var(--primary) / 0.4)`,
                    filter: "blur(0.5px)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Multi-layered glow effects */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 blur-2xl" 
            style={{
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />
        </div>
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/30 blur-xl animate-pulse" />
          </div>
        )}

        {/* Standby state - organic floating particles */}
        {!isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-48">
              {floatingParticles.map((particle) => {
                const floatX = Math.cos(floatOffset * particle.floatSpeed + particle.phase) * particle.floatRadius;
                const floatY = Math.sin(floatOffset * particle.floatSpeed + particle.phase) * particle.floatRadius;
                
                return (
                  <div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/60"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: `${particle.size}px`,
                      height: `${particle.size}px`,
                      transform: `translate(calc(-50% + ${particle.x + floatX}px), calc(-50% + ${particle.y + floatY}px))`,
                      boxShadow: `0 0 ${particle.size * 2}px hsl(var(--primary) / 0.3)`,
                      transition: "transform 0.1s linear",
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default ParticleOrb;
