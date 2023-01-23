import { useEffect, useState } from "react";
import "./Products.css";

const API = "http://localhost:8088";

const compareProductNames = (product1, product2) => {
  // function to sort array of objects based on the property "name"
  if (product1.name < product2.name) {
    return -1;
  } else if (product1.name > product2.name) {
    return 1;
  } else {
    return 0;
  }
};

export const ProductsButton = () => {
  const kandyUser = localStorage.getItem("kandy_user");
  const kandyUserObj = JSON.parse(kandyUser);

  const [products, setProducts] = useState([]);
  const [productsShowing, showProducts] = useState(false);

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((productsArray) => productsArray.sort(compareProductNames))
      .then((sortedProductsArray) => setProducts(sortedProductsArray));
  }, []);

  // need to sort productsArray by product name

  const displayProducts = () => {
    if (productsShowing) {
      return (
        <ul className="product__list">
          {products.map((product) => {
            return (
              <li className="product" key={product.id}>
                {product.name} - ${product.unitPrice}/ea
              </li>
            );
          })}
        </ul>
      );
    }
  };

  if (kandyUserObj.staff) {
    return (
      <li className="navbar__item navbar__products">
        <button
          onClick={() => {
            if (!productsShowing) {
              showProducts(true);
            } else {
              showProducts(false);
            }
          }}
        >
          Products
        </button>
        {displayProducts()}
      </li>
    );
  }
};
