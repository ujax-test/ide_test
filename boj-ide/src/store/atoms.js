import { atom } from 'recoil';

export const navigationState = atom({
  key: 'navigationState',
  default: 'dashboard',
});

export const themeState = atom({
  key: 'themeState',
  default: 'dark',
});

export const sidebarOpenState = atom({
  key: 'sidebarOpenState',
  default: true,
});

// IDE State
export const ideCodeState = atom({
  key: 'ideCodeState',
  default: `// Write your code here
console.log("Hello, World!");`,
});

export const ideLanguageState = atom({
  key: 'ideLanguageState',
  default: 'javascript',
});

export const ideOutputState = atom({
  key: 'ideOutputState',
  default: null,
});

export const ideIsExecutingState = atom({
  key: 'ideIsExecutingState',
  default: false,
});
