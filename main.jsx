import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'

// Storage polyfill — replaces Claude's window.storage API with localStorage
// This means all your data persists on your device between sessions
window.storage = {
  get: async function(key) {
    try {
      var val = localStorage.getItem(key);
      if (val !== null) return { key: key, value: val };
      throw new Error('Key not found: ' + key);
    } catch(e) {
      throw e;
    }
  },
  set: async function(key, value) {
    try {
      localStorage.setItem(key, String(value));
      return { key: key, value: value };
    } catch(e) {
      console.error('Storage set failed:', e);
      return null;
    }
  },
  delete: async function(key) {
    try {
      localStorage.removeItem(key);
      return { key: key, deleted: true };
    } catch(e) {
      return null;
    }
  },
  list: async function(prefix) {
    try {
      var keys = Object.keys(localStorage).filter(function(k) {
        return !prefix || k.startsWith(prefix);
      });
      return { keys: keys };
    } catch(e) {
      return { keys: [] };
    }
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
