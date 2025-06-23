import React, { useState, useEffect } from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { FaceScanAnimationIcon } from './icons'; // Importa la animación de escaneo facial

const LoadingSpinner: React.FC = () => {
  const { t } = useTranslation();

  // Definir los mensajes dinámicos usando claves de traducción
  const loadingMessagesKeys = [
    'loadingAnalysis',         // "Analizando tu piel..."
    'loadingIdentifying',      // "Identificando características clave..."
    'loadingGenerating',       // "Generando tu rutina personalizada..."
    'loadingFinalizing'        // "Optimizando tus recomendaciones..."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const MESSAGE_CYCLE_TIME_MS = 3000; // Tiempo total para un ciclo completo de mensaje (mostrar, esperar, desaparecer)

  // Efecto para rotar los mensajes
  useEffect(() => {
    const rotationInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessagesKeys.length);
    }, MESSAGE_CYCLE_TIME_MS);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(rotationInterval);
  }, [loadingMessagesKeys.length]); // Dependencia para reiniciar el intervalo si la lista de mensajes cambia

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Usa la animación de escaneo facial */}
      <FaceScanAnimationIcon className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-8 text-primary dark:text-[#14e3eb]" />

      {/* Texto dinámico con animación de fundido (fade-in/out) */}
      <p 
        key={currentMessageIndex} // La clave fuerza a React a re-renderizar el párrafo, reiniciando la animación CSS
        className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300 fade-in-out-text"
        // Pasa el tiempo del ciclo como una variable CSS personalizada
        style={{ '--message-cycle-time': `${MESSAGE_CYCLE_TIME_MS}ms` } as React.CSSProperties}
      >
        {t(loadingMessagesKeys[currentMessageIndex])}
      </p>
    </div>
  );
};

export default LoadingSpinner;