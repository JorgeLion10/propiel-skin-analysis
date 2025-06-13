import React from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeToggleButton from './ThemeToggleButton';
import { Theme } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { SettingsIcon, ChevronRightIcon } from './icons'; // Updated import

interface OptionsScreenProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onShowTerms: () => void;
  onShowPrivacyPolicy: () => void; 
}

const OptionsScreen: React.FC<OptionsScreenProps> = ({ theme, setTheme, onShowTerms, onShowPrivacyPolicy }) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-[calc(100vh-5rem)]"> {/* Adjusted min-height for nav bar only */}
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
        
        <div className="flex items-center space-x-3 pb-4 mb-3 border-b border-gray-200 dark:border-gray-700">
           <SettingsIcon className="w-8 h-8 text-primary dark:text-[#14e3eb]" /> {/* Replaced SparklesIcon with SettingsIcon */}
           <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{t('optionsTitle')}</h2>
        </div>

        {/* Preferences Group */}
        <div className="mb-6">
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 px-3">{t('optionsGroupPreferences')}</h3>
          <div className="space-y-1">
            {/* Language Selection */}
            <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 cursor-default">
              <span className="text-md font-medium text-gray-700 dark:text-gray-300">{t('language')}</span>
              <LanguageSelector />
            </div>

            {/* Theme Toggle */}
            <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 cursor-default">
              <span className="text-md font-medium text-gray-700 dark:text-gray-300">{t('themeToggle')}</span>
              <ThemeToggleButton theme={theme} setTheme={setTheme} />
            </div>
          </div>
        </div>
        
        {/* Legal Group */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-2 px-3">{t('optionsGroupLegal')}</h3>
          <div className="space-y-1">
            {/* Terms and Conditions */}
            <button
              onClick={onShowTerms}
              className="w-full flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 text-left"
              aria-label={t('optionsTermsAndConditions')}
            >
              <span className="text-md font-medium text-gray-700 dark:text-gray-300">{t('optionsTermsAndConditions')}</span>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </button>

            {/* Privacy Policy */}
            <button
              onClick={onShowPrivacyPolicy}
              className="w-full flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-150 text-left"
              aria-label={t('optionsPrivacyPolicy')}
            >
              <span className="text-md font-medium text-gray-700 dark:text-gray-300">{t('optionsPrivacyPolicy')}</span>
              <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsScreen;