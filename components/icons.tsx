

import React from 'react';

export const SunIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const CameraIcon: React.FC<{ className?: string, isActive?: boolean }> = ({ className = "w-6 h-6", isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z"/>
  </svg>
);

export const NutritionIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9.75v2.542a.75.75 0 01-.19.503l-3.107 3.107A.75.75 0 0118 16.25a3.751 3.751 0 01-3.108-1.674.75.75 0 00-1.284 0 3.751 3.751 0 01-3.108 1.674.75.75 0 01-.453-.19l-3.108-3.107a.75.75 0 01-.19-.503V9.75M21.75 9.75h-1.559a1.5 1.5 0 00-1.438 1.068 4.493 4.493 0 01-8.508 0A1.5 1.5 0 008.81 9.75H2.25M21.75 9.75A2.25 2.25 0 0019.5 7.5h-15A2.25 2.25 0 002.25 9.75m0 0v2.542" />
  </svg>
);

export const HabitIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

export const DocumentTextIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);


export const InfoIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
</svg>
);

export const FaceAlertIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const ChatBubbleIcon: React.FC<{ className?: string, isActive?: boolean }> = ({ className = "w-6 h-6", isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3.697-3.697c-.422-.422-.98-.723-1.584-.898a15.003 15.003 0 01-1.046-.135A1.501 1.501 0 0112 15.75c0-.531.213-1.015.562-1.362 1.074-.903 1.858-2.136 1.858-3.512V8.511zm-3.75 2.438c.093.026.19.042.29.05C17.656 11.13 18 11.534 18 12c0 .465-.344.87-.859.984a14.958 14.958 0 01-1.893.286A13.488 13.488 0 0013.5 10.55V8.511c.781.093 1.5.383 2.097.827Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5c0-.531.213-1.015.562-1.362 1.074-.903 1.858-2.136 1.858-3.512V4.562A1.501 1.501 0 008.25 3c-1.136 0-2.1.847-2.193 1.98A15.003 15.003 0 005.136 5.5c-.422.175-.723.676-.898 1.584L.543 10.777v3.091c.022.34.046.68.072 1.02.096 1.132.898 1.98 2.097 1.98h2.136c.97 0 1.792-.616 2.097-1.5M12 7.5h3.75M12 12.75h3.75M7.5 15h3.75M3.75 17.25h-.008v.008H3.75v-.008Z" />
  </svg>
);

export const ProPielChatbotIcon: React.FC<{ className?: string, isActive?: boolean }> = ({ className = "w-6 h-6", isActive }) => {
  const bodyFill = isActive ? 'currentColor' : 'none';
  const featureStroke = isActive ? 'var(--color-primary-content)' : 'currentColor';

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 64 64" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path 
        d="M50,4 H14 C10.686,4 8,6.686 8,10 V34 C8,37.314 10.686,40 14,40 H24 L32,48 L40,40 H50 C53.314,40 56,37.314 56,34 V10 C56,6.686 53.314,4 50,4 Z"
        fill={bodyFill} 
        stroke="currentColor" 
      />
      <line x1="32" y1="4" x2="32" y2="1" stroke="currentColor" />
      <circle cx="32" cy="0.5" r="1.5" fill="currentColor" stroke="currentColor"/>
      <path d="M8,18 V26" stroke="currentColor" strokeWidth="5" />
      <path d="M56,18 V26" stroke="currentColor" strokeWidth="5" />
      <path d="M24,20 C24,18 26,18 27,20" stroke={featureStroke} fill="none" strokeWidth="2"/>
      <path d="M40,20 C40,18 38,18 37,20" stroke={featureStroke} fill="none" strokeWidth="2"/>
      <path d="M26,28 C28,31 36,31 38,28" stroke={featureStroke} fill="none" strokeWidth="2"/>
    </svg>
  );
};


export const MicrophoneIcon: React.FC<{ className?: string; isListening?: boolean }> = ({ className = "w-6 h-6", isListening = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3S9 4.343 9 6v6c0 1.657 1.343 3 3 3z" />
    {isListening && <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3" />}
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const CloseIconX: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const BotIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => ( 
  <ProPielChatbotIcon className={className} isActive={true} /> 
);

export const TranslateIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 12H22" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" />
  </svg>
);

export const ChatbotHeaderIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7 text-primary dark:text-[#14e3eb]" }) => (
   <ProPielChatbotIcon className={className} isActive={true} />
);


export const HomeIcon: React.FC<{ className?: string, isActive?: boolean }> = ({ className = "w-6 h-6", isActive }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill={isActive ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={isActive ? 0 : 1.8}
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M3 9.5l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9.5z" 
      strokeWidth={1.8} 
    />
    {isActive &&
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M10 21.5V15.5C10 14.9477 10.4477 14.5 11 14.5H13C13.5523 14.5 14 14.9477 14 15.5V21.5H10Z" 
        fill="currentColor" 
      />
    }
    {!isActive &&
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 21.5v-5a1 1 0 011-1h4a1 1 0 011 1v5" strokeWidth={1.8} />
    }
  </svg>
);


export const AssistantCentralIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5H6m12 0h-1.5M7.5 6.75H6m12 0h-1.5m-6 12.75V21m0-3.75V15M12 3v2.25m0 12.75V15m0-9.75V3M7.5 15h-1.5M18 15h-1.5M6.75 11.25h10.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);


export const SettingsIcon: React.FC<{ className?: string, isActive?: boolean }> = ({ className = "w-6 h-6", isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill={isActive ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
  </svg>
);

export const FaceScanAnimationIcon: React.FC<{ className?: string }> = ({ className = "w-48 h-48" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className}>
    <path d="M 50,15 A 35,35 0 0 0 50,85 A 35,35 0 0 0 50,15 M 30,40 Q 50,50 70,40 M 35,60 Q 50,70 65,60" 
          fill="none" 
          stroke="currentColor" 
          className="text-gray-300 dark:text-gray-600"
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" />
    <line x1="25" y1="30" x2="75" y2="30" 
          stroke="currentColor" 
          className="text-primary scan-line" 
          strokeWidth="1.5"
          strokeLinecap="round" />
    <circle cx="35" cy="35" r="2" fill="currentColor" className="text-primary scan-dot scan-dot-1" />
    <circle cx="65" cy="35" r="2" fill="currentColor" className="text-primary scan-dot scan-dot-2" />
    <circle cx="50" cy="50" r="2.5" fill="currentColor" className="text-primary scan-dot scan-dot-3" />
    <circle cx="40" cy="65" r="2" fill="currentColor" className="text-primary scan-dot scan-dot-4" />
    <circle cx="60" cy="65" r="2" fill="currentColor" className="text-primary scan-dot scan-dot-5" />
  </svg>
);

export const PhotoIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);


// Skin Characteristic Icons - Updated to use PNG images with Cloudinary colorization
const NewHydrationIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img src="https://res.cloudinary.com/dpeqsbohh/image/upload/e_colorize,co_rgb:14e3eb/v1749692618/Dise%C3%B1o_sin_t%C3%ADtulo_5_k4efb7.png" alt="Hydration Icon" className={className} />
);

const NewOilinessIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img src="https://res.cloudinary.com/dpeqsbohh/image/upload/e_colorize,co_rgb:14e3eb/v1749692619/Dise%C3%B1o_sin_t%C3%ADtulo_6_xdaufn.png" alt="Oiliness Icon" className={className} />
);

const NewPoresIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img src="https://res.cloudinary.com/dpeqsbohh/image/upload/e_colorize,co_rgb:14e3eb/v1749692619/Dise%C3%B1o_sin_t%C3%ADtulo_7_quu5xj.png" alt="Pores Appearance Icon" className={className} />
);

const NewRednessIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img src="https://res.cloudinary.com/dpeqsbohh/image/upload/e_colorize,co_rgb:14e3eb/v1749692618/irritacion_rtsa4j.png" alt="Redness/Irritation Icon" className={className} />
);

const NewTextureIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img src="https://res.cloudinary.com/dpeqsbohh/image/upload/e_colorize,co_rgb:14e3eb/v1749692618/suavidad_pzaf10.png" alt="Texture/Smoothness Icon" className={className} />
);

const NewDarkSpotsIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <img src="https://res.cloudinary.com/dpeqsbohh/image/upload/e_colorize,co_rgb:14e3eb/v1749693939/free-melanin-icon-download-in-svg-png-gif-file-formats--pigment-dry-skin-protection-pack-healthcare-medical-icons-1105593_ynbvrb.webp" alt="Dark Spots/Pigmentation Icon" className={className} />
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const CpuChipIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5M12 4.5v-1.5m0 18v-1.5M15.75 21v-1.5m-4.5-16.5H9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 6.75A2.25 2.25 0 0112.75 9H11.25A2.25 2.25 0 019 6.75V5.25A2.25 2.25 0 0111.25 3h1.5A2.25 2.25 0 0115 5.25v1.5zm0 9A2.25 2.25 0 0112.75 18H11.25A2.25 2.25 0 019 15.75V14.25A2.25 2.25 0 0111.25 12h1.5A2.25 2.25 0 0115 14.25v1.5z" />
  </svg>
);

export const ChartBarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const ViewfinderCircleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const getIconByKeyword = (keyword?: string, className?: string): React.ReactNode => {
  if (!keyword) return <SparklesIcon className={className} />; 

  const lowerKeyword = keyword.toLowerCase();
  
  // Skin Characteristics
  if (lowerKeyword.includes('hydration')) return <NewHydrationIcon className={className} />;
  if (lowerKeyword.includes('oiliness') || lowerKeyword.includes('oleosidad')) return <NewOilinessIcon className={className} />;
  if (lowerKeyword.includes('pores') || lowerKeyword.includes('poros')) return <NewPoresIcon className={className} />;
  if (lowerKeyword.includes('redness') || lowerKeyword.includes('irritation') || lowerKeyword.includes('enrojecimiento') || lowerKeyword.includes('irritación')) return <NewRednessIcon className={className} />;
  if (lowerKeyword.includes('texture') || lowerKeyword.includes('smoothness') || lowerKeyword.includes('textura') || lowerKeyword.includes('suavidad')) return <NewTextureIcon className={className} />;
  if (lowerKeyword.includes('dark_spots') || lowerKeyword.includes('dark spots') || lowerKeyword.includes('pigmentation') || lowerKeyword.includes('manchas oscuras') || lowerKeyword.includes('pigmentación')) return <NewDarkSpotsIcon className={className} />;
  
  // Wellness Tips Categories
  if (lowerKeyword.includes('nutrition') || lowerKeyword.includes('nutrición')) return <NutritionIcon className={className} />;
  if (lowerKeyword.includes('habit') || lowerKeyword.includes('hábito')) return <HabitIcon className={className} />;
  if (lowerKeyword.includes('general')) return <InfoIcon className={className} />;

  return <SparklesIcon className={className} />;
};