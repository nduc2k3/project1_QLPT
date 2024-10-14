import React, { useState } from 'react';
import './Dropdown.css';
const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Select an option');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close dropdown after selection
  };
  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem} <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <li onClick={() => handleItemClick({props.name})}>{props.name}</li>
        <li onClick={() => handleItemClick('Hai Bà Trưng')}>Hai Bà Trưng</li>
        <li onClick={() => handleItemClick('Cầu Giấy')}>Cầu Giấy</li>
        <li onClick={() => handleItemClick('Hồ Tùng Mậu')}>Hồ Tùng Mậu</li>
      </ul>
    </div>
  );
};

export default Dropdown;
