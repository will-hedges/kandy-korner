import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Locations } from "../locations/Locations";
import { Products } from "../products/Products";
import { ProductForm } from "../products/ProductForm";
import "./ApplicationViews.css";

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* TODO FIXME why does this only work in-line? */}
            <Link id="header__link" to="/">
              <h1>Kandy Korner</h1>
            </Link>
            <Outlet />
          </>
        }
      >
        <Route path="locations" element={<Locations />} />
        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductForm />} />
      </Route>
    </Routes>
  );
};
