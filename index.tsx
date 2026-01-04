
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Digital space sequence started...");

const init = () => {
  try {
    const container = document.getElementById('root');
    if (!container) throw new Error("Root container missing from DOM");

    const root = createRoot(container);
    root.render(<App />);
    
    console.info("Success: UI mounted.");
  } catch (err) {
    console.error("Critical mount failure:", err);
    // 抛出错误以触发 html 中的全局捕获
    throw err;
  }
};

// 确保在各种状态下都能正确触发
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
