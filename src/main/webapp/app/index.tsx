import HomePage from '@/home/infrastructure/primary/HomePage';
import { HeroUIProvider } from '@heroui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import './i18n';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <HomePage />
    </HeroUIProvider>
  </React.StrictMode>,
);
