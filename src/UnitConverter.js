import React, { useState, useRef, useEffect } from 'react';

import data from './unitconverterdata.json';
import './unitConverter.css';

function App() {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab'));
  const modes = data.modes;
  useEffect(() => {
    if (!activeTab) {
      localStorage.setItem('activeTab', 0);
    }
  });
  function clickTabHeader(e) {
    const index = e.target.dataset.index;
    console.log(index);
    console.log(activeTab);
    setActiveTab(index);
  }
  return (
    <div className='App'>
      <div className='tabBar'>
        {modes.map((mode, index) => {
          console.log(index);
          return (
            <div key={index}>
              <div
                className='tabHeader'
                data-index={index}
                onClick={(e) => {
                  clickTabHeader(e);
                }}
              >
                {mode.name}
              </div>
            </div>
          );
        })}
      </div>
      <div className='formWrapper'>
        {modes.map((mode, index) => {
          if (index == activeTab) {
            return (
              <div className='modeForm'>
           
                      {mode.unitInputs.map((unitInput, index) => {
                        return (
                         
                            <div key={index} className='modeFormUnit'>
                              <label for={unitInput.label}>
                                {unitInput.label}
                              </label>
                              <input name={unitInput.label} />
                            </div>
                       
                        );
                      })}
            
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
