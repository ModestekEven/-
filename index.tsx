
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("index.tsx is running...");

const renderApp = () => {
  const container = document.getElementById('root');
  if (!container) {
    console.error("Root container not found!");
    return;
  }

  try {
    const root = createRoot(container);
    // 移除 StrictMode 以排除双重渲染干扰
    root.render(<App />);
    console.log("App rendered successfully.");
  } catch (err) {
    console.error("Failed to render app:", err);
    container.innerHTML = `<div style="color: white; padding: 20px;">Render Error: ${err}</div>`;
  }
};

// 确保 DOM 完全准备好后再挂载
if (document.readyState === 'complete') {
  renderApp();
} else {
  window.addEventListener('load', renderApp);
}
