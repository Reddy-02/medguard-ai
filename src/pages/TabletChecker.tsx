import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Volume2, Upload, Scan, CheckCircle, RotateCcw, Search, Loader2, AlertCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

// Language configurations
type Language = {
  code: string;
  name: string;
  voice: string;
};

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', voice: 'en-US' },
  { code: 'es', name: 'Spanish', voice: 'es-ES' },
  { code: 'fr', name: 'French', voice: 'fr-FR' },
  { code: 'de', name: 'German', voice: 'de-DE' },
  { code: 'hi', name: 'Hindi', voice: 'hi-IN' },
  { code: 'zh', name: 'Chinese', voice: 'zh-CN' }
];

// Medication Database
type Medicine = {
  id: number;
  name: string;
  strength: string;
  type: string;
  manufacturer: string;
  treats: string;
  dosage: string;
  precautions: string[];
  sideEffects: string;
  confidence: number;
};

const MEDICINE_DATA: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol',
    strength: '500mg',
    type: 'Analgesic & Antipyretic',
    manufacturer: 'GSK Pharmaceuticals',
    treats: 'Fever, Mild to moderate pain, Headache',
    dosage: 'Adults: 500-1000mg every 4-6 hours. Maximum 4000mg per day.',
    precautions: [
      'Do not exceed recommended dose',
      'Avoid alcohol consumption',
      'Not recommended with other paracetamol-containing products',
      'Consult doctor if symptoms persist'
    ],
    sideEffects: 'Rare: Allergic reactions, liver damage (overdose), skin rash, nausea',
    confidence: 98
  },
  {
    id: 2,
    name: 'Ibuprofen',
    strength: '200mg',
    type: 'NSAID',
    manufacturer: 'Pfizer Inc',
    treats: 'Pain, Inflammation, Fever, Arthritis',
    dosage: 'Adults: 200-400mg every 4-6 hours. Maximum 1200mg per day.',
    precautions: [
      'Take with food or milk',
      'Avoid in third trimester of pregnancy',
      'Monitor for stomach bleeding',
      'Consult doctor for long-term use'
    ],
    sideEffects: 'Stomach upset, heartburn, dizziness, headache, rash',
    confidence: 96
  },
  {
    id: 3,
    name: 'Amoxicillin',
    strength: '500mg',
    type: 'Antibiotic',
    manufacturer: 'Novartis AG',
    treats: 'Bacterial infections, Respiratory infections, UTIs',
    dosage: '250-500mg every 8 hours for 7-14 days',
    precautions: [
      'Complete full course',
      'Take with plenty of water',
      'Report allergic reactions immediately',
      'Avoid if allergic to penicillin'
    ],
    sideEffects: 'Diarrhea, nausea, rash, yeast infections',
    confidence: 97
  },
  {
    id: 4,
    name: 'Atorvastatin',
    strength: '20mg',
    type: 'Statin',
    manufacturer: 'Merck & Co',
    treats: 'High cholesterol, Cardiovascular prevention',
    dosage: '10-80mg once daily in the evening',
    precautions: [
      'Take in evening',
      'Avoid grapefruit juice',
      'Monitor liver enzymes',
      'Report muscle pain'
    ],
    sideEffects: 'Muscle pain, headache, diarrhea, elevated liver enzymes',
    confidence: 95
  },
  {
    id: 5,
    name: 'Metformin',
    strength: '500mg',
    type: 'Biguanide',
    manufacturer: 'Bristol-Myers Squibb',
    treats: 'Type 2 Diabetes',
    dosage: '500-1000mg twice daily with meals',
    precautions: [
      'Take with food',
      'Monitor kidney function',
      'Avoid excessive alcohol',
      'Risk of lactic acidosis'
    ],
    sideEffects: 'GI upset, diarrhea, nausea, vitamin B12 deficiency',
    confidence: 99
  }
];

// Translation system
const TRANSLATIONS = {
  en: {
    tabletVerification: 'Tablet Verification',
    uploadImage: 'Upload an image or enter tablet details for instant AI verification',
    tabletImage: 'Tablet Image',
    clickToUpload: 'Click to upload',
    fileRequirements: 'PNG, JPG up to 10MB',
    tabletImprintName: 'Tablet Imprint/Name',
    placeholder: 'e.g., Paracetamol, Ibuprofen, Amoxicillin',
    selectLanguage: 'Select Language',
    verifyTablet: 'Verify Tablet',
    verifiedAuthentic: 'Verified Authentic',
    verificationSuccess: 'This tablet has been successfully verified',
    medicationInfo: 'Medication Info',
    name: 'Name',
    treats: 'Treats',
    manufacturer: 'Manufacturer',
    dosageInformation: 'Dosage Information',
    precautions: 'Precautions',
    sideEffects: 'Possible Side Effects',
    type: 'Type',
    strength: 'Strength',
    searchPlaceholder: 'Search medicines...',
    noResults: 'No medicine found. Try another name.',
    errorMessage: 'Please enter a medicine name to verify',
    scanningInitial: 'Analyzing tablet imprint...',
    scanningDatabase: 'Checking medical database...',
    scanningVerification: 'Verifying authenticity...',
    scanningFinal: 'Finalizing results...',
    medications: 'Medications',
    accuracy: 'Accuracy',
    languages: 'Languages',
    availability: 'Availability',
    confidenceScore: 'Confidence Score',
    verifyAnother: 'Verify Another Tablet',
    aiPowered: 'AI-Powered Analysis',
    uploadOptional: 'Upload optional (AI can analyze from name)'
  },
  es: {
    tabletVerification: 'Verificación de Tabletas',
    uploadImage: 'Suba una imagen o ingrese detalles de la tableta para verificación instantánea con IA',
    tabletImage: 'Imagen de la Tableta',
    clickToUpload: 'Haga clic para subir',
    fileRequirements: 'PNG, JPG hasta 10MB',
    tabletImprintName: 'Marca/Nombre de la Tableta',
    placeholder: 'ej., Paracetamol, Ibuprofeno, Amoxicilina',
    selectLanguage: 'Seleccionar Idioma',
    verifyTablet: 'Verificar Tableta',
    verifiedAuthentic: 'Verificado Auténtico',
    verificationSuccess: 'Esta tableta ha sido verificada exitosamente',
    medicationInfo: 'Información del Medicamento',
    name: 'Nombre',
    treats: 'Trata',
    manufacturer: 'Fabricante',
    dosageInformation: 'Información de Dosificación',
    precautions: 'Precauciones',
    sideEffects: 'Posibles Efectos Secundarios',
    type: 'Tipo',
    strength: 'Potencia',
    searchPlaceholder: 'Buscar medicamentos...',
    noResults: 'No se encontró el medicamento. Intente con otro nombre.',
    errorMessage: 'Por favor ingrese un nombre de medicamento para verificar',
    scanningInitial: 'Analizando marca de tableta...',
    scanningDatabase: 'Consultando base de datos médica...',
    scanningVerification: 'Verificando autenticidad...',
    scanningFinal: 'Finalizando resultados...',
    medications: 'Medicamentos',
    accuracy: 'Precisión',
    languages: 'Idiomas',
    availability: 'Disponibilidad',
    confidenceScore: 'Puntuación de Confianza',
    verifyAnother: 'Verificar Otra Tableta',
    aiPowered: 'Análisis con IA',
    uploadOptional: 'Subir opcional (IA puede analizar desde el nombre)'
  },
  fr: {
    tabletVerification: 'Vérification des Comprimés',
    uploadImage: 'Téléchargez une image ou entrez les détails du comprimé pour une vérification IA instantanée',
    tabletImage: 'Image du Comprimé',
    clickToUpload: 'Cliquez pour télécharger',
    fileRequirements: 'PNG, JPG jusqu\'à 10MB',
    tabletImprintName: 'Marque/Nom du Comprimé',
    placeholder: 'ex., Paracétamol, Ibuprofène, Amoxicilline',
    selectLanguage: 'Sélectionner la Langue',
    verifyTablet: 'Vérifier le Comprimé',
    verifiedAuthentic: 'Vérifié Authentique',
    verificationSuccess: 'Ce comprimé a été vérifié avec succès',
    medicationInfo: 'Informations sur le Médicament',
    name: 'Nom',
    treats: 'Traite',
    manufacturer: 'Fabricant',
    dosageInformation: 'Informations sur le Dosage',
    precautions: 'Précautions',
    sideEffects: 'Effets Secondaires Possibles',
    type: 'Type',
    strength: 'Puissance',
    searchPlaceholder: 'Rechercher des médicaments...',
    noResults: 'Médicament non trouvé. Essayez un autre nom.',
    errorMessage: 'Veuillez entrer un nom de médicament à vérifier',
    scanningInitial: 'Analyse de la marque du comprimé...',
    scanningDatabase: 'Consultation de la base de données médicale...',
    scanningVerification: 'Vérification de l\'authenticité...',
    scanningFinal: 'Finalisation des résultats...',
    medications: 'Médicaments',
    accuracy: 'Précision',
    languages: 'Langues',
    availability: 'Disponibilité',
    confidenceScore: 'Score de Confiance',
    verifyAnother: 'Vérifier un Autre Comprimé',
    aiPowered: 'Analyse par IA',
    uploadOptional: 'Téléchargement optionnel (IA peut analyser à partir du nom)'
  }
};

const getTranslatedText = (key: string, langCode: string): string => {
  return TRANSLATIONS[langCode as keyof typeof TRANSLATIONS]?.[key as keyof (typeof TRANSLATIONS)['en']] || 
         TRANSLATIONS.en[key as keyof (typeof TRANSLATIONS)['en']] || key;
};

type VerificationStatus = 'idle' | 'scanning' | 'verified';

export default function TabletChecker() {
  const [tabletName, setTabletName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [foundMedicine, setFoundMedicine] = useState<Medicine | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [searchSuggestions, setSearchSuggestions] = useState<Medicine[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { theme } = useTheme();

  // Handle speech synthesis
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage.voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Handle search suggestions
  useEffect(() => {
    if (tabletName.length > 1) {
      const suggestions = MEDICINE_DATA.filter(med =>
        med.name.toLowerCase().includes(tabletName.toLowerCase())
      ).slice(0, 5);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [tabletName]);

  const handleVerifyTablet = () => {
    if (!tabletName.trim()) {
      alert(getTranslatedText('errorMessage', selectedLanguage.code));
      return;
    }

    // Start scanning
    setVerificationStatus('scanning');
    setScanProgress(0);

    // Simulate AI scanning process
    const scanningInterval = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(scanningInterval);
          
          // Find medicine in database
          const searchTerm = tabletName.toLowerCase();
          const found = MEDICINE_DATA.find(med => 
            med.name.toLowerCase().includes(searchTerm)
          );

          if (found) {
            setFoundMedicine(found);
            setTimeout(() => {
              setVerificationStatus('verified');
            }, 500);
          } else {
            alert(getTranslatedText('noResults', selectedLanguage.code));
            setVerificationStatus('idle');
          }
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  const handleReset = () => {
    setVerificationStatus('idle');
    setTabletName('');
    setFoundMedicine(null);
    setUploadedImage(null);
    setScanProgress(0);
    window.speechSynthesis.cancel();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getScanningStatusText = () => {
    const statuses = [
      getTranslatedText('scanningInitial', selectedLanguage.code),
      getTranslatedText('scanningDatabase', selectedLanguage.code),
      getTranslatedText('scanningVerification', selectedLanguage.code),
      getTranslatedText('scanningFinal', selectedLanguage.code)
    ];
    const index = Math.floor((scanProgress / 100) * statuses.length);
    return statuses[Math.min(index, statuses.length - 1)];
  };

  const handleSelectMedicine = (medicine: Medicine) => {
    setTabletName(medicine.name);
    setSearchSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
            {getTranslatedText('tabletVerification', selectedLanguage.code)}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {getTranslatedText('uploadImage', selectedLanguage.code)}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Idle State - Input Card */}
          {verificationStatus === 'idle' && (
            <Card className="glass-card border-2 border-border/50 shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column - Image Upload */}
                  <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      {getTranslatedText('tabletImage', selectedLanguage.code)}
                    </h3>
                    <label className="group block border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5">
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      {uploadedImage ? (
                        <div className="relative">
                          <img
                            src={uploadedImage}
                            alt="Uploaded tablet"
                            className="mx-auto max-h-48 rounded-lg shadow-lg"
                          />
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setUploadedImage(null);
                            }}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                          >
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="mb-5">
                            <Upload className="mx-auto text-muted-foreground group-hover:text-primary transition-colors" size={48} />
                          </div>
                          <div className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                            {getTranslatedText('clickToUpload', selectedLanguage.code)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {getTranslatedText('fileRequirements', selectedLanguage.code)}
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {getTranslatedText('uploadOptional', selectedLanguage.code)}
                          </div>
                        </>
                      )}
                    </label>
                  </div>

                  {/* Right Column - Input Fields */}
                  <div className="space-y-6">
                    {/* Tablet Name Input */}
                    <div className="relative">
                      <label className="font-medium text-foreground block mb-2">
                        {getTranslatedText('tabletImprintName', selectedLanguage.code)}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Search className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <Input
                          type="text"
                          value={tabletName}
                          onChange={(e) => setTabletName(e.target.value)}
                          placeholder={getTranslatedText('placeholder', selectedLanguage.code)}
                          className="pl-10 pr-4 py-6 text-base bg-background border-2 border-border focus:border-primary transition-colors"
                        />
                        {showSuggestions && searchSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-xl max-h-60 overflow-y-auto">
                            {searchSuggestions.map((medicine) => (
                              <div
                                key={medicine.id}
                                onClick={() => handleSelectMedicine(medicine)}
                                className="px-4 py-3 hover:bg-muted/50 cursor-pointer border-b border-border last:border-b-0 transition-colors"
                              >
                                <div className="font-medium text-foreground">{medicine.name} {medicine.strength}</div>
                                <div className="text-sm text-muted-foreground">{medicine.type}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Language Selection */}
                    <div>
                      <label className="font-medium text-foreground block mb-2">
                        {getTranslatedText('selectLanguage', selectedLanguage.code)}
                      </label>
                      <Select
                        value={selectedLanguage.code}
                        onValueChange={(value) => {
                          const lang = LANGUAGES.find(l => l.code === value);
                          if (lang) setSelectedLanguage(lang);
                        }}
                      >
                        <SelectTrigger className="w-full py-6 text-base border-2 border-border focus:border-primary">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.code} value={lang.code}>
                              {lang.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border/50 my-4"></div>

                    {/* Verify Button */}
                    <Button
                      onClick={handleVerifyTablet}
                      size="lg"
                      className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 hover:from-blue-700 hover:via-cyan-700 hover:to-emerald-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg"
                    >
                      <Scan className="mr-2 w-5 h-5" />
                      {getTranslatedText('verifyTablet', selectedLanguage.code)}
                    </Button>

                    {/* AI Powered Badge */}
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 border border-blue-500/20">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {getTranslatedText('aiPowered', selectedLanguage.code)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scanning State */}
          {verificationStatus === 'scanning' && (
            <Card className="glass-card border-2 border-border/50 shadow-2xl">
              <CardContent className="p-8 text-center">
                {/* Scanning Animation */}
                <div className="mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-pulse"></div>
                    {/* Middle Ring */}
                    <div className="absolute inset-4 rounded-full border-4 border-cyan-500/30 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    {/* Inner Ring */}
                    <div className="absolute inset-8 rounded-full border-4 border-emerald-500/40 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    {/* Center */}
                    <div className="absolute inset-12 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <Progress value={scanProgress} className="h-2 bg-muted" />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0%</span>
                    <span>{Math.round(scanProgress)}%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Status Text */}
                <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {getTranslatedText('scanningVerification', selectedLanguage.code)}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {getScanningStatusText()}
                </p>

                {/* Scanning Steps */}
                <div className="grid grid-cols-4 gap-4 mt-8">
                  {['Image Analysis', 'Database Query', 'AI Verification', 'Results Compilation'].map((step, index) => (
                    <div key={step} className="text-center">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        scanProgress > (index * 25) + 12.5 
                          ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {scanProgress > (index * 25) + 12.5 ? '✓' : index + 1}
                      </div>
                      <div className="text-xs text-muted-foreground">{step}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Verified State */}
          {verificationStatus === 'verified' && foundMedicine && (
            <div className="space-y-8">
              {/* Success Banner */}
              <Card className="glass-card border-2 border-emerald-500/30 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 shadow-2xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {getTranslatedText('verifiedAuthentic', selectedLanguage.code)}
                        </h2>
                        <p className="text-muted-foreground">
                          {getTranslatedText('verificationSuccess', selectedLanguage.code)}
                        </p>
                      </div>
                    </div>
                    
                    {/* Confidence Score */}
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">
                        {getTranslatedText('confidenceScore', selectedLanguage.code)}
                      </div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                        {foundMedicine.confidence}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Medication Info Card */}
                <Card className="glass-card border-2 border-border/50 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold text-foreground">
                        {getTranslatedText('medicationInfo', selectedLanguage.code)}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speak(
                          `${getTranslatedText('medicationInfo', selectedLanguage.code)}. ${getTranslatedText('name', selectedLanguage.code)}: ${foundMedicine.name}. ${getTranslatedText('strength', selectedLanguage.code)}: ${foundMedicine.strength}. ${getTranslatedText('treats', selectedLanguage.code)}: ${foundMedicine.treats}. ${getTranslatedText('manufacturer', selectedLanguage.code)}: ${foundMedicine.manufacturer}. ${getTranslatedText('type', selectedLanguage.code)}: ${foundMedicine.type}`
                        )}
                        className="hover:bg-primary/10"
                      >
                        <Volume2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {getTranslatedText('name', selectedLanguage.code)}
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                          {foundMedicine.name} {foundMedicine.strength}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {getTranslatedText('type', selectedLanguage.code)}
                        </div>
                        <div className="text-foreground font-medium">
                          {foundMedicine.type}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {getTranslatedText('treats', selectedLanguage.code)}
                        </div>
                        <div className="text-foreground">
                          {foundMedicine.treats}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          {getTranslatedText('manufacturer', selectedLanguage.code)}
                        </div>
                        <div className="text-foreground">
                          {foundMedicine.manufacturer}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dosage Information Card */}
                <Card className="glass-card border-2 border-border/50 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-bold text-foreground">
                        {getTranslatedText('dosageInformation', selectedLanguage.code)}
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => speak(
                          `${getTranslatedText('dosageInformation', selectedLanguage.code)}. ${foundMedicine.dosage}`
                        )}
                        className="hover:bg-primary/10"
                      >
                        <Volume2 className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      </Button>
                    </div>
                    <p className="text-foreground leading-relaxed mb-4">
                      {foundMedicine.dosage}
                    </p>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-emerald-500/10 border border-blue-500/20">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">Important Note</div>
                          <div className="text-sm text-muted-foreground">
                            Follow dosage instructions carefully. Consult your healthcare provider for personalized advice.
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Precautions Card */}
                <Card className="glass-card border-2 border-border/50 shadow-xl md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-6">
                      {getTranslatedText('precautions', selectedLanguage.code)}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {foundMedicine.precautions.map((precaution, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 mt-2 flex-shrink-0"></div>
                          <span className="text-foreground">{precaution}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Side Effects Card */}
                <Card className="glass-card border-2 border-border/50 shadow-xl md:col-span-2">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      {getTranslatedText('sideEffects', selectedLanguage.code)}
                    </h3>
                    <p className="text-foreground">
                      {foundMedicine.sideEffects}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Reset Button */}
              <div className="text-center pt-6">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 border-2 hover:bg-muted/50 transition-all duration-300"
                >
                  <RotateCcw className="mr-2 w-5 h-5" />
                  {getTranslatedText('verifyAnother', selectedLanguage.code)}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                30+
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslatedText('medications', selectedLanguage.code)}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslatedText('accuracy', selectedLanguage.code)}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
                6
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslatedText('languages', selectedLanguage.code)}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">
                {getTranslatedText('availability', selectedLanguage.code)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
