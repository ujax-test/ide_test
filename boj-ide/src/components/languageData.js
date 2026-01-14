export const LANGUAGE_DEFAULTS = {
  java: {
    languageId: 62,
    name: "Java (OpenJDK 13)",
    value: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello Java!");
    }
}`
  },
  python: {
    languageId: 71,
    name: "Python (3.8.1)",
    value: `def solve():
    print("Hello Python!")

if __name__ == "__main__":
    solve()`
  },
  cpp: {
    languageId: 54,
    name: "C++ (GCC 9.2.0)",
    value: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello C++!" << endl;
    return 0;
}`
  }
};