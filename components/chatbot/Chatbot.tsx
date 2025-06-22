import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, SkinAnalysisData } from '../../types';
import { aiInstance } from '../../services/geminiService';
import { Chat, GenerateContentResponse, Part } from '@google/genai';
import ChatMessageBubble from './ChatMessageBubble';
import { SendIcon, MicrophoneIcon, CloseIconX, ProPielChatbotIcon, PhotoIcon, ChatbotHeaderIcon } from '../icons'; // Updated import
import { useTranslation } from '../../contexts/LanguageContext';
import { SpeechRecognition } from '@capacitor-community/speech-recognition'; // <--- ADD THIS IMPORT

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  skinAnalysisData: SkinAnalysisData | null;
}

// Remove or comment out this entire block as it's for Web Speech API
// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//     SpeechRecognition: any;
//   }
// }

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

// Helper to convert File to a structure suitable for Gemini API's inlineData
const fileToGenerativePart = async (file: File): Promise<{ mimeType: string; data: string } | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const parts = result.split(';base64,');
      if (parts.length === 2) {
        const mimeType = parts[0].split(':')[1];
        const finalMimeType = ALLOWED_IMAGE_TYPES.includes(file.type) ? file.type : (ALLOWED_IMAGE_TYPES.includes(mimeType) ? mimeType : null);
        if (finalMimeType) {
            resolve({ mimeType: finalMimeType, data: parts[1] });
        } else {
            console.warn(`MIME type ${mimeType} (from base64) or ${file.type} (from file object) not in allowed list.`);
            resolve(null);
        }
      } else {
        console.error("Could not parse base64 string from file reader result.");
        resolve(null);
      }
    };
    reader.onerror = (error) => {
      console.error("FileReader error:", error);
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};


const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, skinAnalysisData }) => {
  const { t, language } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // REMOVE OR COMMENT OUT THIS LINE IF IT'S PRESENT IN YOUR ORIGINAL FILE
  // const recognitionRef = useRef<any>(null); // This was for Web Speech API

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const SpeechRecognitionAvailable = useRef(false); // <--- KEEP THIS REF

  const quickReplies = [
    t('chatbotQuickReply1'),
    t('chatbotQuickReply2'),
    // t('chatbotQuickReply3'), // Asegúrate de que existan si los usas
    // t('chatbotQuickReply4'), // Asegúrate de que existan si los usas
  ];

  const addSystemMessage = useCallback((textKey: string, params?: Record<string, string | number>) => {
    setMessages(prev => [...prev, {
      id: `sys-msg-${Date.now()}`,
      text: t(textKey, params),
      sender: 'system',
      timestamp: new Date(),
    }]);
  }, [t]);

  const getSystemInstruction = useCallback(() => {
    return t('geminiSystemInstruction');
  }, [t]);

  useEffect(() => {
    if (isOpen && !chatSession) {
      const systemInstruction = getSystemInstruction();
      const newChat = aiInstance.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: { systemInstruction },
      });
      setChatSession(newChat);
      setMessages([{
        id: 'initial-bot-greeting',
        text: t('chatbotInitialGreeting'),
        sender: 'bot',
        timestamp: new Date(),
      }]);
    } else if (!isOpen) {
      // recognitionRef.current logic removed as it's for Web Speech API
      if (isListening) {
        SpeechRecognition.stop().catch(e => console.error("Error stopping recognition on close:", e));
        setIsListening(false);
      }
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
    }
  }, [isOpen, chatSession, t, getSystemInstruction, isListening]);

  // NEW useEffect for checking Speech Recognition Availability
  useEffect(() => {
      const checkAvailability = async () => {
          try {
              const { available } = await SpeechRecognition.available();
              SpeechRecognitionAvailable.current = available;
              if (!available) {
                  addSystemMessage("chatbotErrorUnsupportedSpeech");
              }
          } catch (err) {
              console.error("Error checking speech recognition availability:", err);
              addSystemMessage("chatbotErrorUnsupportedSpeech");
          }
      };

      checkAvailability();

      return () => {
          if (isListening) {
              SpeechRecognition.stop().catch(e => console.error("Error stopping recognition on cleanup:", e));
          }
      };
  }, [language, addSystemMessage, isListening]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if ((!inputValue.trim() && !selectedImageFile) || !chatSession) return;

    const currentInputValue = inputValue;
    const currentSelectedImageFile = selectedImageFile;
    const currentImagePreviewUrl = imagePreviewUrl;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentInputValue,
      sender: 'user',
      timestamp: new Date(),
      sentImage: currentSelectedImageFile && currentImagePreviewUrl ? { dataUrl: currentImagePreviewUrl, name: currentSelectedImageFile.name } : undefined,
    };
    setMessages(prev => [...prev, userMessage]);

    setInputValue('');
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    setIsLoading(true);
    setErrorKey(null);

    const loadingBotMessageId = `bot-loading-${Date.now()}`;
    setMessages(prev => [...prev, {
        id: loadingBotMessageId,
        text: t('chatbotTyping'),
        sender: 'bot',
        timestamp: new Date(),
        isLoading: true,
    }]);

    try {
      const apiParts: Part[] = [];
      let promptText = currentInputValue.trim();

      if (skinAnalysisData && messages.filter(m => m.sender === 'user').length <= 1) {
        const profileSummary = `Contexto de mi piel (en ${language}): Impresión general: "${skinAnalysisData.generalImpression}". Características notables: ${skinAnalysisData.characteristics.slice(0,3).map(c => `${c.nameKey ? t(c.nameKey) : c.name} (puntuación ${c.score})`).join(', ')}.`;
        if (promptText) {
            promptText = `${profileSummary}\n\nMi pregunta es: ${promptText}`;
        } else {
            promptText = `${profileSummary}\n\nAnaliza la imagen adjunta en relación a este contexto de piel.`;
        }
      }

      if (currentSelectedImageFile) {
        const imagePartData = await fileToGenerativePart(currentSelectedImageFile);
        if (imagePartData) {
          apiParts.push({ inlineData: imagePartData });
        } else {
          addSystemMessage('chatbotErrorFileRead');
          setIsLoading(false);
          setMessages(prev => prev.filter(m => m.id !== loadingBotMessageId));
          return;
        }
      }

      if (promptText) {
         apiParts.unshift({ text: promptText });
      } else if (apiParts.length > 0 && !promptText) {
          // If only image is sent without text, add a generic prompt to guide the model.
          apiParts.unshift({ text: t('chatbotImageAnalysisPrompt') });
      }

      if (apiParts.length === 0) {
        setIsLoading(false);
        setMessages(prev => prev.filter(m => m.id !== loadingBotMessageId));
        return;
      }

      const response: GenerateContentResponse = await chatSession.sendMessage({ message: apiParts });
      const botResponseText = response.text;

      const botMessage: ChatMessage = {
        id: Date.now().toString() + '-bot',
        text: botResponseText || t('chatbotNoResponse') || '',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => prev.filter(m => m.id !== loadingBotMessageId).concat(botMessage));

    } catch (err: any) {
      console.error("Chatbot API error:", err);
      setErrorKey("chatbotErrorGeneral");
      setMessages(prev => prev.filter(m => m.id !== loadingBotMessageId).concat({
        id: Date.now().toString() + '-error',
        text: t('chatbotErrorGeneral'),
        sender: 'system',
        timestamp: new Date(),
      }));
    } finally {
      setIsLoading(false);
    }
  }, [chatSession, inputValue, selectedImageFile, imagePreviewUrl, skinAnalysisData, messages, t, language, addSystemMessage]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    handleSendMessage();
  };

  const handleQuickReply = (replyText: string) => {
    setInputValue(replyText);
    handleSendMessage();
  };

  // REMOVE THE OLD useEffect block for Web Speech API entirely.
  // The new useEffect for SpeechRecognitionAvailability above replaces its core functionality.


  // Inside Chatbot functional component
const toggleListening = async () => { // <--- UPDATED function with 'async'
    if (!SpeechRecognitionAvailable.current) {
        addSystemMessage("chatbotErrorUnsupportedSpeech");
        return;
    }

    if (isListening) {
        // Stop listening
        try {
            await SpeechRecognition.stop();
            setIsListening(false);
            // The final transcript will be in inputValue, which will be sent by handleSendMessage
            if (inputValue.trim() !== '') {
                handleSendMessage(); // Trigger send after stopping
            }
        } catch (error: any) {
            console.error("Error stopping speech recognition:", error);
            addSystemMessage("chatbotErrorSpeechStop", { message: error.message || t('error.unknown') });
            setIsListening(false);
        }
    } else {
        // Start listening
        try {
            // Check for 'speechRecognition' property on permissionStatus
            const permissionStatus = await SpeechRecognition.requestPermissions();

            if (permissionStatus.speechRecognition === 'granted') {
                setInputValue(''); // Clear previous input before starting speech
                setErrorKey(null);

                setIsListening(true);
                addSystemMessage('chatbotListeningPlaceholder'); // Inform user it's listening

                const result = await SpeechRecognition.start({
                    language: language === 'es' ? 'es-ES' : 'en-US',
                    partialResults: false,
                });

                if (result && result.matches && result.matches.length > 0) {
                    setInputValue(result.matches[0]); // Set the input with the final detected speech
                } else {
                    addSystemMessage("chatbotErrorSpeechNoSound");
                    setInputValue('');
                }
                setIsListening(false); // Once start() promise resolves, it means it's done listening
            } else {
                addSystemMessage("chatbotErrorMicPermissionDenied");
            }
        } catch (err: any) {
            console.error("Microphone access denied or error:", err);
            let permissionErrorKey = "chatbotErrorMicPermission";
            if (err.message.includes("NotAllowedError") || err.message.includes("Permission denied")) {
                permissionErrorKey = "chatbotErrorMicPermissionDenied";
            } else if (err.message.includes("NotFoundError") || err.message.includes("DevicesNotFoundError")) {
                permissionErrorKey = "chatbotErrorMicNotFound";
            } else if (err.message.includes("unsupported on web")) {
                 permissionErrorKey = "chatbotErrorUnsupportedSpeech";
            }
            addSystemMessage(permissionErrorKey);
            setIsListening(false);
        }
    }
};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        addSystemMessage('chatbotErrorFileTypeUnsupported');
        setSelectedImageFile(null);
        setImagePreviewUrl(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        addSystemMessage('chatbotErrorFileSizeExceeded', { size: `${MAX_FILE_SIZE / (1024*1024)}MB` });
        setSelectedImageFile(null);
        setImagePreviewUrl(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
        return;
      }
      setSelectedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
      <div className="bg-white dark:bg-gray-800 w-full h-full sm:max-w-md sm:h-auto sm:max-h-[90vh] sm:max-h-[calc(100vh-4rem)] rounded-none sm:rounded-lg shadow-xl flex flex-col transition-all duration-300">
        <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <ChatbotHeaderIcon />
            <h2 id="chatbot-title" className="text-lg font-semibold text-gray-800 dark:text-gray-100">{t('chatbotTitle')}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={t('chatbotCloseButtonLabel')}
          >
            <CloseIconX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow p-3 space-y-2 overflow-y-auto min-h-[200px]">
          {errorKey && <p className="text-red-500 text-xs text-center p-2">{t(errorKey)}</p>}
          {messages.map(msg => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {imagePreviewUrl && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="relative inline-block group">
              <img src={imagePreviewUrl} alt="Preview" className="h-20 w-20 object-cover rounded-md border border-gray-300 dark:border-gray-600" />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 leading-none hover:bg-red-600 transition-colors"
                aria-label={t('chatbotRemoveImageLabel')}
              >
                <CloseIconX className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {messages.length > 0 && !isLoading && messages[messages.length-1]?.sender === 'bot' && !imagePreviewUrl && (
             <div className="px-3 pt-1 pb-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">{t('chatbotSuggestions')}</p>
                <div className="flex flex-wrap gap-1.5">
                    {quickReplies.map(reply => (
                        <button
                            key={reply}
                            onClick={() => handleQuickReply(reply)}
                            className="px-2.5 py-1.5 text-xs border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-content transition-colors"
                        >
                            {reply}
                        </button>
                    ))}
                </div>
            </div>
        )}

        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={ALLOWED_IMAGE_TYPES.join(',')}
            className="hidden"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
            aria-label={t('chatbotAttachImageButtonLabel')}
          >
            <PhotoIcon className="w-5 h-5" />
          </button>
             <button
            type="button"
            onClick={toggleListening}
            
            style={isListening ? { backgroundColor: '#14e3eb' } : {}} 
            className={`p-2 rounded-full ${isListening ? 'text-white animate-pulse' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'} transition-colors flex-shrink-0`}
            aria-label={isListening ? t("chatbotStopListeningButtonLabel") : t("chatbotMicButtonLabel")}
          >
            <MicrophoneIcon className="w-5 h-5" isListening={isListening}/>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isListening ? t('chatbotListeningPlaceholder') : t('chatbotInputPlaceholder')}
            className="flex-1 min-w-0 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm"
            aria-label={t('chatbotInputPlaceholder')}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-2.5 bg-primary text-primary-content rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex-shrink-0"
            aria-label={t('chatbotSendButtonLabel')}
            disabled={isLoading || (!inputValue.trim() && !selectedImageFile)}
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;