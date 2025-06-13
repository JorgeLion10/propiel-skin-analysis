

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Language } from '../types';
// Import translations directly for simplicity in this environment
// In a Vite/Webpack setup, you might use dynamic imports or a library like i18next

// Define a recursive structure for your translation files
interface Translations {
  [key: string]: string | Translations;
}

// Manually define translations here or ensure they are loaded/imported correctly
// For the purpose of this example, we'll define some basic keys.
// In a real app, es.json and en.json would be separate files.

const esTranslations: Translations = {
  // Header
  headerTitle: "ProPiel",
  // Language Selector
  language: "Idioma",
  spanish: "Español",
  english: "English",
  languageSelector: {
    toggleLabel: "Cambiar idioma"
  },
  // Splash Screen
  splashTagline: "Descubre la mejor versión de tu piel.",
  // Idle Screen
  idleHomeTitle: "Bienvenido a ProPiel", // Updated welcome title
  appSlogan: "Descubre tu piel. Escanea tu rostro y obtén un análisis personalizado.",
  scanFaceButton: "Escanear Rostro", // Also used by Nav
  progressStep1Label: "Sube foto o usa cámara",
  progressStep2Label: "Escaneo facial",
  progressStep3Label: "Diagnóstico personalizado",
  featuredTreatmentsTitle: "Tratamientos Destacados",
  // Facial Treatment Card
  viewMoreButton: "Ver más",
  facialTreatments: {
    microneedlingVitamins: { name: "Microneedling + Vitaminas (Pack 3 sesiones)" },
    cleansingMicroneedlingVitC: { name: "Limpieza Facial + Microneedling + Vitamina C" },
    lashliftingCleansing: { name: "Lashlifting + Limpieza Facial Profunda" },
  },
  // Camera Capture
  cameraScanFaceButton: "Escanear Rostro",
  cameraCancelButton: "Cancelar",
  cameraInitializing: "Inicializando Cámara...",
  cameraErrorAccess: "No se pudo acceder a la cámara. Asegúrate de conceder permisos y que la cámara esté conectada.",
  cameraErrorNoCamera: "No se encontró ninguna cámara. Asegúrate de que esté conectada y habilitada.",
  cameraErrorPermission: "Permiso de cámara denegado. Por favor, concede permiso en la configuración de tu navegador.",
  cameraErrorInUse: "La cámara ya está en uso o ocurrió un error de hardware.",
  cameraErrorConstraint: "La cámara no admite la configuración solicitada.",
  cameraErrorCapture: "No se pudo capturar la imagen. La cámara podría no estar activa.",
  cameraErrorGeneric: "Error de cámara: {{message}}",
  cameraCloseButton: "Cerrar",
  // Loading Spinner
  loadingAnalysis: "Analizando tu piel...",
  // Error Message (Full screen)
  errorOops: "¡Oops!",
  errorTryAgainButton: "Intentar de Nuevo", // Reused for modal
  errorNoAnalysisData: "No se encontraron datos de análisis.", // This might not be used if results always have some structure
  // Error Modal (No Face Detected)
  error: { 
    fileTooLarge: "El archivo es demasiado grande (máx. {{maxSize}}).",
    fileTypeInvalid: "Tipo de archivo no válido. Sube {{allowedTypes}}.",
    fileReadError: "Error al leer el archivo. Inténtalo de nuevo.",
    apiKeyInvalid: "La clave API no es válida o ha caducado. Por favor, verifica tu configuración.",
    jsonParse: "Error al procesar la respuesta del análisis. Detalles: {{message}}",
    analysisFailed: "El análisis de piel falló. Detalles: {{message}}",
    unknown: "Ocurrió un error inesperado.",
    noFaceDetectedInUpload: "Sube una foto del rostro para realizar el análisis.", // Message for modal
    noFaceModalTitle: "Rostro no Detectado",
    noFaceModalInfoText: "Asegúrate de que la imagen incluya el rostro completo y esté bien iluminada.",
    noFaceModalCloseButton: "Cerrar",
  },
  // Analysis Display
  analysisResultsTitle: "Resultados de tu Análisis de Piel",
  analysisGeneralImpressionDefault: "Aquí tienes un resumen de tu análisis de piel.",
  analysisSectionCharacteristics: "Características de la Piel",
  analysisSectionRoutine: "Rutina Diaria de Cuidado",
  analysisSectionProducts: "Recomendaciones de Productos",
  analysisSectionWellness: "Consejos de Bienestar",
  analysisScanAgainButton: "Escanear de Nuevo",
  analysisReturnHomeButton: "Volver al Inicio",
  analysisDisclaimer: "Descargo de responsabilidad: Este análisis es generado por IA y es solo para fines informativos. Consulta a un dermatólogo para obtener asesoramiento profesional.",
  analysisNoCharacteristics: "No se identificaron características específicas.",
  analysisNoRoutine: "No hay información de rutina disponible.",
  analysisNoProducts: "No hay recomendaciones de productos disponibles en este momento.",
  analysisNoWellnessTips: "No hay consejos de bienestar disponibles actualmente.",
  analysisDownloadPdfButton: "Descargar diagnóstico (PDF)",
  // PDF specific
  pdfReportTitle: "Reporte de Análisis de Piel",
  pdfGeneratedDate: "Generado el: {{date}}",
  pdfScoreLabel: "Puntuación",
  Type: "Tipo",
  Reason: "Razón",
  pdfSuccessMessage: "¡PDF descargado con éxito!",
  pdfErrorMessage: "Error al generar PDF. Inténtalo de nuevo.",
  pdfDisclaimerTitle: "Descargo de Responsabilidad",
  // Skincare Routine Section
  routineMorning: "Rutina de Mañana",
  routineEvening: "Rutina de Noche",
  routineNoSteps: "No hay pasos definidos para {{time}}.",
  // Chatbot
  chatbotTitle: "ProPiel Chatbot", 
  chatbotInitialGreeting: "¡Hola! Soy ProPiel Chatbot. ¿En qué puedo ayudarte hoy con tu piel? ✨ Sube una foto si quieres que analice algo específico.",
  chatbotTyping: "Escribiendo...",
  chatbotSuggestions: "Sugerencias:",
  chatbotInputPlaceholder: "Escribe tu mensaje o sube una foto...",
  chatbotSendButtonLabel: "Enviar mensaje",
  chatbotMicButtonLabel: "Usar micrófono",
  chatbotStopListeningButtonLabel: "Detener escucha",
  chatbotCloseButtonLabel: "Cerrar chat",
  chatbotAttachImageButtonLabel: "Adjuntar imagen",
  chatbotRemoveImageLabel: "Quitar imagen",
  chatbotErrorGeneral: "Lo siento, no pude procesar tu solicitud en este momento. Por favor, intenta de nuevo. 😕",
  chatbotErrorSpeechNoSound: "No se detectó voz. Intenta de nuevo.",
  chatbotErrorSpeechAudioCapture: "No se pudo capturar audio. Revisa tu micrófono.",
  chatbotErrorSpeechNotAllowed: "Permiso de micrófono denegado.",
  chatbotErrorMicPermission: "Se necesita permiso para el micrófono para usar la entrada de voz.",
  chatbotErrorMicPermissionDenied: "Permiso de micrófono denegado. Habilítalo en la configuración de tu navegador.",
  chatbotErrorMicNotFound: "No se encontró un micrófono. Asegúrate de que esté conectado y habilitado.",
  chatbotErrorUnsupported: "El reconocimiento de voz no es compatible con tu navegador.",
  chatbotErrorFileTypeUnsupported: "Tipo de archivo no admitido. Sube JPG, PNG, WebP o HEIC.",
  chatbotErrorFileSizeExceeded: "Imagen demasiado grande (máx. {{size}}).",
  chatbotErrorFileRead: "No se pudo leer la imagen seleccionada. Intenta con otra.",
  chatbotQuickReply1: "¿Qué producto me recomiendas?",
  chatbotQuickReply2: "Tengo un brote, ¿qué hago?",
  chatbotQuickReply3: "Consejos de hidratación",
  chatbotQuickReply4: "Mejorar textura piel",
  // Gemini Prompts
  geminiSystemInstruction: `Eres "ProPiel Chatbot", un amigable y experto asistente virtual especializado en el cuidado de la piel. Tu objetivo es ayudar a los usuarios con sus dudas sobre productos de belleza, rutinas diarias, problemas como brotes de acné, y consejos para hábitos saludables. Comunícate exclusivamente en español. Sé conciso (1-3 frases). Usa emojis ✨😊💧🍎💡.
Si el usuario envía una imagen junto con su pregunta (o solo una imagen), ANALIZA DETALLADAMENTE la imagen y úsala como CONTEXTO PRINCIPAL para tu respuesta. Describe lo que ves en la imagen si es relevante para la pregunta o para dar una recomendación.
Si se da un perfil de piel previo (generalImpression, characteristics), úsalo como contexto adicional, pero prioriza la imagen recién enviada si existe. NO listes el perfil de piel previo textualmente.
No des consejos médicos específicos; sugiere consultar a un dermatólogo para diagnósticos o tratamientos.
Saludo inicial: preséntate. Si el usuario dice "Contexto de mi piel:", usa esa info.`,
  geminiDetectFacePrompt: `Analiza la imagen proporcionada. Determina si se puede ver claramente un rostro humano completo o la mayor parte de un rostro humano, adecuado para un análisis de piel. Responde ÚNICAMENTE con un objeto JSON válido con una sola clave "faceDetected" cuyo valor sea booleano (true o false). Ejemplo: {"faceDetected": true}`,
  geminiAnalyzeSkinPrompt: `IMPORTANTE: Tu respuesta DEBE ser un único objeto JSON válido. No incluyas ningún texto, comentario o formato markdown (como \`\`\`json ... \`\`\`) fuera del objeto JSON en sí. Adhiérete estrictamente a las reglas de sintaxis JSON.

REGLA DE ORO PARA JSON VÁLIDO: Las comillas dobles (") DENTRO de CUALQUIER valor de cadena DEBEN SER ESCRITAS ASÍ: \\". Por ejemplo, si un producto se llama 'Crema "Milagrosa"', en JSON debe ser "name": "Crema \\"Milagrosa\\"". NUNCA uses "name": "Crema "Milagrosa"". ESTO ES VITAL. Aplica a TODOS los campos de texto: 'generalImpression', 'description' (en características y rutina), 'productType', 'name' (de producto), 'reason', 'tip'. Un JSON inválido por comillas mal escapadas hará que el análisis falle catastróficamente.

Analiza la imagen proporcionada de un rostro humano para determinar su condición específica de piel. Basándote *únicamente* en la información visual de esta imagen, genera un análisis de piel personalizado. Todo el contenido textual en el JSON (generalImpression, descriptions, reasons, tips) DEBE estar en español.
Recuerda: ¡ESCAPAR COMILLAS INTERNAS (\\") ES OBLIGATORIO PARA UN JSON VÁLIDO!
Devuelve un objeto JSON con la siguiente estructura exacta y estilo de contenido de ejemplo:
{
  "generalImpression": "Ejemplo: Piel mixta, leve brillo en zona T.",
  "characteristics": [
    { "name": "Hydration", "nameKey": "skinCharacteristics.hydration", "score": 75, "description": "Ejemplo: Hidratación adecuada.", "icon": "hydration" },
    { "name": "Oiliness", "nameKey": "skinCharacteristics.oiliness", "score": 60, "description": "Ejemplo: Brillo leve en frente.", "icon": "oiliness" },
    { "name": "Pores Appearance", "nameKey": "skinCharacteristics.pores", "score": 70, "description": "Ejemplo: Poros poco visibles.", "icon": "pores" },
    { "name": "Redness/Irritation", "nameKey": "skinCharacteristics.redness", "score": 50, "description": "Ejemplo: Leve rojez nasal.", "icon": "redness" },
    { "name": "Texture/Smoothness", "nameKey": "skinCharacteristics.texture", "score": 80, "description": "Ejemplo: Textura suave.", "icon": "texture" },
    { "name": "Dark Spots/Pigmentation", "nameKey": "skinCharacteristics.dark_spots", "score": 65, "description": "Ejemplo: Manchas tenues.", "icon": "dark_spots" }
  ],
  "routine": [
    { "time": "Morning", "step": 1, "description": "Ejemplo: Limpiar rostro.", "productType": "Limpiador Suave" },
    { "time": "Morning", "step": 2, "description": "Ejemplo: Aplicar sérum C.", "productType": "Sérum Vitamina C" },
    { "time": "Evening", "step": 1, "description": "Ejemplo: Desmaquillar y limpiar.", "productType": "Desmaquillante" }
  ],
  "products": [
    { "name": "Ejemplo Limpiador", "type": "Limpiador", "reason": "Ejemplo: Limpia sin resecar." },
    { "name": "Ejemplo Sérum", "type": "Sérum", "reason": "Ejemplo: Protege y da brillo." }
  ],
  "wellnessTips": [
    { "category": "Hydration", "categoryKey": "wellnessCategories.hydration", "tip": "Ejemplo: Beber suficiente agua.", "icon": "hydration" },
    { "category": "Nutrition", "categoryKey": "wellnessCategories.nutrition", "tip": "Ejemplo: Comer más antioxidantes.", "icon": "nutrition" }
  ]
}
Instrucciones adicionales:
- 'name' para las características debe ser la palabra clave en inglés para el mapeo de iconos. Usa 'nameKey' para el nombre traducible de la característica.
- 'category' para los consejos de bienestar debe ser la palabra clave en inglés para el mapeo de iconos. Usa 'categoryKey' para el nombre traducible de la categoría.
- Todas las puntuaciones DEBEN ser números del 0 al 100. Descripciones, razones, consejos derivados de la imagen.
- Nombres de productos: tipos genéricos.
- Campos 'icon': usa palabras clave: "hydration", "oiliness", "pores", "redness", "texture", "dark_spots", "nutrition", "habit", "general".
- Adapta el número de elementos si es necesario, pero proporciona una rutina completa de mañana/noche, 2-3 productos, 2-3 consejos. Sé conciso.
- Una vez más, la REGLA DE ORO sobre escapar comillas dobles internas (\\") en todos los valores de cadena es fundamental.
`,
  skinCharacteristics: {
    hydration: "Hidratación",
    oiliness: "Oleosidad",
    pores: "Apariencia de Poros",
    redness: "Enrojecimiento/Irritación",
    texture: "Textura/Suavidad",
    dark_spots: "Manchas Oscuras/Pigmentación",
  },
  wellnessCategories: {
    hydration: "Hidratación",
    nutrition: "Nutrición",
    habit: "Hábito",
    general: "General",
  },
  // Bottom Navigation
  navHome: "Inicio",
  navScan: "Escanear", // Label for camera scan tab
  navUploadImage: "Subir Imagen", // Label for central upload button
  navAssistant: "Chatbot", 
  navOptions: "Opciones",
  // Options Screen
  optionsTitle: "Configuración",
  optionsGroupPreferences: "Preferencias",
  optionsGroupLegal: "Legal",
  themeToggle: "Modo Oscuro/Claro",
  optionsTermsAndConditions: "Términos y Condiciones",
  optionsPrivacyPolicy: "Políticas de Privacidad",
  termsScreenTitle: "Términos y Condiciones", 
  privacyScreenTitle: "Política de Privacidad",
  termsBackButtonLabel: "Volver",
};

const enTranslations: Translations = {
  // Header
  headerTitle: "ProPiel",
  // Language Selector
  language: "Language",
  spanish: "Español",
  english: "English",
  languageSelector: {
    toggleLabel: "Change language"
  },
  // Splash Screen
  splashTagline: "Discover the best version of your skin.",
  // Idle Screen
  idleHomeTitle: "Welcome to ProPiel", // Updated welcome title
  appSlogan: "Discover your skin. Scan your face and get a personalized analysis.",
  scanFaceButton: "Scan Face", 
  progressStep1Label: "Upload photo or use camera",
  progressStep2Label: "Facial Scan",
  progressStep3Label: "Personalized Diagnosis",
  featuredTreatmentsTitle: "Featured Treatments",
  // Facial Treatment Card
  viewMoreButton: "View More",
  facialTreatments: {
    microneedlingVitamins: { name: "Microneedling + Vitamins (3 Sessions)" },
    cleansingMicroneedlingVitC: { name: "Facial Cleansing + Microneedling + Vitamin C" },
    lashliftingCleansing: { name: "Lashlifting + Deep Facial Cleansing" },
  },
  // Camera Capture
  cameraScanFaceButton: "Scan Face",
  cameraCancelButton: "Cancel",
  cameraInitializing: "Initializing Camera...",
  cameraErrorAccess: "Could not access camera. Please ensure permissions are granted and a camera is connected.",
  cameraErrorNoCamera: "No camera found. Please ensure a camera is connected and enabled.",
  cameraErrorPermission: "Camera access denied. Please grant camera permission in your browser settings.",
  cameraErrorInUse: "Camera is already in use or a hardware error occurred.",
  cameraErrorConstraint: "The camera does not support the requested settings.",
  cameraErrorCapture: "Could not capture image. Camera might not be active.",
  cameraErrorGeneric: "Camera error: {{message}}",
  cameraCloseButton: "Close",
  // Loading Spinner
  loadingAnalysis: "Analyzing your skin...",
  // Error Message (Full screen)
  errorOops: "Oops!",
  errorTryAgainButton: "Try Again", // Reused for modal
  errorNoAnalysisData: "No analysis data found.", // This might not be used
  // Error Modal (No Face Detected)
  error: { 
    fileTooLarge: "File is too large (max {{maxSize}}).",
    fileTypeInvalid: "Invalid file type. Please upload {{allowedTypes}}.",
    fileReadError: "Error reading file. Please try again.",
    apiKeyInvalid: "The API key is invalid or has expired. Please check your configuration.",
    jsonParse: "Error processing the analysis response. Details: {{message}}",
    analysisFailed: "Skin analysis failed. Details: {{message}}",
    unknown: "An unexpected error occurred.",
    noFaceDetectedInUpload: "Please upload a face photo for analysis.", // Message for modal
    noFaceModalTitle: "Face Not Detected",
    noFaceModalInfoText: "Ensure the image includes the full face and is well-lit.",
    noFaceModalCloseButton: "Close",
  },
  // Analysis Display
  analysisResultsTitle: "Your Skin Analysis Results",
  analysisGeneralImpressionDefault: "Here's a summary of your skin analysis.",
  analysisSectionCharacteristics: "Skin Characteristics",
  analysisSectionRoutine: "Daily Skincare Routine",
  analysisSectionProducts: "Product Recommendations",
  analysisSectionWellness: "Wellness Tips",
  analysisScanAgainButton: "Scan Again",
  analysisReturnHomeButton: "Return to Home",
  analysisDisclaimer: "Disclaimer: This analysis is AI-generated and for informational purposes only. Consult a dermatologist for professional advice.",
  analysisNoCharacteristics: "No specific characteristics identified.",
  analysisNoRoutine: "No routine information available.",
  analysisNoProducts: "No product recommendations available at this time.",
  analysisNoWellnessTips: "No wellness tips available currently.",
  analysisDownloadPdfButton: "Download diagnosis (PDF)",
  // PDF specific
  pdfReportTitle: "Skin Analysis Report",
  pdfGeneratedDate: "Generated on: {{date}}",
  pdfScoreLabel: "Score",
  Type: "Type",
  Reason: "Reason",
  pdfSuccessMessage: "PDF downloaded successfully!",
  pdfErrorMessage: "Failed to generate PDF. Please try again.",
  pdfDisclaimerTitle: "Disclaimer",
  // Skincare Routine Section
  routineMorning: "Morning Routine",
  routineEvening: "Evening Routine",
  routineNoSteps: "No steps defined for {{time}}.",
  // Chatbot
  chatbotTitle: "ProPiel Chatbot", 
  chatbotInitialGreeting: "Hi! I'm ProPiel Chatbot. How can I help you with your skin today? ✨ Upload a photo if you want me to analyze something specific.",
  chatbotTyping: "Typing...",
  chatbotSuggestions: "Suggestions:",
  chatbotInputPlaceholder: "Type your message or upload a photo...",
  chatbotSendButtonLabel: "Send message",
  chatbotMicButtonLabel: "Use microphone",
  chatbotStopListeningButtonLabel: "Stop listening",
  chatbotCloseButtonLabel: "Close chat",
  chatbotAttachImageButtonLabel: "Attach image",
  chatbotRemoveImageLabel: "Remove image",
  chatbotErrorGeneral: "Sorry, I couldn't process your request right now. Please try again. 😕",
  chatbotErrorSpeechNoSound: "No speech detected. Try again.",
  chatbotErrorSpeechAudioCapture: "Could not capture audio. Check your microphone.",
  chatbotErrorSpeechNotAllowed: "Microphone permission denied.",
  chatbotErrorMicPermission: "Microphone permission is needed to use voice input.",
  chatbotErrorMicPermissionDenied: "Microphone permission denied. Enable it in your browser settings.",
  chatbotErrorMicNotFound: "No microphone found. Ensure it's connected and enabled.",
  chatbotErrorUnsupported: "Speech recognition is not supported in your browser.",
  chatbotErrorFileTypeUnsupported: "File type not supported. Please upload JPG, PNG, WebP, or HEIC.",
  chatbotErrorFileSizeExceeded: "Image too large (max {{size}}).",
  chatbotErrorFileRead: "Could not read the selected image. Try another one.",
  chatbotQuickReply1: "Recommend a product?",
  chatbotQuickReply2: "I have a breakout, what to do?",
  chatbotQuickReply3: "Hydration tips",
  chatbotQuickReply4: "Improve skin texture",
  // Gemini Prompts
  geminiSystemInstruction: `You are "ProPiel Chatbot", a friendly and expert virtual assistant specializing in skincare. Your goal is to help users with questions about beauty products, daily routines, issues like acne breakouts, and tips for healthy habits. Communicate exclusively in English. Be concise (1-3 sentences). Use emojis ✨😊💧🍎💡.
If the user sends an image along with their question (or just an image), ANALYZE the image IN DETAIL and use it as the PRIMARY CONTEXT for your response. Describe what you see in the image if it's relevant to the question or for giving a recommendation.
If a prior skin profile (generalImpression, characteristics) is available, use it as additional context, but prioritize the newly sent image if one exists. DO NOT list the prior skin profile textually.
Do not give specific medical advice; suggest consulting a dermatologist for diagnoses or treatments.
Initial greeting: introduce yourself. If the user says "My skin context:", use that info.`,
  geminiDetectFacePrompt: `Analyze the provided image. Determine if a clear, complete, or mostly complete human face, suitable for skin analysis, is visible. Respond ONLY with a valid JSON object with a single key "faceDetected" whose value is boolean (true or false). Example: {"faceDetected": true}`,
  geminiAnalyzeSkinPrompt: `IMPORTANT: Your response MUST be a single, valid JSON object. Do not include any text, comments, or markdown formatting (like \`\`\`json ... \`\`\`) outside of the JSON object itself. Adhere strictly to JSON syntax rules.

GOLDEN RULE FOR VALID JSON: Double quotes (") INSIDE ANY string value MUST BE WRITTEN AS: \\". For example, if a product is named 'Miracle "Cream"', in JSON it must be "name": "Miracle \\"Cream\\"". NEVER use "name": "Miracle "Cream"". THIS IS VITAL. This applies to ALL text fields: 'generalImpression', 'description' (in characteristics and routine), 'productType', 'name' (of product), 'reason', 'tip'. Invalid JSON due to improperly escaped quotes will cause the analysis to fail catastrophically.

Analyze the provided image of a human face for its specific skin condition. Based *solely* on the visual information in this image, generate a personalized skin analysis. All textual content in the JSON (generalImpression, descriptions, reasons, tips) MUST be in English.
Remember: ESCAPING INTERNAL QUOTES (\\") IS MANDATORY FOR VALID JSON!
Return a JSON object with the exact following structure and example content style:
{
  "generalImpression": "Example: Combination skin, slight T-zone shine.",
  "characteristics": [
    { "name": "Hydration", "nameKey": "skinCharacteristics.hydration", "score": 75, "description": "Example: Adequate hydration.", "icon": "hydration" },
    { "name": "Oiliness", "nameKey": "skinCharacteristics.oiliness", "score": 60, "description": "Example: Slight forehead shine.", "icon": "oiliness" },
    { "name": "Pores Appearance", "nameKey": "skinCharacteristics.pores", "score": 70, "description": "Example: Pores minimally visible.", "icon": "pores" },
    { "name": "Redness/Irritation", "nameKey": "skinCharacteristics.redness", "score": 50, "description": "Example: Minor nose redness.", "icon": "redness" },
    { "name": "Texture/Smoothness", "nameKey": "skinCharacteristics.texture", "score": 80, "description": "Example: Smooth texture.", "icon": "texture" },
    { "name": "Dark Spots/Pigmentation", "nameKey": "skinCharacteristics.dark_spots", "score": 65, "description": "Example: Faint dark spots.", "icon": "dark_spots" }
  ],
  "routine": [
    { "time": "Morning", "step": 1, "description": "Example: Cleanse face.", "productType": "Gentle Cleanser" },
    { "time": "Morning", "step": 2, "description": "Example: Apply C serum.", "productType": "Vitamin C Serum" },
    { "time": "Evening", "step": 1, "description": "Example: Remove makeup & cleanse.", "productType": "Makeup Remover" }
  ],
  "products": [
    { "name": "Example Cleanser", "type": "Cleanser", "reason": "Example: Cleanses gently." },
    { "name": "Example Serum", "type": "Serum", "reason": "Example: Protects and brightens." }
  ],
  "wellnessTips": [
    { "category": "Hydration", "categoryKey": "wellnessCategories.hydration", "tip": "Example: Drink enough water.", "icon": "hydration" },
    { "category": "Nutrition", "categoryKey": "wellnessCategories.nutrition", "tip": "Example: Eat more antioxidants.", "icon": "nutrition" }
  ]
}
Further instructions:
- 'name' for characteristics should be the English keyword for icon mapping. Use 'nameKey' for the translatable characteristic name.
- 'category' for wellness tips should be the English keyword for icon mapping. Use 'categoryKey' for the translatable category name.
- All scores MUST be numbers 0-100. Descriptions, reasons, tips derived from image.
- Product names: generic types.
- 'icon' fields: use keywords: "hydration", "oiliness", "pores", "redness", "texture", "dark_spots", "nutrition", "habit", "general".
- Adapt number of items if needed, but provide full morning/evening routine, 2-3 products, 2-3 tips. Be concise.
- Once more, the GOLDEN RULE about escaping internal double quotes (\\") in all string values is paramount.
`,
  skinCharacteristics: {
    hydration: "Hydration",
    oiliness: "Oiliness",
    pores: "Pores Appearance",
    redness: "Redness/Irritation",
    texture: "Texture/Smoothness",
    dark_spots: "Dark Spots/Pigmentation",
  },
  wellnessCategories: {
    hydration: "Hydration",
    nutrition: "Nutrition",
    habit: "Habit",
    general: "General",
  },
  // Bottom Navigation
  navHome: "Home",
  navScan: "Scan", 
  navUploadImage: "Upload Image", 
  navAssistant: "Chatbot", 
  navOptions: "Options",
  // Options Screen
  optionsTitle: "Settings",
  optionsGroupPreferences: "Preferences",
  optionsGroupLegal: "Legal",
  themeToggle: "Dark/Light Mode",
  optionsTermsAndConditions: "Terms and Conditions",
  optionsPrivacyPolicy: "Privacy Policy",
  termsScreenTitle: "Terms and Conditions", 
  privacyScreenTitle: "Privacy Policy",
  termsBackButtonLabel: "Back",
};


const messages: { [key in Language]: Translations } = {
  es: esTranslations,
  en: enTranslations,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const storedLang = typeof window !== 'undefined' ? localStorage.getItem('appLanguage') as Language | null : null;
    return storedLang || 'es'; // Default to Spanish
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appLanguage', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let currentLevel: string | Translations = messages[language];
    
    for (const k of keys) {
      if (typeof currentLevel === 'object' && currentLevel !== null && k in currentLevel) {
        currentLevel = currentLevel[k];
      } else {
        // Fallback chain: current lang -> english -> key itself
        currentLevel = messages['en']; // Try English
        for (const k_fb of keys) {
            if (typeof currentLevel === 'object' && currentLevel !== null && k_fb in currentLevel) {
                currentLevel = currentLevel[k_fb];
            } else {
                console.warn(`Translation key "${key}" not found in "${language}" or fallback "en".`);
                return key; // Key not found in current or English
            }
        }
        break; 
      }
    }

    let translation = typeof currentLevel === 'string' ? currentLevel : key;

    if (params && typeof currentLevel === 'string') { // Ensure translation is a string before replacing params
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(params[paramKey]));
      });
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
