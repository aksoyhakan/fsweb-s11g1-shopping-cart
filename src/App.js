import React, { useState, useContext } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./components/ProductContext";
import { CartContext } from "./components/CartContext";

function checkLocal() {
  if (window.localStorage.getItem("cards"))
    return JSON.parse(window.localStorage.getItem("cards"));
  else {
    window.localStorage.setItem("cards", JSON.stringify([]));
    return JSON.parse(window.localStorage.getItem("cards"));
  }
}

const initialCart = checkLocal();

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(initialCart);

  const addItem = (item) => {
    if (!cart.find((c) => c.id === item.id)) {
      setCart([...cart, item]);
      window.localStorage.setItem("cards", JSON.stringify([...cart, item]));
    }
  };

  const removeItem = (card) => {
    setCart([...cart.filter((item) => item.id !== card.id)]);
    window.localStorage.setItem(
      "cards",
      JSON.stringify([...cart.filter((item) => item.id !== card.id)])
    );
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, removeItem }}>
        <Navigation />

        {/* Routelar */}
        <ProductContext.Provider value={{ products, addItem }}>
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
