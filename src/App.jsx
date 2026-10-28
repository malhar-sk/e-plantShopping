import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import logo from './assets/logo.svg';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  if (showProductList) {
    return <ProductList onHomeClick={handleHomeClick} />;
  }

  return (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <div className="landing_content">
          <img className="hero-logo" src={logo} alt="" width="72" height="72" />
          <h1 className="hero-title">
            <span className="hero-welcome">Welcome to</span> Paradise Nursery
          </h1>
          <p className="hero-tagline">Where Green Meets Serenity</p>
          <button type="button" className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>

        <div className="aboutus_container">
          <AboutUs />
        </div>
      </div>
    </div>
  );
}

export default App;
