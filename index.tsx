
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("System initialization sequence engaged...");

const startApp = () => {
  try {
    const container = document.getElementById('root');
    if (!container) {
      console.error("Critical: #root element missing");
      return;
    }

    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.info("System Ready: UI cluster mounted successfully.");
  } catch (err) {
    console.error("Initialization Failed:", err);
    // 触发全局 onerror
    throw err;
  }
};

// 处理异步加载
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  startApp();
} else {
  document.addEventListener('DOMContentLoaded', startApp);
}
