import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { ArrowLeftIcon } from './icons';

interface TermsAndConditionsScreenProps {
  onClose: () => void;
}

const TermsAndConditionsScreen: React.FC<TermsAndConditionsScreenProps> = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-50 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 sm:px-6 flex items-center">
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2"
            aria-label={t('termsBackButtonLabel')}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {t('termsScreenTitle')}
          </h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 text-gray-700 dark:text-gray-300">
          <p className="font-semibold mb-2">Fecha de vigencia: [11/06/2025]</p>
          <p className="mb-6">
            Bienvenido(a) a nuestra aplicación de Propiel. Al utilizar esta aplicación, aceptas los
            siguientes Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, por favor
            no utilices esta aplicación.
          </p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">1. Descripción del servicio</h2>
            <p>
              Nuestra aplicación permite a los usuarios realizar escaneos faciales con fines informativos,
              interactuar con un chatbot inteligente, y acceder a diferentes funcionalidades de
              configuración y sugerencias.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">2. Uso adecuado</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Debes tener al menos 13 años para utilizar esta app.</li>
              <li>Está prohibido subir contenido ofensivo, ilegal o que vulnere derechos de terceros.</li>
              <li>El uso de la app con fines que no estén expresamente autorizados está prohibido.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">3. Propiedad intelectual</h2>
            <p>
              Todo el contenido, diseño y funcionalidades de esta aplicación están protegidos por
              derechos de autor y propiedad intelectual. No puedes copiar, modificar o distribuir
              ninguna parte sin permiso.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">4. Exoneración de responsabilidad</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Los resultados del escaneo facial son estimaciones informativas y no deben ser
                  considerados diagnósticos ni recomendaciones médicas.</li>
              <li>No garantizamos que el servicio estará libre de errores o disponible en todo
                  momento.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">5. Modificaciones</h2>
            <p>
              Podemos actualizar estos términos en cualquier momento. Te notificaremos sobre
              cambios relevantes a través de la app o redes sociales.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditionsScreen;