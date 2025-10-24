import { useState } from "react";
import ParticleOrb from "@/components/ParticleOrb";
import { toast } from "sonner";

const Index = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    toast(isListening ? "Lucy is now idle" : "Lucy is listening...", {
      description: isListening
        ? "Click the orb to activate"
        : "Speak now or click to deactivate",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-space relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-orb opacity-30 animate-pulse-glow" />
      <div className="absolute top-20 left-20 w-64 h-64 bg-glow-cyan/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-glow-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary via-glow-blue to-secondary bg-clip-text text-transparent animate-float">
            Lucy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            {isListening ? "I'm listening..." : "Your AI Voice Assistant"}
          </p>
        </div>

        {/* Particle Orb */}
        <ParticleOrb isListening={isListening} onClick={toggleListening} />

        {/* Status indicator */}
        <div className="mt-12 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                isListening
                  ? "bg-primary shadow-glow-cyan animate-pulse-glow"
                  : "bg-secondary/50"
              }`}
            />
            <span className="text-sm md:text-base text-foreground/80 font-medium">
              {isListening ? "Active" : "Idle"}
            </span>
          </div>
          <p className="text-xs md:text-sm text-muted-foreground max-w-md">
            Click the orb to {isListening ? "deactivate" : "activate"} Lucy
          </p>
        </div>

        {/* Info cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full">
          {[
            { label: "Voice Recognition", icon: "🎤" },
            { label: "AI Processing", icon: "🧠" },
            { label: "Smart Response", icon: "✨" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-all duration-300 hover:shadow-glow-cyan/20"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <div className="text-sm text-foreground/80">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
