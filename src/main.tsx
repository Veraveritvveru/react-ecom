import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { FilterProvider } from './components/FilterContext.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <FilterProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </FilterProvider>
);
