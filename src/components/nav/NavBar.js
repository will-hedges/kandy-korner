import { Link, useNavigate } from "react-router-dom";
import { LocationsButton } from "../locations/Locations";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      {LocationsButton()}
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
