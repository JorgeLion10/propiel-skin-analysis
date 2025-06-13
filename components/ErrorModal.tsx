

import React, { useEffect, useState } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { InfoIcon, CloseIconX, FaceAlertIcon } from './icons'; 

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  titleKey: string;
  messageKey: string;
  messageParams?: Record<string, string | number>;
  informativeTextKey: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  onRetry,
  titleKey,
  messageKey,
  messageParams,
  informativeTextKey,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay showing modal slightly to allow for CSS transition
      const timer = setTimeout(() => setShowModal(true), 50);
      return () => clearTimeout(timer);
    } else {
      setShowModal(false);
    }
  }, [isOpen]);

  if (!isOpen && !showModal) { // Keep rendering during fade-out
    return null;
  }

  const title = t(titleKey);
  const message = t(messageKey, messageParams);
  const informativeText = t(informativeTextKey);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out ${
        showModal && isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-labelledby="error-modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-60 dark:bg-opacity-75"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out relative
                    ${ showModal && isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('error.noFaceModalCloseButton')}
        >
          <CloseIconX className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {/* Icon displayed directly without circular background */}
          {messageKey === "error.noFaceDetectedInUpload" ? (
            <FaceAlertIcon className="w-10 h-10 text-primary dark:text-[#14e3eb] mb-4" />
          ) : (
            <InfoIcon className="w-10 h-10 text-primary dark:text-[#14e3eb] mb-4" />
          )}

          <h2 id="error-modal-title" className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>

          <button
            onClick={onRetry}
            className="w-full px-6 py-3 mb-3 bg-primary text-primary-content font-semibold rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            {t('errorTryAgainButton')}
          </button>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {informativeText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
