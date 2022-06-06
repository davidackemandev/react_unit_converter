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
  function onClickTabHeader(e) {
    const index = e.target.dataset.index;
    setBaseValue('');
    setActiveTab(index);
    localStorage.setItem('activeTab', index);
  }

  function onUnitInputChange(e, factor, formula) {
    const value = e.target.value;
    if(formula){
      const dataFunction = new Function('num', `return ${formula.from}`)
      if(parseFloat(dataFunction(value)) == parseFloat(baseValue)){
        return;
      }else{
      setBaseValue(dataFunction(value));
      }
    } else {
    setBaseValue(value / factor);}
  }

  function calcInputValue(factor, formula) {
    if(!baseValue){return '';}
    if(formula){
      const dataFunction = new Function('num', `return ${formula.to}`)
      return formatvalue(dataFunction(baseValue));
    }
    const value = formatvalue(baseValue * factor);
    return value;
  }

  function formatvalue(num) {
    if(isNaN(num)){
      return '';
    }
    const value = Math.round(num * 1000) / 1000;
    return parseFloat(value);
  }
  return (
    <div className='App'>
      <div className='tabBar'>
        {modes.map((mode, index) => {
          return (
            <div key={index}>
              <div
                className={`tabHeader ${index == activeTab ? 'active' : ''}`}
                data-index={index}
                onClick={(e) => {
                  onClickTabHeader(e);
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
                      type="number"
                      step="any"
                        name={unitInput.label}
                        value={calcInputValue(unitInput.factor, unitInput.formula)}
                        data-factor={unitInput.factor}
                        onChange={(e) => {
                          onUnitInputChange(e, unitInput.factor, unitInput.formula);
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
