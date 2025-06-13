



import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Theme, AppState, SkinAnalysisData, FacialTreatmentService, AppView, CurrentModal } from './types';
// Header component is no longer imported or used
import CameraCapture from './components/CameraCapture';
import AnalysisDisplay from './components/AnalysisDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ErrorModal from './components/ErrorModal'; // Import the new ErrorModal
import { analyzeSkin, detectFaceInImage } from './services/geminiService'; 
import Chatbot from './components/chatbot/Chatbot';
import { useTranslation } from './contexts/LanguageContext';
import BottomNavBar from './components/BottomNavBar';
import IdleHomeScreen from './components/IdleHomeScreen';
import OptionsScreen from './components/OptionsScreen';
// HistoricalScreen import removed
import SplashScreen from './components/SplashScreen'; 
import TermsAndConditionsScreen from './components/TermsAndConditionsScreen';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';


const facialTreatmentsData: FacialTreatmentService[] = [
  {
    id: 'microneedling-vitamins',
    nameKey: 'facialTreatments.microneedlingVitamins.name',
    price: 113000,
    imageUrl: 'https://cdnx.jumpseller.com/propiel-cl/image/53675696/resize/1280/1280?1727036641',
    detailsUrl: 'https://www.propiel.cl/demo-organic',
  },
  {
    id: 'cleansing-microneedling-vitc',
    nameKey: 'facialTreatments.cleansingMicroneedlingVitC.name',
    price: 54990,
    imageUrl: 'https://cdnx.jumpseller.com/propiel-cl/image/53677165/resize/1280/1280?1727042424',
    detailsUrl: 'https://www.propiel.cl/demo-skin',
  },
  {
    id: 'lashlifting-cleansing',
    nameKey: 'facialTreatments.lashliftingCleansing.name',
    price: 42990,
    imageUrl: 'https://cdnx.jumpseller.com/propiel-cl/image/53677271/resize/1280/1280?1727042965',
    detailsUrl: 'https://www.propiel.cl/demo-spa',
  },
];


const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);
  const [appState, setAppState] = useState<AppState>(AppState.Idle);
  const [activeView, setActiveView] = useState<AppView>('home'); 
  const [analysisResult, setAnalysisResult] = useState<SkinAnalysisData | null>(null);
  const [errorMessageKey, setErrorMessageKey] = useState<string | null>(null); 
  const [errorParams, setErrorParams] = useState<Record<string, string | number> | undefined>(undefined);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { t, language } = useTranslation(); 
  const [showSplashScreen, setShowSplashScreen] = useState(true); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isNoFaceModalOpen, setIsNoFaceModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState<CurrentModal>(null);


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme(Theme.Dark);
    }
  }, []);

  useEffect(() => {
    if (theme === Theme.Dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleCapture = useCallback(async (imageDataUrl: string) => {
    setAppState(AppState.Loading);
    try {
      const result = await analyzeSkin(imageDataUrl, language, t);
      setAnalysisResult(result);
      setAppState(AppState.Results);
      setErrorMessageKey(null);
      setErrorParams(undefined);
      setIsNoFaceModalOpen(false); // Ensure modal is closed on successful capture
    } catch (error) {
      console.error("Analysis failed:", error);
      if (error instanceof Error) {
        if (error.message.includes(t("error.apiKeyInvalid").split('.')[0])) { 
            setErrorMessageKey("error.apiKeyInvalid");
        } else if (error.message.toLowerCase().includes("json")) {
            setErrorMessageKey("error.jsonParse");
            setErrorParams({ message: error.message });
        } else {
            setErrorMessageKey("error.analysisFailed");
            setErrorParams({ message: error.message });
        }
      } else {
        setErrorMessageKey("error.unknown");
      }
      setAppState(AppState.Error); // Standard full-screen error for these cases
      setIsNoFaceModalOpen(false);
    }
  }, [language, t]);
  
  const resetAppToBaseView = (targetView: AppView = 'home') => {
    setAppState(AppState.Idle);
    setActiveView(targetView);
    setAnalysisResult(null);
    setErrorMessageKey(null);
    setErrorParams(undefined);
    setIsNoFaceModalOpen(false);
    setCurrentModal(null); // Close any open modals
  };

  const handleScanPress = useCallback(() => {
    setAppState(AppState.Camera);
    setActiveView('scan');
    setIsNoFaceModalOpen(false);
  }, []);

  const handleFileUploadRequest = () => {
    setIsNoFaceModalOpen(false); // Close modal if open before triggering file input
    fileInputRef.current?.click();
  };

  const handleFileChangeAndAnalyze = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const MAX_SIZE = 15 * 1024 * 1024; 
      const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

      if (file.size > MAX_SIZE) {
        setErrorMessageKey("error.fileTooLarge");
        setErrorParams({ maxSize: '15MB' });
        setAppState(AppState.Error);
        setActiveView('scan');
        if (event.target) event.target.value = "";
        return;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMessageKey("error.fileTypeInvalid");
        setErrorParams({ allowedTypes: 'JPEG, PNG, WEBP, HEIC, HEIF' });
        setAppState(AppState.Error);
        setActiveView('scan');
        if (event.target) event.target.value = "";
        return;
      }
      
      setAppState(AppState.Loading); 
      setActiveView('scan');
      setIsNoFaceModalOpen(false);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageDataUrl = reader.result as string;
        try {
          const faceDetected = await detectFaceInImage(imageDataUrl, t);
          if (faceDetected) {
            handleCapture(imageDataUrl); 
          } else {
            setErrorMessageKey("error.noFaceDetectedInUpload"); 
            setErrorParams(undefined);
            setAppState(AppState.Idle); // Keep app state Idle to prevent full error screen
            setActiveView('scan'); // Stay in scan view context
            setIsNoFaceModalOpen(true); // Open the modal instead
          }
        } catch (error) {
          console.error("Face detection or subsequent analysis failed:", error);
           if (error instanceof Error) {
            if (error.message.includes(t("error.apiKeyInvalid").split('.')[0])) {
                setErrorMessageKey("error.apiKeyInvalid");
            } else { 
                setErrorMessageKey("error.analysisFailed"); 
                setErrorParams({ message: error.message });
            }
          } else {
            setErrorMessageKey("error.unknown");
          }
          setAppState(AppState.Error); // Fallback to full screen error for API issues during detection
          setIsNoFaceModalOpen(false);
        }
      };
      reader.onerror = () => {
        console.error("Error reading file.");
        setErrorMessageKey("error.fileReadError");
        setAppState(AppState.Error);
        setActiveView('scan'); 
        setIsNoFaceModalOpen(false);
      };
      reader.readAsDataURL(file);

      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const handleCloseNoFaceModal = () => {
    setIsNoFaceModalOpen(false);
    setErrorMessageKey(null);
    // Return to a stable state, e.g., IdleHomeScreen within 'scan' view
    setAppState(AppState.Idle);
    setActiveView('scan'); 
  };

  const handleNavChange = (view: AppView) => { 
    setIsNoFaceModalOpen(false); // Close modal on any nav change
    setCurrentModal(null); // Close modals on nav change
    // If navigating to 'scan' via this handler, it implies going to the Idle/Error state of scan tab,
    // not directly to camera (which is handled by onCameraNavIconPress now).
    if (view === 'scan') {
      if (appState === AppState.Error || appState === AppState.Results || appState === AppState.Camera) {
         resetAppToBaseView(view); 
      } else {
         setAppState(AppState.Idle); 
         setActiveView(view);
      }
    } else { // For 'home' or 'options'
      resetAppToBaseView(view);
    }
  };
  
  const handleAssistantPress = () => {
    setIsChatbotOpen(prev => !prev);
    setIsNoFaceModalOpen(false); // Close error modal if chatbot is opened
    setCurrentModal(null); // Close any other modals
  };

  const handleShowTerms = () => {
    setCurrentModal('terms');
  };

  const handleShowPrivacyPolicy = () => {
    setCurrentModal('privacy');
  };


  const renderMainContent = () => {
    // Modal for "No Face Detected" takes precedence if open
    if (isNoFaceModalOpen && errorMessageKey === "error.noFaceDetectedInUpload") {
      return (
        <>
          {/* Render background content for scan view if needed, or just the modal */}
          <IdleHomeScreen onStartScan={handleScanPress} facialTreatmentsData={facialTreatmentsData} />
          <ErrorModal
            isOpen={isNoFaceModalOpen}
            onClose={handleCloseNoFaceModal}
            onRetry={handleFileUploadRequest} // Retry specifically for file upload
            titleKey="error.noFaceModalTitle"
            messageKey="error.noFaceDetectedInUpload"
            informativeTextKey="error.noFaceModalInfoText"
          />
        </>
      );
    }

    if (appState === AppState.Camera) {
      return <CameraCapture onCapture={handleCapture} onClose={() => resetAppToBaseView(activeView)} />;
    }
    if (appState === AppState.Loading) {
      return <LoadingSpinner />;
    }
    if (appState === AppState.Results && analysisResult && activeView === 'scan') {
      return <AnalysisDisplay analysisData={analysisResult} onReset={() => resetAppToBaseView('home')} />;
    }
    // General ErrorMessage for other errors within 'scan' view
    if (appState === AppState.Error && activeView === 'scan') {
      let retryAction = handleScanPress; // Default retry is open camera
      if (errorMessageKey === "error.fileTooLarge" ||
          errorMessageKey === "error.fileTypeInvalid" ||
          errorMessageKey === "error.fileReadError") {
        retryAction = handleFileUploadRequest; 
      }
      return <ErrorMessage 
                messageKey={errorMessageKey || "error.unknown"} 
                messageParams={errorParams} 
                onRetry={retryAction} 
             />;
    }

    switch (activeView) {
      case 'home':
        return <IdleHomeScreen onStartScan={handleScanPress} facialTreatmentsData={facialTreatmentsData} />;
      case 'options':
        return <OptionsScreen theme={theme} setTheme={setTheme} onShowTerms={handleShowTerms} onShowPrivacyPolicy={handleShowPrivacyPolicy} />;
      case 'scan': 
        // This case is typically reached if appState is Idle for the 'scan' tab.
        // If appState is Camera, Loading, Results, Error within 'scan' view, those are handled above.
        // If somehow in a different state but 'scan' view, default to Idle.
        if(appState === AppState.Idle) { 
            return <IdleHomeScreen onStartScan={handleScanPress} facialTreatmentsData={facialTreatmentsData} />;
        }
        // Fallback: if in 'scan' view but not a recognized state above, reset to idle scan screen.
        resetAppToBaseView('scan'); 
        return <IdleHomeScreen onStartScan={handleScanPress} facialTreatmentsData={facialTreatmentsData} />; 
      default:
        return <IdleHomeScreen onStartScan={handleScanPress} facialTreatmentsData={facialTreatmentsData} />;
    }
  };
  
  
  if (showSplashScreen) {
    return <SplashScreen />;
  }

  if (currentModal === 'terms') {
    return <TermsAndConditionsScreen onClose={() => setCurrentModal(null)} />;
  }
  if (currentModal === 'privacy') {
    return <PrivacyPolicyScreen onClose={() => setCurrentModal(null)} />;
  }
  
  // Show BottomNavBar unless splash screen, camera, or loading for initial scan/upload, or a modal is active
  const showBottomNavBar = !showSplashScreen && 
                         appState !== AppState.Camera &&
                         !(appState === AppState.Loading && activeView === 'scan' && !analysisResult) &&
                         !currentModal;


  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChangeAndAnalyze}
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <main className={`flex-grow ${showBottomNavBar ? 'pb-20 sm:pb-24' : ''}`}>
        {renderMainContent()}
      </main>
      
      {showBottomNavBar && !isNoFaceModalOpen && ( // Also hide nav bar if modal is open
         <BottomNavBar
          activeView={activeView}
          onNavChange={handleNavChange}
          onCameraNavIconPress={handleScanPress} // For the camera icon in nav
          onScanPress={handleFileUploadRequest}  // For the central "Plus" button (upload)
          onAssistantPress={handleAssistantPress}
          isChatbotOpen={isChatbotOpen}
        />
      )}

      {isChatbotOpen && (
        <Chatbot
          isOpen={isChatbotOpen}
          onClose={handleAssistantPress} 
          skinAnalysisData={analysisResult}
        />
      )}
    </div>
  );
};

export default App;