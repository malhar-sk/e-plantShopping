import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity, selectCartItems, selectCartTotal, selectTotalQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotal);
  const totalQuantity = useSelector(selectTotalQuantity);
  const [showComingSoon, setShowComingSoon] = useState(false);

  // Cost of one line in the cart: unit price x quantity.
  const calculateTotalCost = (item) => item.cost * item.quantity;

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Decreasing from 1 removes the plant, so the cart never holds a zero-quantity line.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    setShowComingSoon(true);
  };

  useEffect(() => {
    if (!showComingSoon) return undefined;
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') setShowComingSoon(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [showComingSoon]);

  return (
    <main className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <p className="cart-empty-title">Your cart is empty</p>
          <p>Add a few plants and they will show up here.</p>
          <div className="continue_shopping_btn">
            <button type="button" className="button button-primary" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="total_cart_amount">
            Total Cart Amount: <strong>${totalAmount}</strong>
          </p>

          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.name} className="cart-item">
                <img className="cart-item-image" src={item.image} alt={item.name} width="96" height="96" />

                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-cost">${item.cost} each</p>
                </div>

                <div className="cart-item-quantity" role="group" aria-label={`Quantity of ${item.name}`}>
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    &minus;
                  </button>
                  <span className="cart-item-quantity-value" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  <span className="cart-item-total-label">Total</span>
                  <span className="cart-item-total-value">${calculateTotalCost(item)}</span>
                </p>

                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  aria-label={`Delete ${item.name} from cart`}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1.5 1.5 0 0 0 1.5 1.4h7A1.5 1.5 0 0 0 17 19l1-12M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Delete</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p className="cart-summary-count">
              {totalQuantity} {totalQuantity === 1 ? 'plant' : 'plants'} in your cart
            </p>
            <p className="cart-summary-total">
              Total: <strong>${totalAmount}</strong>
            </p>
          </div>

          <div className="continue_shopping_btn">
            <button type="button" className="button button-secondary" onClick={handleContinueShopping}>
              Continue Shopping
            </button>
            <button type="button" className="button button-primary" onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </>
      )}

      {showComingSoon && (
        <div className="modal-backdrop" onClick={() => setShowComingSoon(false)}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="coming-soon-title">Coming Soon</h2>
            <p>Checkout isn&rsquo;t available yet. Thanks for shopping at Paradise Nursery!</p>
            <button type="button" className="button button-primary" autoFocus onClick={() => setShowComingSoon(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default CartItem;
