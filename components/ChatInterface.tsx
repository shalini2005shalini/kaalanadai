import React, { useEffect, useRef } from 'react';
import { ChatMessage, Translation } from '../types';
import { User, Bot, Loader2, Image as ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  t: Translation;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, t }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-inner min-h-[300px] max-h-[600px] overflow-y-auto mb-6 border border-gray-200">
      <div className="space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-white border border-gray-200 text-brand-600'
            }`}>
              {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>

            <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                {msg.image && (
                  <div className="mb-3 rounded-lg overflow-hidden border border-white/20">
                    <img src={msg.image} alt="User upload" className="max-w-full h-auto max-h-60 object-contain" />
                  </div>
                )}
                {msg.role === 'model' ? (
                   <div className="prose prose-sm prose-green max-w-none dark:prose-invert">
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                )}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-brand-600 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2 text-gray-500">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-sm">{t.loading}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatInterface;
