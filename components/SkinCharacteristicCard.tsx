
import React from 'react';
import { SkinCharacteristic } from '../types';
import { getIconByKeyword } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface SkinCharacteristicCardProps {
  characteristic: SkinCharacteristic;
}

const SkinCharacteristicCard: React.FC<SkinCharacteristicCardProps> = ({ characteristic }) => {
  const { t } = useTranslation();
  const scoreColor = characteristic.score > 70 ? 'bg-green-500' : characteristic.score > 40 ? 'bg-yellow-500' : 'bg-red-500';
  
  const displayName = characteristic.nameKey ? t(characteristic.nameKey) : characteristic.name;
  const displayDescription = characteristic.description;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full overflow-hidden">
      <div className="mb-2 sm:mb-3 text-primary dark:text-[#14e3eb]">
        {getIconByKeyword(characteristic.icon || characteristic.name, "w-8 h-8 sm:w-10 sm:h-10")}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 break-words">{displayName}</h3>
      <div 
        className={`mb-2 w-16 h-16 text-lg sm:w-20 sm:h-20 sm:text-xl font-bold rounded-full flex items-center justify-center ${scoreColor} text-white`}
      >
        {characteristic.score}
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 flex-grow break-words">{displayDescription}</p>
    </div>
  );
};

export default SkinCharacteristicCard;
