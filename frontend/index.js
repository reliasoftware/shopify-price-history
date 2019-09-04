import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const DOM = document.getElementById('react-app');
ReactDOM.render(<App productId={DOM.dataset.productId} variant={DOM.dataset.variant} />, DOM);
