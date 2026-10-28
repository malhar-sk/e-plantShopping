# Paradise Nursery

**Paradise Nursery &mdash; Where Green Meets Serenity.**
A shopping cart application for an online houseplant shop, built with React and Redux Toolkit.

Visitors land on a branded home page, browse 18 houseplants across three categories, add them to a cart,
adjust quantities, remove items, and see live totals. Checkout is a "Coming Soon" placeholder.

## Project details

| | |
|---|---|
| **Project name** | Paradise Nursery Shopping Application |
| **Company** | Paradise Nursery |
| **Tagline** | Where Green Meets Serenity |
| **Stack** | React 19, Redux Toolkit, React-Redux, Vite |

## Features

- **Landing page** with the company name, a full-page background image, a **Get Started** button and an
  *About Us* section.
- **Product listing** with 18 unique houseplants in 3 categories (6 each). Every plant shows a thumbnail,
  name, description and price.
  - Air Purifying Plants
  - Aromatic Fragrant Plants
  - Low-Light Easy Care Plants
- **Add to Cart** buttons that add the plant, **disable once it is in the cart**, and bump the cart count.
  Removing a plant from the cart re-enables its button.
- **Navbar** on both the product and cart pages with **Home**, **Plants** and **Cart** links. The cart icon
  shows the total number of plants in the cart and updates live.
- **Shopping cart page** with, for each plant, a thumbnail, name, unit price, quantity controls (+ / &minus;),
  line total and a delete button. It also shows the **total cart amount**, a **Continue Shopping** button back to
  the product list and a **Checkout** button that shows a "Coming Soon" message.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

Other scripts:

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## How it works

State lives in a single Redux slice (`src/CartSlice.jsx`) holding `items`, each `{ name, image, cost, quantity }`.

| Action | Effect |
|---|---|
| `addItem(plant)` | Adds the plant with quantity 1 (or increments it if already present) |
| `removeItem(name)` | Removes the plant from the cart |
| `updateQuantity({ name, quantity })` | Sets the quantity; a value below 1 removes the plant |

The slice also exports selectors: `selectCartItems`, `selectTotalQuantity` (the navbar badge) and
`selectCartTotal` (the cart total). Components never keep their own copy of cart data, so the navbar badge, the
disabled *Add to Cart* buttons and the cart page always agree.

## Project structure

```
src/
  main.jsx        App entry, wraps <App /> in the Redux <Provider>
  store.js        Redux store (configureStore)
  CartSlice.jsx   Cart slice: addItem, removeItem, updateQuantity + selectors
  App.jsx         Landing page: company name, Get Started button, About Us
  AboutUs.jsx     Company description
  ProductList.jsx Navbar, plant catalogue (3 categories x 6 plants), Add to Cart
  CartItem.jsx    Cart page: quantities, totals, delete, Continue Shopping, Checkout
  App.css         All styles, including the landing page background image
  assets/         Plant thumbnails, logo and landing background (SVG)
```

## Notes

- Plant thumbnails, the logo and the landing background are original SVG illustrations stored in `src/assets`,
  so the app has no external image dependencies.
- The cart lives in memory only; refreshing the page starts a new cart.
