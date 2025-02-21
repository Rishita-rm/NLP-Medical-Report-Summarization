import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    healthEase: "HealthEase",
    home: "Home",
    features: "Features",
    howItWorks: "How It Works",
    doctors: "Doctors",
    healthTips: "Health Tips",
    about: "About",
    login: "Login",
    // Home page translations
    homeHeadline: "Revolutionizing Medical Report Summarization with AI",
    homeSubheadline: "Simplifying healthcare communication for doctors and patients.",
    tryNow: "Try Now",
    learnMore: "Learn More",
    // Blog translations
    healthTipsTitle: "Health Tips & Insights",
    healthTipsSubtitle: "Get actionable health tips and expert insights",
    exploreTips: "Explore More Tips",
    blog1Headline: "Healthy Living Tips",
    blog1Description: "Essential tips for a healthy lifestyle",
  },
  es: {
    healthEase: "HealthEase",
    home: "Inicio",
    features: "Características",
    howItWorks: "Cómo Funciona",
    doctors: "Médicos",
    healthTips: "Consejos de Salud",
    about: "Acerca de",
    login: "Iniciar Sesión",
    // Home page translations
    homeHeadline: "Revolucionando el Resumen de Informes Médicos con IA",
    homeSubheadline: "Simplificando la comunicación sanitaria para médicos y pacientes",
    tryNow: "Prueba Ahora",
    learnMore: "Más Información",
    // Blog translations
    healthTipsTitle: "Consejos de Salud",
    healthTipsSubtitle: "Obtén consejos prácticos y conocimientos de expertos",
    exploreTips: "Explorar Más Consejos",
    blog1Headline: "Consejos para una Vida Saludable",
    blog1Description: "Consejos esenciales para un estilo de vida saludable",
  },
  fr: {
    healthEase: "HealthEase",
    home: "Accueil",
    features: "Fonctionnalités",
    howItWorks: "Comment Ça Marche",
    doctors: "Médecins",
    healthTips: "Conseils Santé",
    about: "À Propos",
    login: "Connexion",
    // Home page translations
    homeHeadline: "Révolutionner la Synthèse des Rapports Médicaux avec l'IA",
    homeSubheadline: "Simplifier la communication médicale pour les médecins et les patients",
    tryNow: "Essayer",
    learnMore: "En Savoir Plus",
    // Blog translations
    healthTipsTitle: "Conseils Santé & Perspectives",
    healthTipsSubtitle: "Obtenez des conseils santé pratiques et des avis d'experts",
    exploreTips: "Explorer Plus de Conseils",
    blog1Headline: "Conseils pour une Vie Saine",
    blog1Description: "Conseils essentiels pour un mode de vie sain",
  },
  hi: {
    healthEase: "हेल्थईज़",
    home: "होम",
    features: "सुविधाएं",
    howItWorks: "कैसे काम करता है",
    doctors: "डॉक्टर्स",
    healthTips: "स्वास्थ्य सुझाव",
    about: "हमारे बारे में",
    login: "लॉगिन",
    homeHeadline: "एआई के साथ मेडिकल रिपोर्ट सारांश में क्रांति",
    homeSubheadline: "डॉक्टरों और मरीजों के लिए स्वास्थ्य संचार को सरल बनाना",
    tryNow: "अभी आज़माएं",
    learnMore: "और जानें",
    healthTipsTitle: "स्वास्थ्य सुझाव और जानकारी",
    healthTipsSubtitle: "व्यावहारिक स्वास्थ्य सुझाव और विशेषज्ञ अंतर्दृष्टि प्राप्त करें",
    exploreTips: "और सुझाव देखें",
    blog1Headline: "स्वस्थ जीवन के सुझाव",
    blog1Description: "स्वस्थ जीवनशैली के लिए आवश्यक सुझाव",
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 