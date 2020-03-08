import React from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
          <li>
              <Link to="/">Homepage</Link>
          </li>
          <li>
              <Link to="/users-page">Users</Link>
          </li>
          <li>
              <Link to="/exercises-page">Exercises</Link>
          </li>
          <li>
              <Link to="/variants-page">Variants</Link>
          </li>
      </ul>
    </nav>
  );
}

export default Sidebar;
