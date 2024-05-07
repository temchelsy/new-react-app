import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mealitem from "../Components/MealItem";

export default function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);
  console.log(favorites);

  const goBack = () => {
    navigate("/Home", { replace: true });
  };

  return (
    <div className="fav">
      <h2>My Favorite Page</h2>

      <div className="fav-container">
        <div className="fav-img">
        {favorites.length > 0 ? (
          favorites.map((favorite) => <Mealitem data={favorite} />)
        ) : (
         
          <p>No favorite recipes found.</p>
          
        )}
      </div>  
      </div>
      <button id="back" onClick={goBack}>
        Back
      </button>
    </div>
  );

}
