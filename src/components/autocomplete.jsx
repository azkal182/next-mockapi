"use client"
import React, { useState } from 'react';

function Autocomplete({ options, onInputChange }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);

    // Filter options based on the input value
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredOptions(filteredOptions);

    // Pass the input value and filtered options to the parent component
    onInputChange(inputValue, filteredOptions);
  };

const handleSelectOption = (selectedOption) => {
    // Call the onSelect function with the selected option
   // onSelect(selectedOption);
    alert(selectedOption);

    // Clear the input and filtered options when an option is selected
    //setInputValue('');
    //setFilteredOptions([]);
  };
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="col-span-3">
      <input
        type="text"
        placeholder="Type to filter..."
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {isFocused && (
        <ul>
          {filteredOptions.map((option, index) => (
            <li className="bg-slate-200 p-2" key={index}><button onClick={()=>{
            	alert("oke")
            	console.log(option)
            	handleSelectOption(option)
            	
           }}>{option}</button></li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
