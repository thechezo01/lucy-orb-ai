import { useState } from "react";
import ParticleOrb from "@/components/ParticleOrb";
import { toast } from "sonner";
import { Mic, MicOff, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const userName = "Mike"; // This would be dynamic from user data

  const toggleListening = () => {
    setIsListening(!isListening);
    toast(isListening ? "Deactivated" : "Listening...", {
      description: isListening
        ? "Tap the orb to activate"
        : "Speak now",
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast(isMuted ? "Unmuted" : "Muted");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-between min-h-screen px-4 py-8">
        {/* Header with greeting */}
        <div className="text-center pt-12 space-y-2">
          <h1 className="text-2xl md:text-3xl font-light text-foreground">
            Hey <span className="font-normal">{userName}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-light">
            How can I <span className="text-primary">help you</span>?
          </p>
        </div>

        {/* Particle Orb - centered */}
        <div className="flex-1 flex items-center justify-center">
          <ParticleOrb isListening={isListening} onClick={toggleListening} />
        </div>

        {/* Bottom controls */}
        <div className="pb-8 flex items-center gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMute}
            className="w-12 h-12 rounded-full hover:bg-muted/50 transition-colors"
          >
            {isMuted ? (
              <MicOff className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Mic className="w-5 h-5 text-foreground" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-full hover:bg-muted/50 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
