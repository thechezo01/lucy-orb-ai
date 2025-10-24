import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  angle: number;
  distance: number;
  size: number;
  speed: number;
  opacity: number;
}

interface ParticleOrbProps {
  isListening: boolean;
  onClick: () => void;
}

const ParticleOrb = ({ isListening, onClick }: ParticleOrbProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Generate circular particles
    const particleCount = isListening ? 80 : 60;
    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      angle: (360 / particleCount) * i,
      distance: isListening ? 140 : 120,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setParticles(newParticles);
  }, [isListening]);

  useEffect(() => {
    if (!isListening) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 16);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="relative flex items-center justify-center">
      <button
        onClick={onClick}
        className={cn(
          "relative w-72 h-72 md:w-80 md:h-80 rounded-full",
          "transition-all duration-700 cursor-pointer",
          "hover:scale-105 active:scale-95",
          "focus:outline-none focus:ring-0"
        )}
      >
        {/* Particle ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative w-full h-full"
            style={{
              transform: isListening ? `rotate(${rotation}deg)` : 'rotate(0deg)',
              transition: isListening ? 'none' : 'transform 0.7s ease-out',
            }}
          >
            {particles.map((particle) => {
              const radians = (particle.angle * Math.PI) / 180;
              const x = Math.cos(radians) * particle.distance;
              const y = Math.sin(radians) * particle.distance;
              
              return (
                <div
                  key={particle.id}
                  className={cn(
                    "absolute rounded-full",
                    isListening ? "bg-primary" : "bg-foreground"
                  )}
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    opacity: particle.opacity,
                    boxShadow: isListening 
                      ? `0 0 ${particle.size * 4}px hsl(var(--primary))`
                      : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Center glow effect when listening */}
        {isListening && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-pulse-glow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/20 blur-xl" />
            </div>
          </>
        )}

        {/* Idle state - fluffy center */}
        {!isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40">
              {Array.from({ length: 40 }).map((_, i) => {
                const angle = (360 / 40) * i;
                const radians = (angle * Math.PI) / 180;
                const distance = Math.random() * 30 + 30;
                const x = Math.cos(radians) * distance;
                const y = Math.sin(radians) * distance;
                
                return (
                  <div
                    key={`fluffy-${i}`}
                    className="absolute rounded-full bg-foreground/80 blur-sm"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${Math.random() * 8 + 4}px`,
                      height: `${Math.random() * 8 + 4}px`,
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
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
