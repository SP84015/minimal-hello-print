import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Translation {
  [key: string]: string;
}

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string, fallback?: string) => string;
  translations: Translation;
  loading: boolean;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

interface TranslationProviderProps {
  children: React.ReactNode;
  websiteId?: string;
}

export const TranslationProvider = ({ children, websiteId }: TranslationProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("preferred-language") || "en";
  });
  const [translations, setTranslations] = useState<Translation>({});
  const [loading, setLoading] = useState(true);

  const fetchTranslations = async (languageCode: string) => {
    if (!websiteId) return;
    
    try {
      const { data } = await supabase
        .from("website_translations")
        .select("content_key, content_value")
        .eq("website_id", websiteId)
        .eq("language_code", languageCode);

      if (data) {
        const translationMap: Translation = {};
        data.forEach(item => {
          translationMap[item.content_key] = item.content_value;
        });
        setTranslations(translationMap);
      }
    } catch (error) {
      console.error("Error fetching translations:", error);
    } finally {
      setLoading(false);
    }
  };

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("preferred-language", lang);
    fetchTranslations(lang);
  };

  const t = (key: string, fallback?: string) => {
    return translations[key] || fallback || key;
  };

  useEffect(() => {
    if (websiteId) {
      fetchTranslations(currentLanguage);
    }
  }, [websiteId, currentLanguage]);

  return (
    <TranslationContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        t,
        translations,
        loading,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};