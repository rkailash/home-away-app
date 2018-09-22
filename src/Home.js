import React from 'react';
import Search from './Search';
import 'styles/home.scss';

const Home = () => (
  <div className="home">
    <div className="hero-container">
      <div class="padding-container">
        <Search />
      </div>
    </div>
  </div>
);

export default Home;