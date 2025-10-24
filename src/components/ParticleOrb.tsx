import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface ParticleOrbProps {
  isListening: boolean;
  onClick: () => void;
}

const ParticleOrb = ({ isListening, onClick }: ParticleOrbProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const particleCount = isListening ? 30 : 20;
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isListening ? 6 : 4) + 2,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, [isListening]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Main orb container */}
      <button
        onClick={onClick}
        className={cn(
          "relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full",
          "transition-all duration-700 cursor-pointer",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-4 focus:ring-primary/50"
        )}
      >
        {/* Outer glow rings */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-700",
            isListening
              ? "bg-primary/20 shadow-glow-cyan animate-pulse-glow"
              : "bg-secondary/10 shadow-glow-purple"
          )}
        />
        <div
          className={cn(
            "absolute inset-4 rounded-full transition-all duration-700",
            isListening ? "bg-primary/30" : "bg-secondary/20"
          )}
        />

        {/* Core orb */}
        <div
          className={cn(
            "absolute inset-8 rounded-full transition-all duration-700",
            "bg-gradient-to-br backdrop-blur-sm",
            isListening
              ? "from-primary/60 via-glow-blue/40 to-primary/60"
              : "from-secondary/50 via-glow-purple/30 to-secondary/50"
          )}
        >
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className={cn(
                  "absolute rounded-full blur-[1px]",
                  isListening ? "bg-primary" : "bg-secondary"
                )}
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animation: `float ${particle.duration}s ease-in-out infinite`,
                  animationDelay: `${particle.delay}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Center icon/indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "transition-all duration-700",
                isListening ? "scale-110" : "scale-100"
              )}
            >
              {isListening ? (
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-8 bg-primary rounded-full"
                      style={{
                        animation: `pulse-glow 1s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full border-4 border-secondary flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-secondary border-b-8 border-b-transparent ml-1" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rotating orbital particles */}
        {isListening && (
          <>
            {[0, 1, 2].map((i) => (
              <div
                key={`orbit-${i}`}
                className="absolute inset-0"
                style={{
                  animation: `orbit ${12 - i * 2}s linear infinite`,
                  animationDelay: `${i * 0.5}s`,
                  "--orbit-radius": `${120 + i * 15}px`,
                } as React.CSSProperties}
              >
                <div className="w-3 h-3 rounded-full bg-primary shadow-glow-cyan" />
              </div>
            ))}
          </>
        )}
      </button>
    </div>
  );
};

export default ParticleOrb;
