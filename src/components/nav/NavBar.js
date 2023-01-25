import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  const kandyUser = localStorage.getItem("kandy_user");
  const kandyUserObj = JSON.parse(kandyUser);

  return (
    <ul className="navbar">
      {/* {LocationsButton()} */}
      <li className="navbar__item navbar__locations">
        <Link className="navbar__link" to="locations" underline="none">
          Locations
        </Link>
      </li>
      {/* display a 'products' link to staff only */}
      {kandyUserObj.staff ? (
        <li className="navbar__item navbar__products">
          <Link className="navbar__link" to="products" underline="none">
            Products
          </Link>
        </li>
      ) : (
        <></>
      )}
      <li className="navbar__item navbar__logout">
        <Link
          className="navbar__link"
          to=""
          onClick={() => {
            localStorage.removeItem("kandy_user");
            navigate("/", { replace: true });
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
