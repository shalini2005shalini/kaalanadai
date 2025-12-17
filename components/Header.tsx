import React from 'react';
import { Menu, Globe } from 'lucide-react';
import { Translation } from '../types';

interface HeaderProps {
  t: Translation;
  toggleLanguage: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ t, toggleLanguage, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-brand-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-800 rounded-lg">
            {/* Simple logo representation */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-milk">
              <path d="M8 2h8"/><path d="M9 2v2.5a2.5 2.5 0 0 1-5 0V2"/><path d="M10 9v1"/><path d="M14 9v1"/><path d="M8.3 12a5 5 0 0 0 7.4 0"/><path d="M4 14.4V22a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7.6A5 5 0 0 0 12 9a5 5 0 0 0-8 5.4z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">{t.title}</h1>
            <p className="text-xs text-brand-100 opacity-90">{t.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 bg-brand-600 hover:bg-brand-500 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
          >
            <Globe size={16} />
            <span>{t.languageName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
