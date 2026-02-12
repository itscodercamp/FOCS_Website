
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Trash2, Minimize2, Sparkles, Bot } from 'lucide-react';

// --- FOCS Context Data ---
const SYSTEM_INSTRUCTION = `
You are the AI Assistant for FOCS (Future of Computer Science), a software development company and academy based in Nagpur, India.

Your Goal: Help users navigate services, academy programs, and careers.
Context:
1. **Services**: Custom Software, Web/Mobile Apps (MERN/Flutter), AI/ML Integration (TensorFlow/PyTorch), GenAI Solutions (RAG, Chatbots), Enterprise ERP/CRM.
2. **Academy**: 'Its Coder Camp' offers Student Training (Full Stack, Python, Java), Faculty Development Programs (FDP), and free 'AI Labs' setup for colleges.
3. **Products**: DocuSense AI (Document processing), RetailMind (Inventory ML), SecureGuard (Cybersecurity).
4. **Student Showcase**: We feature top projects from our students including 'AgriTech' (Crop Disease Detection), 'ShopEasy' (E-commerce), 'MedCare' (Hospital Management), 'Vocalize' (Voice Assistant), and 'SmartCity' (Traffic Analysis).
5. **Contact**: admin@focsit.in, +91 738 529 9597. Location: Nagpur, Maharashtra.
6. **Careers**: Hiring Full Stack Devs, AI Engineers. Internships available.
7. **Values**: Innovation, Quality, Transparency.

Rules:
1. **Detailed & Long Responses**: Provide thorough, comprehensive, and detailed responses. Do not hesitate to write long paragraphs or lists if it helps explain FOCS services or academy programs better.
2. **Tone**: Match the user's tone (Professional vs Casual). Be extremely helpful and knowledgeable.
3. **Scope**: Only answer questions related to FOCS. If asked about general code (e.g., "write a snake game") or off-topic queries, politely decline and mention FOCS services.
4. **Formatting**: Use **bold** for emphasis and bullet points for lists. Do not use headers (#).
5. **First Interaction**: The user sees a default list of services. You are replying to their first actual query.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial Welcome Message
  const INITIAL_MESSAGE: Message = {
    role: 'model',
    text: "**Hello! I'm the FOCS AI.**\n\nI can help you with:\n- Custom Software & App Development\n- AI & GenAI Solutions\n- Corporate Training & Academy\n- Careers & Internships\n\nHow can I assist you today?"
  };

  // Load chat from local storage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem('focs_chat_history');
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
    } else {
      setMessages([INITIAL_MESSAGE]);
    }
  }, []);

  // Save chat to local storage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('focs_chat_history', JSON.stringify(messages));
    }
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem('focs_chat_history');
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Use Vite's import.meta.env for client-side environment variables
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

      // Construct history for context
      // We limit history to last 10 turns to save tokens and keep context fresh
      const historyContext = newMessages.slice(-10).map(m =>
        `${m.role === 'user' ? 'User' : 'Model'}: ${m.text}`
      ).join('\n');

      const prompt = `${historyContext}\n\nModel:`;

      // Use gemini-3-flash-preview for basic text tasks such as this chatbot.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 2048, // Increased to allow long, detailed responses
          temperature: 0.7,
        },
      });

      // The text output is obtained by accessing the .text property directly.
      const botText = response.text || "I'm having trouble connecting right now. Please try again.";

      setMessages(prev => [...prev, { role: 'model', text: botText }]);

    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I apologize, but I'm unable to reach the server at the moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom Text Renderer to avoid raw markdown
  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />;

      // Handle Bullet Points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().substring(2);
        return (
          <div key={i} className="flex items-start gap-2 ml-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0 opacity-60"></span>
            <span>{parseBold(content)}</span>
          </div>
        );
      }

      return <p key={i} className="mb-1 leading-relaxed">{parseBold(line)}</p>;
    });
  };

  // Helper to parse **bold** text
  const parseBold = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) =>
      index % 2 === 1 ? <strong key={index} className="font-bold">{part}</strong> : part
    );
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-brand-600 hover:bg-brand-500 text-white p-4 rounded-full shadow-2xl shadow-brand-900/40 transition-all hover:scale-110 animate-fade-in-up group"
          aria-label="Open Chat"
        >
          <Sparkles className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" size={16} fill="currentColor" />
          <MessageSquare size={28} />
        </button>
      )}

      {/* Full Screen / Large Modal Chat Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center md:items-end md:justify-end md:p-6 animate-fade-in">
          {/* Backdrop for mobile focus */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}></div>

          <div className="bg-white w-full h-full md:w-[400px] md:h-[600px] md:rounded-3xl shadow-2xl flex flex-col overflow-hidden relative z-10 animate-fade-in-up border border-slate-200">

            {/* Header */}
            <div className="bg-brand-900 text-white p-4 flex items-center justify-between shadow-md flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Bot size={24} className="text-brand-300" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">FOCS AI</h3>
                  <span className="text-xs text-brand-200 flex items-center gap-1 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors"
                  title="Clear Chat"
                >
                  <Trash2 size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition-colors"
                >
                  {/* Minimize on desktop, Close on mobile */}
                  <span className="hidden md:block"><Minimize2 size={20} /></span>
                  <span className="md:hidden"><X size={24} /></span>
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slate-50 scroll-smooth">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${msg.role === 'user'
                        ? 'bg-brand-600 text-white rounded-br-none'
                        : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
                      }`}
                  >
                    <div className="text-sm md:text-[15px]">
                      {renderText(msg.text)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-500 border border-slate-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-brand-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about services, jobs, or training..."
                  className="w-full bg-slate-100 text-slate-900 placeholder-slate-400 rounded-full py-3.5 pl-6 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-brand-600 text-white rounded-full hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400 font-medium">AI can make mistakes. Check important info.</span>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
