import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { addItem, selectCartItems, selectTotalQuantity } from './CartSlice';
import logo from './assets/logo.svg';

// Thumbnails live in src/assets/plants/<slug>.svg; Vite resolves them to final URLs.
const plantImages = import.meta.glob('./assets/plants/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});
const plantImage = (slug) => plantImages[`./assets/plants/${slug}.svg`];

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      {
        name: 'Snake Plant',
        image: plantImage('snake-plant'),
        description: 'Releases oxygen at night and filters indoor air pollutants.',
        cost: 15,
      },
      {
        name: 'Spider Plant',
        image: plantImage('spider-plant'),
        description: 'Helps remove formaldehyde and xylene from the air.',
        cost: 12,
      },
      {
        name: 'Peace Lily',
        image: plantImage('peace-lily'),
        description: 'Reduces mold spores and brightens a room with white blooms.',
        cost: 18,
      },
      {
        name: 'Boston Fern',
        image: plantImage('boston-fern'),
        description: 'Adds humidity to dry rooms while trapping airborne toxins.',
        cost: 20,
      },
      {
        name: 'Rubber Plant',
        image: plantImage('rubber-plant'),
        description: 'Glossy, bold leaves that are tough and great at cleaning the air.',
        cost: 17,
      },
      {
        name: 'Aloe Vera',
        image: plantImage('aloe-vera'),
        description: 'Purifies the air, and its gel soothes minor burns and skin.',
        cost: 14,
      },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      {
        name: 'Lavender',
        image: plantImage('lavender'),
        description: 'A calming scent loved for relaxation and better sleep.',
        cost: 20,
      },
      {
        name: 'Jasmine',
        image: plantImage('jasmine'),
        description: 'Sweet star-shaped flowers that perfume a whole room.',
        cost: 18,
      },
      {
        name: 'Rosemary',
        image: plantImage('rosemary'),
        description: 'An invigorating, piney aroma - and handy in the kitchen too.',
        cost: 15,
      },
      {
        name: 'Mint',
        image: plantImage('mint'),
        description: 'Fresh, cooling fragrance for teas, drinks and desserts.',
        cost: 12,
      },
      {
        name: 'Lemon Balm',
        image: plantImage('lemon-balm'),
        description: 'A bright lemony scent that lifts the mood and soothes nerves.',
        cost: 14,
      },
      {
        name: 'Gardenia',
        image: plantImage('gardenia'),
        description: 'Creamy white blossoms with a rich, intoxicating perfume.',
        cost: 22,
      },
    ],
  },
  {
    category: 'Low-Light Easy Care Plants',
    plants: [
      {
        name: 'Pothos',
        image: plantImage('pothos'),
        description: 'Trailing vines that grow happily almost anywhere.',
        cost: 10,
      },
      {
        name: 'ZZ Plant',
        image: plantImage('zz-plant'),
        description: 'Shrugs off drought, neglect and dim corners.',
        cost: 25,
      },
      {
        name: 'Cast Iron Plant',
        image: plantImage('cast-iron-plant'),
        description: 'Nearly indestructible - it loves shade and skipped waterings.',
        cost: 19,
      },
      {
        name: 'Chinese Evergreen',
        image: plantImage('chinese-evergreen'),
        description: 'Patterned, blush-veined leaves that brighten low-light rooms.',
        cost: 21,
      },
      {
        name: 'Philodendron',
        image: plantImage('philodendron'),
        description: 'Lush, glossy heart-shaped leaves on easygoing vines.',
        cost: 13,
      },
      {
        name: 'Prayer Plant',
        image: plantImage('prayer-plant'),
        description: 'Striking striped leaves that fold upright at night.',
        cost: 24,
      },
    ],
  },
];

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const [showCart, setShowCart] = useState(false);

  // A plant's button is disabled for as long as it is in the cart, so removing it from the cart re-enables it.
  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  // Each view starts at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showCart]);

  return (
    <div className="shop">
      <nav className="navbar" aria-label="Main">
        <a href="#home" className="navbar-brand" onClick={handleHomeClick}>
          <img src={logo} alt="" width="40" height="40" />
          <span className="navbar-brand-text">
            <span className="navbar-brand-name">Paradise Nursery</span>
            <span className="navbar-brand-tagline">Where Green Meets Serenity</span>
          </span>
        </a>

        <ul className="navbar-links">
          <li>
            <a href="#home" onClick={handleHomeClick}>
              Home
            </a>
          </li>
          <li>
            <a
              href="#plants"
              className={!showCart ? 'active' : ''}
              aria-current={!showCart ? 'page' : undefined}
              onClick={handlePlantsClick}
            >
              Plants
            </a>
          </li>
          <li>
            <a
              href="#cart"
              className={`navbar-cart ${showCart ? 'active' : ''}`}
              aria-current={showCart ? 'page' : undefined}
              aria-label={`Cart, ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`}
              onClick={handleCartClick}
            >
              <svg className="cart-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <path
                  d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.4 8H6.1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="9.5" cy="19.2" r="1.5" fill="currentColor" />
                <circle cx="16.5" cy="19.2" r="1.5" fill="currentColor" />
              </svg>
              <span aria-hidden="true">Cart</span>
              <span className="cart-count" aria-hidden="true">
                {totalQuantity}
              </span>
            </a>
          </li>
        </ul>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main className="product-page">
          <header className="product-page-header">
            <h1>Our Plants</h1>
            <p>Pick the plants that suit your space. Add as many as you like, then head to your cart.</p>
            <ul className="category-chips" aria-label="Jump to a category">
              {plantsArray.map((group) => (
                <li key={group.category}>
                  <a href={`#${slugify(group.category)}`}>{group.category}</a>
                </li>
              ))}
            </ul>
          </header>

          {plantsArray.map((group) => (
            <section key={group.category} id={slugify(group.category)} className="category">
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => {
                  const added = isInCart(plant.name);
                  return (
                    <article key={plant.name} className="product-card">
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                        width="400"
                        height="400"
                        loading="lazy"
                      />
                      <div className="product-body">
                        <h3 className="product-title">{plant.name}</h3>
                        <p className="product-description">{plant.description}</p>
                        <div className="product-footer">
                          <span className="product-price">${plant.cost}</span>
                          <button
                            type="button"
                            className="product-button"
                            onClick={() => handleAddToCart(plant)}
                            disabled={added}
                          >
                            {added ? 'Added to Cart' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
