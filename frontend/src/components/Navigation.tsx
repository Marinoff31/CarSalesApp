// Navigation.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Начална страница</Link>
        </li>
        <li>
          <Link to="/create">Създаване на обява</Link>
        </li>
        <li>
          <Link to="/listings">Обяви</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
