import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import '../public/index.css';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
