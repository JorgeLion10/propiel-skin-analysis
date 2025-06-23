

import React, { useState, useEffect } from 'react';
import { CameraIcon, ChartBarIcon, ChevronRightIcon, ViewfinderCircleIcon } from './icons'; // SparklesIcon removed
import FacialTreatmentCard from './FacialTreatmentCard';
import { FacialTreatmentService } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface IdleHomeScreenProps {
  onStartScan: () => void;
  facialTreatmentsData: FacialTreatmentService[];
}

const IdleHomeScreen: React.FC<IdleHomeScreenProps> = ({ onStartScan, facialTreatmentsData }) => {
  const { t } = useTranslation();
  
  const fullWelcomeText = t('idleHomeTitle');
  const [welcomeText, setWelcomeText] = useState('');
  const [isTypingWelcome, setIsTypingWelcome] = useState(true);
  const WELCOME_TYPING_SPEED_MS = 120;

  const fullSloganText = t('appSlogan');
  const [animatedSlogan, setAnimatedSlogan] = useState('');
  const [isTypingSlogan, setIsTypingSlogan] = useState(true);
  const SLOGAN_TYPING_SPEED_MS = 80;

  useEffect(() => {
    setWelcomeText(''); 
    setIsTypingWelcome(true);
    let currentText = '';
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < fullWelcomeText.length) {
        currentText += fullWelcomeText.charAt(charIndex);
        setWelcomeText(currentText);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingWelcome(false);
      }
    }, WELCOME_TYPING_SPEED_MS);

    return () => {
      clearInterval(typingInterval);
    };
  }, [fullWelcomeText]);

  useEffect(() => {
    // If welcome title is still typing, reset slogan and wait.
    if (isTypingWelcome) {
      setAnimatedSlogan('');
      setIsTypingSlogan(true); // Keep slogan cursor hidden or reset
      return; 
    }

    // Welcome animation is done, proceed with slogan animation
    setAnimatedSlogan(''); // Reset for a fresh start
    setIsTypingSlogan(true); // Show cursor for slogan
    let currentSlogan = '';
    let sloganCharIndex = 0;

    const sloganTypingInterval = setInterval(() => {
      if (sloganCharIndex < fullSloganText.length) {
        currentSlogan += fullSloganText.charAt(sloganCharIndex);
        setAnimatedSlogan(currentSlogan);
        sloganCharIndex++;
      } else {
        clearInterval(sloganTypingInterval);
        setIsTypingSlogan(false); // Slogan animation finished
      }
    }, SLOGAN_TYPING_SPEED_MS);

    return () => {
      clearInterval(sloganTypingInterval);
    };
  }, [fullSloganText, isTypingWelcome]); // Depend on welcome animation status

  return (
    <div className="flex flex-col items-center justify-start pt-6 pb-10 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)]">
      <div className="text-center px-6">
        <img
          src="https://res.cloudinary.com/dpeqsbohh/image/upload/v1749788459/Skin-Analysis_2_ge6pzr.png"
          alt={t('headerTitle') + " Logo Light Mode"}
          className="w-48 h-48 object-contain mb-3 mx-auto block dark:hidden" // CAMBIADO AQUÍ
        />
        <img
          src="https://res.cloudinary.com/dpeqsbohh/image/upload/v1749789723/Skin-Analysis_4_hzqkaw.png"
          alt={t('headerTitle') + " Logo Dark Mode"}
          className="w-48 h-48 object-contain mb-3 mx-auto hidden dark:block" // CAMBIADO AQUÍ
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 h-10 sm:h-auto whitespace-nowrap">
          {welcomeText}
          {isTypingWelcome && <span className="typing-cursor">|</span>}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-3 max-w-md mx-auto min-h-[72px]"> {/* Changed mb-8 to mb-3 */}
          {animatedSlogan}
          {isTypingSlogan && !isTypingWelcome && <span className="typing-cursor">|</span>}
        </p>
        <button
          onClick={onStartScan}
          className="flex items-center justify-center space-x-2 px-8 py-4 border-2 border-[#14e3eb] text-[#14e3eb] text-lg font-semibold rounded-full hover:bg-[#e0fcff] dark:hover:bg-[#14e3eb]/15 transition-colors mx-auto"
          aria-label={t('scanFaceButton')}
        >
          <CameraIcon className="w-6 h-6" />
          <span>{t('scanFaceButton')}</span>
        </button>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto mt-8 mb-4 px-2">
          <div className="flex items-start justify-center space-x-1 sm:space-x-2">

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-0 px-0.5">
              <CameraIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mb-1" />
              <p className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 leading-tight">
                {t('progressStep1Label')}
              </p>
            </div>

            {/* Connector */}
            <div className="pt-2 sm:pt-2"> {/* Adjusted pt for vertical alignment */}
                <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-0 px-0.5">
              <ViewfinderCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mb-1" />
              <p className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 leading-tight">
                {t('progressStep2Label')}
              </p>
            </div>

            {/* Connector */}
            <div className="pt-2 sm:pt-2">
                <ChevronRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1 min-w-0 px-0.5">
              <ChartBarIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 mb-1" />
              <p className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-300 leading-tight">
                {t('progressStep3Label')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 py-8 mt-16">
        <h3 className="text-[22px] font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
          {t('featuredTreatmentsTitle')}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facialTreatmentsData.map((service) => (
            <FacialTreatmentCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdleHomeScreen;
