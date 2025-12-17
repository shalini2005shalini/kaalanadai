import { Animal, Translation } from './types';

export const ANIMALS: Animal[] = [
  {
    id: 'cow',
    nameEn: 'Cow',
    nameTa: 'பசு (Cow)',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?q=80&w=800&auto=format&fit=crop',
    descriptionEn: 'Essential for milk and agriculture. Requires regular vaccination.',
    descriptionTa: 'பால் மற்றும் விவசாயத்திற்கு அவசியம். வழக்கமான தடுப்பூசி தேவை.'
  },
  {
    id: 'goat',
    nameEn: 'Goat',
    nameTa: 'வெள்ளாடு (Goat)',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?q=80&w=800&auto=format&fit=crop',
    descriptionEn: 'Known as the poor man\'s cow. Adaptable to various climates.',
    descriptionTa: 'ஏழைகளின் பசு என்று அழைக்கப்படுகிறது. பல்வேறு காலநிலைகளுக்கு ஏற்றது.'
  },
  {
    id: 'chicken',
    nameEn: 'Chicken',
    nameTa: 'கோழி (Chicken)',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800&auto=format&fit=crop',
    descriptionEn: 'Raised for eggs and meat. Requires clean coop environment.',
    descriptionTa: 'முட்டை மற்றும் இறைச்சிக்காக வளர்க்கப்படுகிறது. சுத்தமான கூண்டு சூழல் தேவை.'
  },
  {
    id: 'buffalo',
    nameEn: 'Buffalo',
    nameTa: 'எருமை (Buffalo)',
    image: 'https://images.unsplash.com/photo-1504204267155-aaad8e81290d?q=80&w=800&auto=format&fit=crop',
    descriptionEn: 'Produces high-fat milk. Resilient to diseases.',
    descriptionTa: 'அதிக கொழுப்புள்ள பால் தருகிறது. நோய்களுக்கு எதிர்ப்பு சக்தி கொண்டது.'
  },
  {
    id: 'sheep',
    nameEn: 'Sheep',
    nameTa: 'செம்மறி ஆடு (Sheep)',
    image: 'https://images.unsplash.com/photo-1484557985045-6f550bf43735?q=80&w=800&auto=format&fit=crop',
    descriptionEn: 'Primarily for wool and meat. Needs grazing lands.',
    descriptionTa: 'முதன்மையாக கம்பளி மற்றும் இறைச்சிக்காக. மேய்ச்சல் நிலங்கள் தேவை.'
  }
];

export const TRANSLATIONS: Record<'en' | 'ta', Translation> = {
  en: {
    title: 'Kalnadai Care',
    subtitle: 'Livestock Management Assistant',
    searchPlaceholder: 'Ask about health issues...',
    uploadPhoto: 'Upload Photo',
    startSpeaking: 'Tap to Speak',
    stopSpeaking: 'Listening...',
    loading: 'Consulting AI Veterinarian...',
    animals: 'Livestock',
    askAi: 'Ask AI Expert',
    languageName: 'தமிழ்',
    errorGeneric: 'Something went wrong. Please try again.',
    consultation: 'Consultation',
    clearChat: 'New Chat',
    suggestedTopics: ['Cow not eating', 'Chicken flu symptoms', 'Goat vaccination schedule']
  },
  ta: {
    title: 'கால்நடை காப்பகம்',
    subtitle: 'கால்நடை பராமரிப்பு உதவியாளர்',
    searchPlaceholder: 'சுகாதாரப் பிரச்சினைகளைக் கேளுங்கள்...',
    uploadPhoto: 'புகைப்படம்',
    startSpeaking: 'பேசவும்',
    stopSpeaking: 'கேட்கிறது...',
    loading: 'AI மருத்துவரை கலந்தாலோசிக்கிறது...',
    animals: 'கால்நடைகள்',
    askAi: 'AI நிபுணரிடம் கேளுங்கள்',
    languageName: 'English',
    errorGeneric: 'ஏதோ தவறு நடந்துள்ளது. மீண்டும் முயற்சிக்கவும்.',
    consultation: 'ஆலோசனை',
    clearChat: 'புதிய கேள்வி',
    suggestedTopics: ['பசு சாப்பிடவில்லை', 'கோழி காய்ச்சல் அறிகுறிகள்', 'ஆடு தடுப்பூசி அட்டவணை']
  }
};

export const SYSTEM_INSTRUCTION = `
You are an expert Veterinary AI Assistant for farmers in Tamil Nadu, India. 
Your goal is to help with "Kalnadai Paramarippu" (Livestock Management).

RULES:
1. Identify the animal if an image is provided.
2. If the user describes a symptom or shows a sick animal, provide:
   - Possible Diagnosis (Disease name).
   - Immediate First Aid.
   - Traditional Home Remedies (Paati Vaithiyam) using common herbs like turmeric, neem, etc.
   - Modern Medical Advice (suggest consulting a vet for serious issues).
3. If the user asks about diet, suggest local feed options (fodder, oil cakes, etc.).
4. Language Output:
   - If the input is Tamil, reply in Tamil.
   - If the input is English, reply in English.
   - If unsure, default to the language requested in the prompt configuration.
5. Keep the tone empathetic, practical, and simple for farmers.
`;
