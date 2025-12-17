import React from 'react';
import { Animal, Language, Translation } from '../types';
import { ANIMALS } from '../constants';
import { Info } from 'lucide-react';

interface AnimalGridProps {
  t: Translation;
  lang: Language;
  onSelectAnimal: (animal: Animal) => void;
}

const AnimalGrid: React.FC<AnimalGridProps> = ({ t, lang, onSelectAnimal }) => {
  return (
    <section className="py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 px-4 border-l-4 border-brand-500 ml-4">
        {t.animals}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {ANIMALS.map((animal) => (
          <div 
            key={animal.id} 
            onClick={() => onSelectAnimal(animal)}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer border border-gray-100 group"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={animal.image} 
                alt={lang === 'en' ? animal.nameEn : animal.nameTa} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-medium flex items-center gap-2">
                  <Info size={16} /> {t.askAi}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {lang === 'en' ? animal.nameEn : animal.nameTa}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {lang === 'en' ? animal.descriptionEn : animal.descriptionTa}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimalGrid;
