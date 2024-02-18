import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from './Components/LayoutArea/Layout/Layout';
import axios from 'axios';
import { authStore } from './Redux/OurStore';

function interceptors() {
  axios.interceptors.request.use(request => {
    if (authStore.getState().token.length > 0) {
      request.headers["Authorization"] = "Bearer " + authStore.getState().token;
    }
    return request;
  });
}

interceptors();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render
(<Layout />);

reportWebVitals();
