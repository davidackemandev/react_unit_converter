import React, { useState, useRef, useEffect } from 'react';

import data from './unitconverterdata.json';
import './unitConverter.css';

function App() {
  const [baseValue, setBaseValue] = useState('');
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab'));
  const modes = data.modes;
  useEffect(() => {
    if (!activeTab) {
      localStorage.setItem('activeTab', 0);
    }
  });
  function clickTabHeader(e) {
    const index = e.target.dataset.index;
    setBaseValue('');
    setActiveTab(index);
    localStorage.setItem('activeTab', index);
  }
  function onUnitInputChange(e, factor) {
    const value = e.target.value;
    setBaseValue(value / factor);
  }
  function calcInputValue(factor){
    if(!baseValue){
      return '';
    }
    const value = Math.round((baseValue * factor + Number.EPSILON) * 100) / 100
    return value;
  }
  return (
    <div className='App'>
      <div className='tabBar'>
        {modes.map((mode, index) => {
          console.log(index);
          return (
            <div key={index}>
              <div
                className={`tabHeader ${index == activeTab ? 'active' : ''}`}
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
              <div className='modeForm' key={index}>
                {mode.unitInputs.map((unitInput, index) => {
                  return (
                    <div key={index} className='modeFormUnit'>
                      <label
                        htmlFor={unitInput.label}
                        dangerouslySetInnerHTML={{ __html: unitInput.label }}
                      />
                      <input
                        name={unitInput.label}
                        value={calcInputValue(unitInput.factor)}
                        data-factor={unitInput.factor}
                        onChange={(e) => {
                          onUnitInputChange(e, unitInput.factor);
                        }}
                      />
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
