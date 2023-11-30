import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AppStateProvider} from './Context/GlobalContex';
import AppRouter from './AppRouter';

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppStateProvider>
      <AppRouter />
    </AppStateProvider>
  </React.StrictMode>
);

