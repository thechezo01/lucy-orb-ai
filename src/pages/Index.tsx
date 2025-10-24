import { useState } from "react";
import ParticleOrb from "@/components/ParticleOrb";
import { toast } from "sonner";
import { Mic, MicOff, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const userName = "Kev"; // This would be dynamic from user data

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

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      toast("Message sent", { description: message });
      setMessage("");
    }
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
          <p className="text-2xl md:text-3xl text-muted-foreground font-light">
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
            onClick={toggleChat}
            className="w-12 h-12 rounded-full hover:bg-muted/50 transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Chat Input */}
      {showChat && (
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-card border-t border-border p-4 animate-in slide-in-from-bottom">
          <div className="max-w-2xl mx-auto flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
