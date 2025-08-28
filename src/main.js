import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// Estilos de slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
createRoot(document.getElementById('root')).render(_jsx(StrictMode, { children: _jsx(App, {}) }));
