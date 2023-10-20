import React, { useState } from "react";
import { Select, MenuItem, SelectChangeEvent, Typography } from "@mui/material";

interface LanguageSelectorProps {
  onLanguageChange: (langCode: number) => number;
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
  const [langNumber, setLangNumber] = useState<number>(1);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as string;
    setSelectedLanguage(lang);
    setLangNumber(onLanguageChange(reverseMapping[lang]));
  };

  return (
    <>
      <Select value={selectedLanguage} onChange={handleLanguageChange}>
        <MenuItem value='ja'>Japanese</MenuItem>
        <MenuItem value='en'>English</MenuItem>
      </Select>
      <Typography>LangNumber: {langNumber}</Typography>
    </>
  );
};

export default LanguageSelector;
