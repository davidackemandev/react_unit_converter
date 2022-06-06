import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UnitConverter from './UnitConverter';
import reportWebVitals from './reportWebVitals';
import 'remixicon/fonts/remixicon.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <UnitConverter />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
