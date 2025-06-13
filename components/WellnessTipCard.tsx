
import React from 'react';
import { WellnessTip } from '../types';
import { getIconByKeyword } from './icons';
import { useTranslation } from '../contexts/LanguageContext';

interface WellnessTipCardProps {
  tip: WellnessTip;
}

const WellnessTipCard: React.FC<WellnessTipCardProps> = ({ tip }) => {
  const { t } = useTranslation();
  const displayCategory = tip.categoryKey ? t(tip.categoryKey) : tip.category;
  const displayTip = tip.tip; 

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-3 h-full overflow-hidden">
      <div className="flex-shrink-0 text-primary dark:text-[#14e3eb] mt-0.5 sm:mt-1">
        {getIconByKeyword(tip.icon || tip.category, "w-6 h-6 sm:w-7 sm:h-7")}
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 mb-1 break-words">{displayCategory}</h4>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-words">{displayTip}</p>
      </div>
    </div>
  );
};

export default WellnessTipCard;
