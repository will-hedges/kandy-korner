import { useEffect, useState } from "react";

const API = "http://localhost:8088";

const sortProductNamesByAlpha = (product1, product2) => {
  // function to sort array of objects based on the property "name"
  if (product1.name < product2.name) {
    return -1;
  } else if (product1.name > product2.name) {
    return 1;
  } else {
    return 0;
  }
};

export const Products = () => {
  const [products, setProducts] = useState([]);

  // fetch all products
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((productsArray) => {
        productsArray.sort(sortProductNamesByAlpha);
        setProducts(productsArray);
      });
  }, []);

  return (
    <ul className="products__list">
      {products.map((product) => {
        return (
          <li className="product">
            {product.name} (${product.unitPrice}/ea)
          </li>
        );
      })}
    </ul>
  );
};
