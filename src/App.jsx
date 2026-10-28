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
      <div className="landing-content">
        <section className="hero">
          <img className="hero-logo" src={logo} alt="" width="72" height="72" />
          <h1 className="hero-title">Paradise Nursery</h1>
          <p className="hero-tagline">Where Green Meets Serenity</p>
          <button type="button" className="get-started-button" onClick={handleGetStartedClick}>
            Get Started
          </button>
        </section>

        <AboutUs />
      </div>
    </div>
  );
}

export default App;
