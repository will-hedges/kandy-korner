import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8088";
export const ProductForm = () => {
  const [productTypes, setProductTypes] = useState([]);
  const [product, update] = useState({
    name: "",
    typeId: 0,
    unitPrice: 0,
  });

  const navigate = useNavigate();

  const localKandyUser = localStorage.getItem("kandy__user");
  const kandyUserObj = JSON.parse(localKandyUser);

  const handleSubmitButtonClick = (e) => {
    e.preventDefault();

    const newProductObj = {
      name: product.name,
      typeId: product.typeId,
      unitPrice: product.unitPrice,
    };

    return fetch(`${API}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductObj),
    }).then((res) => res.json());
    // TODO FIXME want to add route for products
    // .then(() => navigate("/"))
  };

  // fetch all the product types
  fetch(`${API}/productTypes`)
    .then((res) => res.json())
    .then((productTypesArray) => {
      setProductTypes(productTypesArray);
    }, []);

  return (
    <form className="productForm">
      <h2 className="productForm__title">Create New Product</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Candy Name"
            value={product.name}
            onChange={(e) => {
              const copy = { ...product };
              copy.name = e.target.value;
              update(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="product__type">Product Type</label>
          <div>
            <select
              required
              id="product__type"
              onChange={(e) => {
                const copy = { ...product };
                const matchedType = productTypes.find(
                  (pt) => pt.typeName === e.target.value
                );
                copy.typeId = matchedType.id;
                update(copy);
              }}
            >
              <option value="">Select a product type</option>
              {productTypes.map((type) => {
                return <option key={type.id}>{type.typeName}</option>;
              })}
            </select>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="product__unitPrice">Unit Price (ea)</label>
          <input
            required
            type="number"
            className="form-control"
            placeholder="0.00"
            value={product.unitPrice}
            onChange={(e) => {
              const copy = { ...product };
              copy.unitPrice = parseFloat(e.target.value);
              update(copy);
            }}
          ></input>
        </div>
      </fieldset>
      <button className="btn btn-primary">Submit Product</button>
    </form>
  );
};
