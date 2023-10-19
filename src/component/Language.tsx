import React from "react";
import LanguageSelector from "./SelectLanguage"; // あなたのファイル構成に合わせてパスを変更してください。

const Language: React.FC = () => {
  const handleLanguageChange = (langCode: number) => {
    // ここでlangCodeを使用してAPIを呼び出すなどの処理を行います。
    console.log(`Selected Language Code: ${langCode}`);
  };

  return (
    <div>
      <h1>Language Selector App</h1>
      <LanguageSelector onLanguageChange={handleLanguageChange} />
      {/* 必要に応じて他のコンポーネントや要素を追加します */}
    </div>
  );
};

export default Language;
