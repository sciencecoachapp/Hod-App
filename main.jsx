import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'

var SUPA_URL = 'YOUR_PROJECT_URL_HERE';
var SUPA_KEY = 'YOUR_ANON_KEY_HERE';

var headers = {
  'apikey': SUPA_KEY,
  'Authorization': 'Bearer ' + SUPA_KEY,
  'Content-Type': 'application/json'
};

window.storage = {
  get: async function(key) {
    var r = await fetch(SUPA_URL+'/rest/v1/app_storage?key=eq.'+encodeURIComponent(key)+'&select=value', {headers: headers});
    var d = await r.json();
    if (d && d.length > 0) return { key: key, value: d[0].value };
    throw new Error('Key not found');
  },
  set: async function(key, value) {
    await fetch(SUPA_URL+'/rest/v1/app_storage', {
      method: 'POST',
      headers: Object.assign({}, headers, {'Prefer': 'resolution=merge-duplicates'}),
      body: JSON.stringify({ key: key, value: String(value) })
    });
    return { key: key, value: value };
  },
  delete: async function(key) {
    await fetch(SUPA_URL+'/rest/v1/app_storage?key=eq.'+encodeURIComponent(key), {method:'DELETE', headers: headers});
    return { key: key, deleted: true };
  },
  list: async function(prefix) {
    var url = prefix ? SUPA_URL+'/rest/v1/app_storage?key=like.'+encodeURIComponent(prefix)+'%&select=key' : SUPA_URL+'/rest/v1/app_storage?select=key';
    var r = await fetch(url, {headers: headers});
    var d = await r.json();
    return { keys: Array.isArray(d) ? d.map(function(x){return x.key;}) : [] };
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(App)
)
