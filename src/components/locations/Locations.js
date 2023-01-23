import { useEffect, useState } from "react";
import "./Locations.css";

const API = "http://localhost:8088";

export const LocationsButton = () => {
  // fetch the list of locations, get an array of location objects
  const [locations, setLocations] = useState([]);
  const [locsShowing, showLocs] = useState(false);

  const displayLocations = () => {
    if (locsShowing) {
      return (
        <ul className="locations__list">
          {locations.map((loc) => {
            const [streetAddress, city, state] = loc.address.split(", ");
            return (
              <div className="location">
                <div className="location__name">Kandy Korner</div>
                <div className="location__address">
                  <div className="location__streetAddress">{streetAddress}</div>
                  <div className="location__cityAndState">
                    {city}, {state}
                  </div>
                </div>
                <div className="location__squareFootage">
                  ({loc.squareFootage} sq ft)
                </div>
              </div>
            );
          })}
        </ul>
      );
    }
  };

  useEffect(() => {
    fetch(`${API}/locations`)
      .then((res) => res.json())
      .then((locationsArray) => setLocations(locationsArray));
  }, []);

  return (
    <li className="navbar__item navbar__locations">
      <button
        onClick={() => {
          if (!locsShowing) {
            showLocs(true);
          } else {
            showLocs(false);
          }
        }}
      >
        Locations
      </button>
      {displayLocations()}
    </li>
  );
};
