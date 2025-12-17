import React, { useState } from 'react';
import Header from './components/Header';
import AnimalGrid from './components/AnimalGrid';
import ChatInterface from './components/ChatInterface';
import AISearch from './components/AISearch';
import { generateVeterinaryAdvice } from './services/geminiService';
import { TRANSLATIONS } from './constants';
import { Animal, ChatMessage, Language } from './types';
import { v4 as uuidv4 } from 'uuid'; // Actually we don't have uuid lib, using random string gen
import { PlusCircle } from 'lucide-react';

const generateId = () => Math.random().toString(36).substr(2, 9);

function App() {
  const [lang, setLang] = useState<Language>('ta'); // Default to Tamil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const t = TRANSLATIONS[lang];

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ta' : 'en');
  };

  const handleSearch = async (text: string, image?: string) => {
    // Add User Message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      text: text,
      image: image,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Prepare image for API (strip data:image/xyz;base64,)
      let imageBase64: string | undefined = undefined;
      let mimeType: string | undefined = undefined;

      if (image) {
        const matches = image.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          imageBase64 = matches[2];
        }
      }

      const responseText = await generateVeterinaryAdvice({
        prompt: text,
        image: imageBase64,
        mimeType: mimeType,
        language: lang
      });

      const botMsg: ChatMessage = {
        id: generateId(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: generateId(),
        role: 'model',
        text: t.errorGeneric,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimalSelect = (animal: Animal) => {
    // Pre-fill search or trigger a context
    // For this app, let's trigger a starter prompt
    const prompt = lang === 'ta' 
      ? `${animal.nameTa} பற்றி எனக்கு பொதுவான சுகாதார குறிப்புகளை சொல்லுங்கள்.`
      : `Tell me general health tips for ${animal.nameEn}.`;
    
    handleSearch(prompt);
    // Scroll to top of chat roughly done by the new message addition
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header 
        t={t} 
        toggleLanguage={toggleLanguage} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <main className="flex-1 container mx-auto pb-24">
        {/* If chat is empty, show the dashboard/grid. If chat exists, show chat + minimize grid? 
            For simplicity: Show grid at top, chat below, but if chat grows, maybe hide grid.
            Let's keep grid always visible but user can scroll past it. 
        */}
        
        {messages.length === 0 && (
          <>
            <div className="px-4 mt-6">
              <div className="bg-gradient-to-r from-brand-600 to-brand-800 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-2">{t.askAi}</h2>
                <p className="text-brand-100 mb-4 opacity-90">{t.subtitle}</p>
                <div className="flex flex-wrap gap-2">
                  {t.suggestedTopics.map((topic, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSearch(topic)}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-sm transition-colors border border-white/10"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <AnimalGrid t={t} lang={lang} onSelectAnimal={handleAnimalSelect} />
          </>
        )}

        <div className={`px-4 ${messages.length > 0 ? 'mt-6' : 'mt-0'}`}>
          {messages.length > 0 && (
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">{t.consultation}</h3>
              <button 
                onClick={clearChat}
                className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                <PlusCircle size={16} /> {t.clearChat}
              </button>
            </div>
          )}
          <ChatInterface messages={messages} isLoading={isLoading} t={t} />
        </div>
      </main>

      <AISearch t={t} onSearch={handleSearch} isLoading={isLoading} />
    </div>
  );
}

export default App;
