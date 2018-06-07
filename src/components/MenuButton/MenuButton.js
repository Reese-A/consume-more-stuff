import React from 'react';
import './MenuButton.css';

export const MenuButton = props => {
  const toggleSidebar = event => {
    console.log('test');
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('header');
    const main = document.getElementById('main');

    sidebar.classList.contains('active')
      ? sidebar.classList.remove('active')
      : sidebar.classList.add('active');

    header.classList.contains('menu_shift')
      ? header.classList.remove('menu_shift')
      : header.classList.add('menu_shift');
    main.classList.contains('menu_shift')
      ? main.classList.remove('menu_shift')
      : main.classList.add('menu_shift');
  };
  return (
    <div className="menu_button" id="menu_button" onClick={toggleSidebar}>
      <span className="line" />
      <span className="line" />
      <span className="line" />
    </div>
  );
};

export default MenuButton;
