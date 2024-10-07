import React from 'react';
import { IRangeInput } from './type';
import './RangeInput.css';

const RangeInput: React.FC<IRangeInput> = ({ 
  title,
  selectedValue, 
  setSelectedValue, 
  allowedValues, 
  minValue, 
  maxValue, 
  step, 
  handleDelete,
  isDisabled = false
}) => {
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (allowedValues && allowedValues.length > 0) {
      const index = parseInt(event.target.value, 10);
      setSelectedValue(allowedValues[index]);
    } else {
      setSelectedValue(parseInt(event.target.value));
    }
  };

  return (
    <div className="range-container">
      <div className='range-container-header'>
        <label htmlFor="range-slider" className="range-label">{title}:&nbsp;</label>
        <button onClick={handleDelete}>X</button>
      </div>
      
      {allowedValues && allowedValues.length > 0 ? (
        <input
          id="range-slider"
          type="range"
          min="0"
          max={allowedValues.length - 1}
          step="1"
          value={allowedValues.indexOf(selectedValue)}
          onChange={handleChange}
          className="range-slider"
        />
      ) : (
        <input
          id="range-slider"
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={selectedValue}
          onChange={handleChange}
          className="range-slider"
        />
      )}

      <input type='number' className="range-value" onChange={handleChange} value={selectedValue} disabled={isDisabled} />
    </div>
  );
};

export default RangeInput;