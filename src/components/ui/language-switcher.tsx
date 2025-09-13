import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
];

export const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage } = useTranslation();
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLang.nativeName}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => setLanguage(language.code)}
            className={currentLanguage === language.code ? "bg-accent" : ""}
          >
            <span className="font-medium">{language.nativeName}</span>
            <span className="ml-2 text-muted-foreground text-sm">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};