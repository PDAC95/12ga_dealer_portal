import { FC, useState, useRef, useEffect, useCallback } from 'react';
import { Send, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import type { ChatAttachment } from '../types/chat.types';

interface ChatInputProps {
  onSend: (message: string, attachments?: ChatAttachment[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: FC<ChatInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  const processFile = useCallback((file: File): ChatAttachment | null => {
    // Only accept images
    if (!file.type.startsWith('image/')) {
      return null;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return null;
    }

    const id = `attachment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const preview = URL.createObjectURL(file);

    return {
      id,
      type: 'image',
      file,
      preview,
      name: file.name,
    };
  }, []);

  const addAttachments = useCallback((files: FileList | File[]) => {
    const newAttachments: ChatAttachment[] = [];

    Array.from(files).forEach((file) => {
      // Max 4 attachments
      if (attachments.length + newAttachments.length >= 4) return;

      const attachment = processFile(file);
      if (attachment) {
        newAttachments.push(attachment);
      }
    });

    if (newAttachments.length > 0) {
      setAttachments((prev) => [...prev, ...newAttachments]);
    }
  }, [attachments.length, processFile]);

  const removeAttachment = useCallback((id: string) => {
    setAttachments((prev) => {
      const attachment = prev.find((a) => a.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.preview);
      }
      return prev.filter((a) => a.id !== id);
    });
  }, []);

  // Handle paste event for screenshots
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const imageFiles: File[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            imageFiles.push(file);
          }
        }
      }

      if (imageFiles.length > 0) {
        e.preventDefault();
        addAttachments(imageFiles);
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [addAttachments]);

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      addAttachments(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      addAttachments(files);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      onSend(message.trim(), attachments.length > 0 ? attachments : undefined);
      setMessage('');
      setAttachments([]);
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = (message.trim() || attachments.length > 0) && !disabled;

  return (
    <div
      className={`p-4 lg:px-8 border-t border-white/5 bg-background transition-colors relative ${
        isDragOver ? 'bg-primary/5' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="w-full max-w-4xl mx-auto">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="relative group w-16 h-16 rounded-lg overflow-hidden bg-white/5 border border-white/10"
            >
              <img
                src={attachment.preview}
                alt={attachment.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeAttachment(attachment.id)}
                className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
          {attachments.length < 4 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-white/30 hover:text-white/50 hover:border-white/30 transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <ImageIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm text-primary font-medium">Drop image here</p>
          </div>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Attach button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || attachments.length >= 4}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            attachments.length >= 4
              ? 'text-white/10 cursor-not-allowed'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
          }`}
          title="Attach image"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Input */}
        <div className="flex-1 bg-[#1a1a1a] rounded-xl border border-white/10 focus-within:border-white/20 transition-colors">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={attachments.length > 0 ? 'Add a message...' : placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-white placeholder-white/30 resize-none px-4 py-3 focus:outline-none text-sm"
            style={{ maxHeight: '120px' }}
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={!canSend}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
            canSend
              ? 'bg-primary text-white hover:bg-primary/90'
              : 'bg-white/5 text-white/20'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Helper text */}
      <p className="text-[10px] text-white/20 mt-2 text-center">
        Paste or drop images • Max 4 images
      </p>
      </div>
    </div>
  );
};
