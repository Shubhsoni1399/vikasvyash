import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/style.css';
import { initTranslate, patchDomForTranslate } from './utils/translate';
import { enableProtection } from './utils/protect';

patchDomForTranslate();   // Google Translate + React crash fix
initTranslate();      // Hindi ⇄ English
enableProtection();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
