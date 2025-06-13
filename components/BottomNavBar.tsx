


import React from 'react';
import { HomeIcon, CameraIcon, SettingsIcon, PlusIcon, ProPielChatbotIcon } from './icons'; // Updated import
import { useTranslation } from '../contexts/LanguageContext';
import { AppView } from '../types';

interface BottomNavBarProps {
  activeView: AppView; // 'home' | 'scan' | 'options'
  onNavChange: (view: AppView) => void; // For home and options
  onCameraNavIconPress: () => void; // For the camera icon in the nav bar
  onScanPress: () => void; // For Central Plus button (file upload)
  onAssistantPress: () => void;
  isChatbotOpen: boolean;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ 
  activeView, 
  onNavChange, 
  onCameraNavIconPress,
  onScanPress, 
  onAssistantPress,
  isChatbotOpen 
}) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'home' as AppView, labelKey: 'navHome', icon: HomeIcon, action: () => onNavChange('home') },
    { id: 'scan' as AppView, labelKey: 'navScan', icon: CameraIcon, action: onCameraNavIconPress }, // Changed action
    { id: 'central-action', icon: PlusIcon, action: onScanPress, isCentral: true, ariaLabelKey: 'navUploadImage' }, 
    { id: 'assistant', labelKey: 'navAssistant', icon: ProPielChatbotIcon, action: onAssistantPress },
    { id: 'options' as AppView, labelKey: 'navOptions', icon: SettingsIcon, action: () => onNavChange('options') },
  ];

  return (
    <nav 
        className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.07)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.15)] rounded-t-2xl sm:rounded-t-3xl flex justify-around items-center px-1 sm:px-2 z-40"
        role="navigation"
        aria-label="Main navigation"
    >
      {navItems.map((item) => {
        let isActive = false;
        if (item.id === 'assistant') {
          isActive = isChatbotOpen;
        } else if (item.id === 'home' || item.id === 'scan' || item.id === 'options') {
          isActive = activeView === item.id;
        }

        const IconComponent = item.icon;

        if (item.isCentral) {
          return (
            <div key={item.id} className="flex-shrink-0 mx-1"> 
              <button
                onClick={item.action}
                className="flex flex-col items-center justify-center -mt-7 transform transition-transform hover:scale-105"
                aria-label={t(item.ariaLabelKey as string) || t('scanFaceButton')} // Use new ariaLabelKey
              >
                <div className="bg-primary rounded-full p-3.5 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-200">
                  <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 filter-white-icon" />
                </div>
              </button>
            </div>
          );
        }

        return (
          <button
            key={item.id}
            onClick={item.action}
            className={`flex flex-col items-center justify-center flex-1 h-full p-1 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-50 rounded-md
                        ${isActive 
                            ? 'text-primary dark:text-primary' 
                            : 'text-nav-inactive dark:text-gray-400 hover:text-primary dark:hover:text-primary'
                        }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t(item.labelKey as string)}
          >
            <IconComponent className="w-6 h-6 mb-0.5" isActive={isActive} />
            {item.labelKey && (
              <span className={`text-[10px] sm:text-xs font-medium 
                                ${isActive ? 'text-primary dark:text-primary' : 'text-nav-inactive dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary'}`}>
                {t(item.labelKey)}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;