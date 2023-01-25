import { useEffect, useState } from "react";
import "./Locations.css";

const API = "http://localhost:8088";

export const Locations = () => {
  // fetch the list of locations, get an array of location objects
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch(`${API}/locations`)
      .then((res) => res.json())
      .then((locationsArray) => setLocations(locationsArray));
  }, []);

  return (
    <>
      <h2>Visit us at one of our many locations:</h2>
      <ul className="locations__list">
        {locations.map((loc) => {
          const [streetAddress, city, state] = loc.address.split(", ");
          return (
            <div className="location" key={loc.id}>
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
    </>
  );
};
