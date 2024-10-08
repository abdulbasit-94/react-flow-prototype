import React from 'react';
import { IRangeInput } from './type';
import './RangeInput.css';
import CloseSvg from '../../assets/close.svg';

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
      <div className='range-container-header drag-handle'>
        <label htmlFor="range-slider" className="range-label">{title}:&nbsp;</label>
        <button className='close-btn' onClick={handleDelete}><img src={CloseSvg} alt="cross" /></button>
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

      <div className='drag-handle range-input-wrapper'>
        <input type='number' max={maxValue} min={minValue} className="range-value" onChange={handleChange} value={selectedValue} disabled={isDisabled} />
      </div>
    </div>
  );
};

export default RangeInput;