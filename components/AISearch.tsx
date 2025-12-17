import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, X, MicOff, Image as ImageIcon } from 'lucide-react';
import { Translation } from '../types';

interface AISearchProps {
  t: Translation;
  onSearch: (text: string, image?: string) => void;
  isLoading: boolean;
}

const AISearch: React.FC<AISearchProps> = ({ t, onSearch, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Speech Recognition Setup (Browser native)
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      // Detect language based on context if possible, defaulting to mixed or auto for now
      // Or we could switch this based on the app's language state, but prop isn't passed yet.
      // Defaulting to Tamil-India for 'ta' context usually works well.
      recognitionRef.current.lang = 'ta-IN'; 

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((inputText.trim() || selectedImage) && !isLoading) {
      onSearch(inputText, selectedImage || undefined);
      setInputText('');
      setSelectedImage(null);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="sticky bottom-0 bg-white/90 backdrop-blur-md p-4 border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {selectedImage && (
          <div className="mb-3 relative inline-block">
            <img src={selectedImage} alt="Preview" className="h-20 rounded-lg border border-gray-300 shadow-sm" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-sm"
            >
              <X size={12} />
            </button>
          </div>
        )}

        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors active:scale-95"
            title={t.uploadPhoto}
          >
            <Camera size={24} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-4 pr-12 py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent shadow-sm text-gray-800 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'text-gray-400 hover:text-brand-600'
              }`}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={(!inputText.trim() && !selectedImage) || isLoading}
            className={`p-3 rounded-full text-white shadow-md transition-all active:scale-95 flex items-center justify-center ${
              (!inputText.trim() && !selectedImage) || isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-brand-600 hover:bg-brand-700'
            }`}
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AISearch;
