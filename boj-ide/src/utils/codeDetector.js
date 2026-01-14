export const detectLanguage = (code) => {
  if (!code) return null;

  // C++ 감지
  if (code.includes("#include <") || code.includes("using namespace std;")) {
    return "cpp";
  }
  // Java 감지
  if (code.includes("public class") || code.includes("public static void main")) {
    return "java";
  }
  // Python 감지
  if ((code.includes("def ") && code.includes(":")) || code.includes("import sys")) {
    return "python";
  }
  
  return null;
};