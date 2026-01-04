
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("🚀 Niu Yuwen Space: Core sequence initialized.");

const init = () => {
  const container = document.getElementById('root');
  if (!container) return;
  
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (document.readyState === 'complete') {
  init();
} else {
  window.addEventListener('load', init);
}
