import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from './icons';

interface PrivacyPolicyScreenProps {
  onClose: () => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:px-6 flex items-center">
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2"
            aria-label={t('termsBackButtonLabel')} // Re-use "Back" label
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t('privacyScreenTitle')}
          </h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">POLÍTICA DE PRIVACIDAD</h2>
          <p className="font-semibold mb-2">Fecha de vigencia: [11/06/2025]</p>
          <p className="mb-6">
            Tu privacidad es importante para nosotros. Esta Política de Privacidad explica cómo
            recopilamos, usamos y protegemos tu información.
          </p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">1. Información que recopilamos</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Fotografías faciales para análisis temporal (no se almacenan a largo plazo).</li>
              <li>Datos de interacción con el chatbot.</li>
              <li>Información del dispositivo: tipo de dispositivo, sistema operativo y versión.</li>
              <li>Datos opcionales que el usuario decida proporcionar (nombre, edad, etc.).</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">2. Uso de la información</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Analizar rasgos faciales para mostrar resultados estimados.</li>
              <li>Mejorar la experiencia del usuario.</li>
              <li>Proporcionar respuestas más precisas del chatbot.</li>
              <li>Cumplir con requisitos legales o de seguridad.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">3. Conservación de datos</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Las imágenes faciales se procesan en tiempo real y no se almacenan en servidores.</li>
              <li>Los datos de interacción pueden ser usados para mejorar el modelo conversacional de manera anonimizada.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">4. Seguridad de los datos</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Utilizamos cifrado para proteger la transmisión de datos.</li>
              <li>Acceso restringido a los datos por parte de personal autorizado.</li>
              <li>No compartimos tu información personal con terceros sin tu consentimiento.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">5. Tus derechos</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Puedes solicitar acceso, modificación o eliminación de tus datos.</li>
              <li>Puedes retirar tu consentimiento en cualquier momento desde la sección de configuración.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">6. Contacto</h2>
            <p className="mb-1">
              Para cualquier consulta relacionada con estos términos o tu privacidad, contáctanos en:
              {' '}
              <a href="mailto:Propiel.cl@gmail.com" className="text-primary hover:underline dark:text-primary dark:hover:underline">
                Propiel.cl@gmail.com
              </a>
            </p>
          </section>
          
          <p className="mt-6 mb-0">
            Gracias por confiar en nuestra aplicación.
          </p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyScreen;