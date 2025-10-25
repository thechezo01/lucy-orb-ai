import { useState, useEffect } from "react";

export function useGreeting(userName: string) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 12) {
        setGreeting(`Good morning, ${userName}`);
      } else if (hour >= 12 && hour < 18) {
        setGreeting(`Good day, ${userName}`);
      } else if (hour >= 18 && hour < 23) {
        setGreeting(`Good evening, ${userName}`);
      } else {
        setGreeting(`Hey ${userName}`);
      }
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [userName]);

  return greeting;
}
