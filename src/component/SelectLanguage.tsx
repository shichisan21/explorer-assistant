import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface LanguageSelectorProps {
  onLanguageChange: (langCode: number) => void;
}

interface LanguageMappingType {
  [key: string]: number;
}

const reverseMapping: LanguageMappingType = {
  ja: 1,
  en: 2,
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ja");

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as string;
    setSelectedLanguage(lang);
    onLanguageChange(reverseMapping[lang]);
  };

  return (
    <Select value={selectedLanguage} onChange={handleLanguageChange}>
      <MenuItem value='ja'>Japanese</MenuItem>
      <MenuItem value='en'>English</MenuItem>
    </Select>
  );
};

export default LanguageSelector;
