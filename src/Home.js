import React from "react";
import Search from "./Search";
import RecentActivity from './RecentActivity'
import Header from './Header';
import "styles/home.scss";

const Home = () => (
  <div className="home">
    <div className="hero-container">
      <Header design="gradient" showLogin />
      <h1>Book beach houses, cabins,<br></br>condos and more, worldwide.</h1>
      <Search />
      <ul className="message-container">
        <li>
          <h4>Your whole vacation starts here</h4>
          <small>Choose a rental from the world's best selection.</small>
        </li>
        <li>
          <h4>Book and stay with confidence</h4>
          <small>Secure payments, peace of mind</small>
        </li>
        <li>
          <h4>Your vacation your way</h4>
          <small>More space, more privacy, no compromises</small>
        </li>
      </ul>
    </div>
    <RecentActivity />
  </div>
);

export default Home;
