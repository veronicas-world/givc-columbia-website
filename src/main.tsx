import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initBotId } from 'botid/client/core';
import { App } from './App';
import './styles/global.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element');

if (import.meta.env.PROD) {
  initBotId({
    protect: [{ path: '/api/contact', method: 'POST', advancedOptions: { checkLevel: 'basic' } }],
  });
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
