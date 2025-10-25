import { useState, useEffect, useRef } from "react";
import ParticleOrb from "@/components/ParticleOrb";
import { toast } from "sonner";
import { Mic, MicOff, MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrientation } from "@/hooks/useOrientation";
import { useGreeting } from "@/hooks/useGreeting";
import { getDynamicMessage, type AssistantState } from "@/utils/greetings";

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [assistantState, setAssistantState] = useState<AssistantState>('idle');
  const inputRef = useRef<HTMLInputElement>(null);
  const userName = "Kev";
  
  const orientation = useOrientation();
  const greeting = useGreeting(userName);
  const dynamicMessage = getDynamicMessage(assistantState);

  useEffect(() => {
    if (showChat && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showChat]);

  useEffect(() => {
    if (showChat) {
      setAssistantState('typing');
    } else if (isListening) {
      setAssistantState('listening');
    } else {
      setAssistantState('idle');
    }
  }, [showChat, isListening]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showChat) {
        setShowChat(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showChat]);

  const toggleListening = () => {
    const newState = !isListening;
    setIsListening(newState);
    
    if (newState) {
      setAssistantState('listening');
      setTimeout(() => setAssistantState('processing'), 2000);
    } else {
      setAssistantState('idle');
    }
    
    toast(newState ? "Listening..." : "Deactivated", {
      description: newState ? "Speak now" : "Tap the orb to activate",
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
      setAssistantState('responding');
      toast("Message sent", { description: message });
      setMessage("");
      setTimeout(() => {
        setAssistantState(showChat ? 'typing' : 'idle');
      }, 1500);
    }
  };

  const orbSize = orientation === "landscape" 
    ? "w-48 h-48 sm:w-56 sm:h-56" 
    : "w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Main content */}
      <div className={`relative z-10 min-h-screen px-4 ${
        orientation === "landscape" 
          ? "flex items-center justify-center gap-8 py-4"
          : "flex flex-col items-center justify-between py-8"
      }`}>
        {/* Header with greeting */}
        <div className={`text-center space-y-2 transition-all duration-500 ${
          orientation === "landscape" ? "flex-shrink-0 w-1/3" : "pt-12"
        }`}>
          <h1 className="text-2xl md:text-3xl font-light text-foreground transition-opacity duration-300 animate-fade-in">
            {greeting}
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground font-light transition-opacity duration-300 animate-fade-in">
            <span className="text-primary">{dynamicMessage}</span>
          </p>
        </div>

        {/* Particle Orb - centered */}
        <div className={`flex items-center justify-center ${
          orientation === "landscape" ? "flex-shrink-0" : "flex-1"
        }`}>
          <ParticleOrb 
            isListening={isListening} 
            onClick={toggleListening} 
            className={orbSize}
            isProcessing={assistantState === 'processing'}
          />
        </div>

        {/* Bottom controls */}
        <div className={`flex items-center gap-6 ${
          orientation === "landscape" ? "flex-col flex-shrink-0" : "pb-8"
        }`}>
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
        <div className="fixed bottom-0 left-0 right-0 z-20 bg-card/95 backdrop-blur-sm border-t border-border p-4 animate-in slide-in-from-bottom shadow-lg">
          <div className="max-w-2xl mx-auto flex gap-2 items-center">
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
            />
            <Button onClick={handleSendMessage} size="icon" disabled={!message.trim()}>
              <Send className="w-5 h-5" />
            </Button>
            <Button 
              onClick={() => setShowChat(false)} 
              size="icon" 
              variant="ghost"
              className="hover:bg-muted/50"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
