import React, { useState, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(props.defaultItem || 'Select an option');



  // Theo dõi sự thay đổi của props.defaultItem và cập nhật selectedItem
  useEffect(() => {
    setSelectedItem(props.defaultItem || 'Select an option');
  }, [props.defaultItem]);

  // Theo dõi sự thay đổi của closeDropdown để đóng menu
  useEffect(() => {
    if (props.closeDropdown) {
      setIsOpen(false);
    }
  }, [props.closeDropdown]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Đóng menu sau khi chọn
    if (props.onItemSelected) {
      props.onItemSelected(item); // Truyền item đã chọn về cho component cha
    }
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem} <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </button>
      <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        {props.items.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
