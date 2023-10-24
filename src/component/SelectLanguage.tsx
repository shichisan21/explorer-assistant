import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Box,
} from "@mui/material";

interface LanguageSelectorProps {
  onLanguageChange: (langCode: number) => void;
  initialValue: string;
}

interface LanguageMappingType {
  [key: string]: number;
}

const reverseMapping: LanguageMappingType = {
  ja: 1,
  en: 2,
  // fr: 3, // 'fr' を使用しない場合はこちらの行は削除してください。
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageChange,
  initialValue,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(initialValue);

  useEffect(() => {
    setSelectedLanguage(initialValue);
  }, [initialValue]);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    const lang = event.target.value as string;
    setSelectedLanguage(lang);
  };

  const handleSubmit = () => {
    onLanguageChange(reverseMapping[selectedLanguage]);
  };

  return (
    <Box>
      <Box>
        <Select value={selectedLanguage} onChange={handleLanguageChange}>
          <MenuItem value='ja'>Japanese</MenuItem>
          <MenuItem value='en'>English</MenuItem>
        </Select>
      </Box>
      <Box>
        <Button
          fullWidth
          variant='contained'
          onClick={handleSubmit}
          style={{ marginTop: 16 }}
        >
          確定
        </Button>
      </Box>
    </Box>
  );
};

export default LanguageSelector;
