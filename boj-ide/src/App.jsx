import { useState } from 'react';
import Editor from '@monaco-editor/react';
import './App.css';

// 1. 언어별 기본 템플릿과 Judge0 ID 매핑 정보
const LANGUAGE_DEFAULTS = {
  java: {
    languageId: 62,
    value: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}`
  },
  python: {
    languageId: 71,
    value: `print("Hello Python!")`
  },
  cpp: {
    languageId: 54,
    value: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello C++!" << endl;
    return 0;
}`
  }
};

function App() {
  // 2. 상태 관리 (현재 선택된 언어, 작성된 코드)
  const [language, setLanguage] = useState("java");
  const [code, setCode] = useState(LANGUAGE_DEFAULTS["java"].value);

  // 3. 언어 변경 핸들러
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    // 언어를 바꾸면 에디터 내용도 해당 언어의 기본 템플릿으로 리셋
    setCode(LANGUAGE_DEFAULTS[selectedLang].value);
  };

  // 4. 에디터 내용 변경 핸들러
  const handleEditorChange = (value) => {
    setCode(value);
  };

  // 5. 실행 버튼 클릭 핸들러 (나중에 API 연결할 곳)
  const handleRun = () => {
    console.log("=== 실행 요청 데이터 ===");
    console.log("언어:", language);
    console.log("코드:", code);
    alert(`실행 요청!\n언어: ${language}\n코드 길이: ${code.length}자`);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
      
      {/* 상단 헤더 (컨트롤 바) */}
      <header style={{ 
        height: '50px', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 20px', 
        backgroundColor: '#2d2d2d', 
        borderBottom: '1px solid #444',
        color: '#fff'
      }}>
        <h3 style={{ margin: 0, marginRight: '20px' }}>BOJ IDE</h3>
        
        {/* 언어 선택 드롭다운 */}
        <select 
          value={language} 
          onChange={handleLanguageChange}
          style={{ 
            padding: '5px 10px', 
            borderRadius: '4px', 
            border: '1px solid #555',
            backgroundColor: '#3c3c3c',
            color: 'white',
            outline: 'none'
          }}
        >
          <option value="java">Java (OpenJDK 13)</option>
          <option value="python">Python (3.8.1)</option>
          <option value="cpp">C++ (GCC 9.2.0)</option>
        </select>

        {/* 실행 버튼 */}
        <button 
          onClick={handleRun}
          style={{ 
            marginLeft: 'auto', 
            padding: '8px 20px', 
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#007acc',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer' 
          }}
        >
          Run Code ▶
        </button>
      </header>

      {/* 메인 에디터 영역 */}
      <main style={{ flex: 1, position: 'relative' }}>
        <Editor
          height="100%" 
          theme="vs-dark" 
          language={language === 'cpp' ? 'cpp' : language} // Monaco 언어 ID 매칭
          value={code} 
          onChange={handleEditorChange}
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 10 }
          }}
        />
      </main>
    </div>
  );
}

export default App;