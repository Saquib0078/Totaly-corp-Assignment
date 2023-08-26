import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store';
const container=document.getElementById('root')
const root=ReactDOMClient.createRoot(container);
root.render

(
<Provider store={store}>
<App/>
</Provider>)


reportWebVitals();
