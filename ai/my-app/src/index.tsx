// index.tsx (TypeScript file)
import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- Use 'react-dom/client' in React 18+
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // TypeScript type assertion
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
