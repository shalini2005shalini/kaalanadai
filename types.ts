export type Language = 'en' | 'ta';

export interface Animal {
  id: string;
  nameEn: string;
  nameTa: string;
  image: string;
  descriptionEn: string;
  descriptionTa: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // Base64 string if user uploaded an image
  timestamp: number;
}

export interface Translation {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  uploadPhoto: string;
  startSpeaking: string;
  stopSpeaking: string;
  loading: string;
  animals: string;
  askAi: string;
  languageName: string;
  errorGeneric: string;
  consultation: string;
  clearChat: string;
  suggestedTopics: string[];
}