import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { SearchProvider } from './components/SearchContext';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
