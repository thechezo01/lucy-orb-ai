export type AssistantState = 'idle' | 'listening' | 'processing' | 'typing' | 'responding';

export function getDynamicMessage(state: AssistantState): string {
  const messages: Record<AssistantState, string> = {
    idle: "How can I help you?",
    listening: "I'm all ears",
    processing: "Just a moment",
    typing: "What's on your mind?",
    responding: "On it!"
  };

  return messages[state];
}
