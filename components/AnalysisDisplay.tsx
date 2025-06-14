

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { SkinAnalysisData } from '../types';
import SkinCharacteristicCard from './SkinCharacteristicCard';
import SkincareRoutineSection from './SkincareRoutineSection';
import ProductRecommendationCard from './ProductRecommendationCard';
import WellnessTipCard from './WellnessTipCard';
import { ChevronDownIcon, InfoIcon, DownloadIcon } from './icons';
import { useTranslation } from '../contexts/LanguageContext';
// IMPORTS NUEVOS:
import { Filesystem, Directory } from '@capacitor/filesystem'; // Asegúrate de haber instalado @capacitor/filesystem
import { Capacitor } from '@capacitor/core'; // Necesario para detectar si estamos en una plataforma nativa


interface AnalysisDisplayProps {
  analysisData: SkinAnalysisData;
  onReset: () => void;
}

interface AccordionSectionProps {
  titleKey: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ titleKey, icon, children }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const title = t(titleKey);

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-t-xl"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </div>
        <ChevronDownIcon className={`w-5 h-5 sm:w-6 sm:h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div id={`accordion-content-${title.replace(/\s+/g, '-')}`} className="p-4 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};


const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysisData, onReset }) => {
  const { t } = useTranslation();
  const { generalImpression, characteristics, routine, products, wellnessTips } = analysisData;

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfMessage, setPdfMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setPdfMessage(null);

    try {
      const doc = new jsPDF();
      const primaryColor = '#14e3eb';
      const textColor = '#333333';
      const secondaryTextColor = '#555555';
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let yPos = margin;
      const lineHeight = 7;
      const sectionSpacing = 10;
      const itemSpacing = 5;

      // Helper to add text and manage Y position & page breaks
      const addText = (text: string | string[], x: number, currentY: number, options: any = {}, maxWidth?: number): number => {
        const textArray = Array.isArray(text) ? text : [text];
        let newY = currentY;
        
        textArray.forEach(line => {
            if (newY + lineHeight > pageHeight - margin) {
                doc.addPage();
                newY = margin;
            }
            const textToPrint = maxWidth ? doc.splitTextToSize(line, maxWidth) : [line];
            doc.text(textToPrint, x, newY, options);
            newY += (textToPrint.length * lineHeight) + (options.isTitle ? 2 : 0); // Add extra space after titles
        });
        return newY;
      };
      
      doc.setFont('helvetica', 'normal');

      // Header
      doc.setFontSize(22);
      doc.setTextColor(primaryColor);
      yPos = addText('ProPiel', margin, yPos, { isTitle: true });
      doc.setFontSize(16);
      yPos = addText(t('pdfReportTitle'), margin, yPos + 2, { isTitle: true });
      
      // Date
      doc.setFontSize(10);
      doc.setTextColor(secondaryTextColor);
      const currentDate = new Date().toLocaleDateString(t('language') === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      yPos = addText(t('pdfGeneratedDate', { date: currentDate }), margin, yPos + 5);
      yPos += sectionSpacing / 2;

      // General Impression
      doc.setFontSize(14);
      doc.setTextColor(primaryColor);
      yPos = addText(t('analysisSectionCharacteristics'), margin, yPos, { isTitle: true });
      doc.setFontSize(11);
      doc.setTextColor(textColor);
      if (generalImpression) {
        yPos = addText(generalImpression, margin, yPos + 2, {}, contentWidth);
      } else {
        yPos = addText(t('analysisGeneralImpressionDefault'), margin, yPos + 2, {}, contentWidth);
      }
      yPos += sectionSpacing;

      // Skin Characteristics
      if (characteristics && characteristics.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        yPos = addText(t('analysisSectionCharacteristics'), margin, yPos, { isTitle: true });
        yPos += 2;
        characteristics.forEach(char => {
          if (yPos > pageHeight - margin - 30) { doc.addPage(); yPos = margin; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(textColor);
          const charName = char.nameKey ? t(char.nameKey) : char.name;
          yPos = addText(`• ${charName}`, margin, yPos, {}, contentWidth);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(secondaryTextColor);
          yPos = addText(`${t('pdfScoreLabel')}: ${char.score}/100`, margin + 5, yPos, {}, contentWidth);
          yPos = addText(char.description, margin + 5, yPos, {}, contentWidth - 5);
          yPos += itemSpacing;
        });
        yPos += sectionSpacing;
      }
      
      // Skincare Routine
      if (routine && routine.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        yPos = addText(t('analysisSectionRoutine'), margin, yPos, { isTitle: true });
        yPos += 2;

        const morningRoutine = routine.filter(r => r.time === 'Morning').sort((a,b) => a.step - b.step);
        const eveningRoutine = routine.filter(r => r.time === 'Evening').sort((a,b) => a.step - b.step);

        if (morningRoutine.length > 0) {
          if (yPos > pageHeight - margin - 20) { doc.addPage(); yPos = margin; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(textColor);
          yPos = addText(t('routineMorning'), margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(secondaryTextColor);
          morningRoutine.forEach(step => {
            if (yPos > pageHeight - margin - 20) { doc.addPage(); yPos = margin; }
            let stepText = `${step.step}. ${step.description}`;
            if (step.productType) stepText += ` (${step.productType})`;
            yPos = addText(stepText, margin + 5, yPos, {}, contentWidth - 5);
          });
          yPos += itemSpacing;
        }

        if (eveningRoutine.length > 0) {
          if (yPos > pageHeight - margin - 20) { doc.addPage(); yPos = margin; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(textColor);
          yPos = addText(t('routineEvening'), margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(secondaryTextColor);
          eveningRoutine.forEach(step => {
            if (yPos > pageHeight - margin - 20) { doc.addPage(); yPos = margin; }
            let stepText = `${step.step}. ${step.description}`;
            if (step.productType) stepText += ` (${step.productType})`;
            yPos = addText(stepText, margin + 5, yPos, {}, contentWidth - 5);
          });
          yPos += itemSpacing;
        }
        yPos += sectionSpacing;
      }

      // Product Recommendations
      if (products && products.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        yPos = addText(t('analysisSectionProducts'), margin, yPos, { isTitle: true });
        yPos += 2;
        products.forEach(prod => {
          if (yPos > pageHeight - margin - 30) { doc.addPage(); yPos = margin; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(textColor);
          yPos = addText(`• ${prod.name || 'Product Name'}`, margin, yPos, {}, contentWidth);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(secondaryTextColor);
          yPos = addText(`  ${t('Type')}: ${prod.type || 'N/A'}`, margin, yPos, {}, contentWidth); // Assuming 'Type' key exists or add it
          yPos = addText(`  ${t('Reason')}: ${prod.reason || 'N/A'}`, margin, yPos, {}, contentWidth); // Assuming 'Reason' key exists
          yPos += itemSpacing;
        });
        yPos += sectionSpacing;
      }

      // Wellness Tips
      if (wellnessTips && wellnessTips.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(primaryColor);
        yPos = addText(t('analysisSectionWellness'), margin, yPos, { isTitle: true });
        yPos += 2;
        wellnessTips.forEach(tip => {
          if (yPos > pageHeight - margin - 20) { doc.addPage(); yPos = margin; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(textColor);
          const categoryName = tip.categoryKey ? t(tip.categoryKey) : tip.category;
          yPos = addText(`• ${categoryName}`, margin, yPos, {}, contentWidth);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(secondaryTextColor);
          yPos = addText(`  ${tip.tip}`, margin + 5, yPos, {}, contentWidth - 5);
          yPos += itemSpacing;
        });
        yPos += sectionSpacing;
      }

      // Disclaimer
      doc.setFontSize(12);
      doc.setTextColor(primaryColor);
      yPos = addText(t('pdfDisclaimerTitle'), margin, yPos, { isTitle: true });
      doc.setFontSize(9);
      doc.setTextColor(secondaryTextColor);
      yPos = addText(t('analysisDisclaimer'), margin, yPos + 2, {}, contentWidth);

      const filename = `ProPiel_Analysis_${new Date().toISOString().split('T')[0]}.pdf`;
      // --- INICIO DE LA MODIFICACIÓN ---
      if (Capacitor.isNativePlatform()) { //
        const pdfOutput = doc.output('datauristring'); // Obtiene el PDF como data URI (Base64 con prefijo)
        const pdfBase64Data = pdfOutput.split(',')[1]; // Extrae la parte Base64 pura

        try {
          await Filesystem.writeFile({
            path: filename,
            data: pdfBase64Data, //
            directory: Directory.Documents, // Guardar en la carpeta Documentos
            recursive: true // Crea directorios si no existen
          });
          setPdfMessage({ type: 'success', text: t('pdfSuccessMessage') + ' (Guardado en Documentos)' });
        } catch (e) {
          console.error("Error al guardar PDF en dispositivo:", e);
          setPdfMessage({ type: 'error', text: t('pdfErrorMessage') + ' (Error de almacenamiento)' });
        }
      } else {
        // Lógica para navegadores web (lo que ya tenías con doc.save)
        doc.save(filename); //
        setPdfMessage({ type: 'success', text: t('pdfSuccessMessage') });
      }
      // --- FIN DE LA MODIFICACIÓN ---

    } catch (error) {
      console.error("Failed to generate PDF:", error);
      setPdfMessage({ type: 'error', text: t('pdfErrorMessage') });
    } finally {
      setIsDownloadingPdf(false);
    }
  };


  return (
    <div className="container mx-auto p-4 space-y-6 sm:space-y-8 max-w-4xl">
      <div className="text-center mb-6 sm:mb-8">
        <h2
          onClick={scrollToTop}
          className="text-2xl sm:text-3xl font-bold text-primary dark:text-[#14e3eb] mb-2 cursor-pointer hover:opacity-80 transition-opacity"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && scrollToTop()}
          aria-label={t('analysisResultsTitle')}
        >
          {t('analysisResultsTitle')}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 px-2 break-words">
          {generalImpression || t('analysisGeneralImpressionDefault')}
        </p>
      </div>

      <AccordionSection titleKey="analysisSectionCharacteristics" icon={<InfoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-[#14e3eb]" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {characteristics && characteristics.length > 0 ? (
            characteristics.map((char, index) => (
              <SkinCharacteristicCard key={char.nameKey || char.name || index} characteristic={char} />
            ))
          ) : <p className="col-span-full text-gray-600 dark:text-gray-400 text-sm">{t('analysisNoCharacteristics')}</p>}
        </div>
      </AccordionSection>
      
      <AccordionSection titleKey="analysisSectionRoutine" icon={<InfoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-[#14e3eb]" />}>
        {routine && routine.length > 0 ? (
          <SkincareRoutineSection routine={routine} />
        ) : <p className="text-gray-600 dark:text-gray-400 text-sm">{t('analysisNoRoutine')}</p>}
      </AccordionSection>

      <AccordionSection titleKey="analysisSectionProducts" icon={<InfoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-[#14e3eb]" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductRecommendationCard key={product.name || index} product={product} />
            ))
          ) : <p className="col-span-full text-gray-600 dark:text-gray-400 text-sm">{t('analysisNoProducts')}</p>}
        </div>
      </AccordionSection>
      
      <AccordionSection titleKey="analysisSectionWellness" icon={<InfoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-[#14e3eb]" />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wellnessTips && wellnessTips.length > 0 ? (
            wellnessTips.map((tip, index) => (
              <WellnessTipCard key={tip.tip || index} tip={tip} />
            ))
          ) : <p className="col-span-full text-gray-600 dark:text-gray-400 text-sm">{t('analysisNoWellnessTips')}</p>}
        </div>
      </AccordionSection>

      <div className="text-center mt-8 sm:mt-12 flex flex-col items-center space-y-3">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
            onClick={onReset} 
            className="px-6 py-2.5 sm:px-8 sm:py-3 bg-primary text-primary-content font-semibold rounded-lg hover:bg-opacity-90 transition-colors text-sm sm:text-base w-full sm:w-auto"
            aria-label={t('analysisReturnHomeButton')}
            >
            {t('analysisReturnHomeButton')}
            </button>
            <button
                onClick={handleDownloadPdf}
                disabled={isDownloadingPdf}
                className="flex items-center justify-center space-x-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-colors text-sm sm:text-base w-full sm:w-auto disabled:opacity-50"
                aria-label={t('analysisDownloadPdfButton')}
            >
                <DownloadIcon className="w-5 h-5" />
                <span>
                    {isDownloadingPdf ? `${t('loadingAnalysis').split(' ')[0]}...` : t('analysisDownloadPdfButton')}
                </span>
                {isDownloadingPdf && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>}
            </button>
        </div>
        {pdfMessage && (
            <p className={`text-xs mt-3 ${pdfMessage.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {pdfMessage.text}
            </p>
        )}
      </div>
       <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6 sm:mt-8 px-2">
        {t('analysisDisclaimer')}
      </p>
    </div>
  );
};

export default AnalysisDisplay;