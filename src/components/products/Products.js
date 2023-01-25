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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [topPriced, setTopPriced] = useState(false);

  // fetch all products
  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then((productsArray) => {
        productsArray.sort(sortProductNamesByAlpha);
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      });
  }, []);

  useEffect(() => {
    if (topPriced) {
      const expensiveProducts = products.filter((p) => p.unitPrice > 8);
      setFilteredProducts(expensiveProducts);
    } else {
      setFilteredProducts(products);
    }
    // I HATE THIS WARNING
  }, [topPriced]);

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          if (topPriced) {
            setTopPriced(false);
          } else {
            setTopPriced(true);
          }
        }}
      >
        Top Priced
      </button>
      <ul className="products__list">
        {filteredProducts.map((product) => {
          return (
            <li className="product">
              {/* TODO FIXME want to preserve trailing zeros */}
              {product.name} (${product.unitPrice}/ea)
            </li>
          );
        })}
      </ul>
    </>
  );
};
