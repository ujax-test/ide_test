import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

import { LANGUAGE_DEFAULTS } from '../../constants/languageData.js';
import { detectLanguage } from '../../utils/codeDetector';
import * as S from './IdeStyles';

const IdePage = () => {
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(LANGUAGE_DEFAULTS["java"].value);
  const [detectedMsg, setDetectedMsg] = useState("");

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(LANGUAGE_DEFAULTS[selectedLang].value);
    setDetectedMsg("");
  };

  const handleEditorChange = (value) => {
    setCode(value);
    
    const detected = detectLanguage(value);
    if (detected && detected !== language) {
      setLanguage(detected);
      setDetectedMsg(`언어가 자동으로 '${detected}'로 변경되었습니다.`);
      setTimeout(() => setDetectedMsg(""), 3000);
    }
  };

  const handleRun = () => {
    const currentLangData = LANGUAGE_DEFAULTS[language];
    
    const requestData = {
      source_code: code,
      language_id: currentLangData.languageId,
      stdin: "1 2",
    };

    alert(JSON.stringify(requestData, null, 2));
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>BOJ IDE</S.Title>
        
        <S.Select value={language} onChange={handleLanguageChange}>
          {Object.keys(LANGUAGE_DEFAULTS).map((key) => (
            <option key={key} value={key}>
              {LANGUAGE_DEFAULTS[key].name}
            </option>
          ))}
        </S.Select>

        {detectedMsg && (
          <S.DetectMessage>✨ {detectedMsg}</S.DetectMessage>
        )}

        <S.RunButton onClick={handleRun}>
          Run Code ▶
        </S.RunButton>
      </S.Header>

      <S.EditorWrapper>
        <Editor
          height="100%"
          theme="vs-dark"
          language={language === 'cpp' ? 'cpp' : language}
          value={code}
          onChange={handleEditorChange}
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </S.EditorWrapper>
    </S.Container>
  );
};

export default IdePage;