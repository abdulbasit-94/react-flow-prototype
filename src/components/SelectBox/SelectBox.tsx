import React from 'react';
import './style.css';
import CloseSvg from '../../assets/close.svg';

interface SelectBoxProps {
  options: number[]; // Array of options for the dropdown
  selectedValue: number; // Currently selected value
  onChange: (value: number) => void; // Function to call when value changes
  title: string;
  handleDelete: () => void
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  selectedValue,
  onChange,
  handleDelete,
  title
}) => {
  return (
    <div className='select-box-wrapper'>
      {/* handleDelete={() => handleDelete(id)} title="Max Size"  */}
      <div className='select-box-header drag-handle'>
        <label className="select-box-label">{title}:&nbsp;</label>
        <button className='close-btn' onClick={handleDelete}><img src={CloseSvg} alt="cross" /></button>
      </div>
      <div className='select-box-parent drag-handle'>
        <div className='styled-dropdown-box'>
          <select
            className="styled-dropdown"
            value={selectedValue}
            onChange={(e) => onChange(Number(e.target.value))} // Update selected value
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;