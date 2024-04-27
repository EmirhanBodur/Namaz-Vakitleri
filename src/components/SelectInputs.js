import React from 'react';
import Select from 'react-select';

const SelectInput = ({ options, onChange, value, placeholder }) => (
  <Select
    options={options}
    onChange={onChange}
    value={value}
    placeholder={placeholder}
    className="mb-4 text-center"
    styles={{
      control: (provided) => ({
        ...provided,
        backgroundColor: "",
        borderRadius: "8px",
        color: "#4A154B",
        borderColor: 'black'
      }),
    }}
  />
);

export default SelectInput;
