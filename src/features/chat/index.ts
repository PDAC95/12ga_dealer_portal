// Pages
export { ChatPage } from './pages';

// Components
export {
  ChatWindow,
  ChatInput,
  MessageBubble,
  EscalationBanner,
  TypingIndicator,
} from './components';

// Hooks
export { useChat, useChatHistory } from './hooks/useChat';

// Services
export { chatService } from './services/chatService';

// Types
export type {
  MessageRole,
  ChatStatus,
  IChatMessage,
  IChatSession,
  SendMessageRequest,
  SendMessageResponse,
  ChatHistoryResponse,
  EscalateRequest,
  EscalateResponse,
  LocalMessage,
} from './types/chat.types';
