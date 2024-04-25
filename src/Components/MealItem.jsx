import React, { useEffect, useState } from "react";
import "./style.css";

const Mealitem = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getLocalData = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const item = favorites.find((meal) => {
      return meal.idMeal === data.idMeal;
    });

    return { item, favorites };
  };

  function addtofavorite(favorites) {
    const update = [...favorites, data];
    localStorage.setItem("favorites", JSON.stringify(update));
    setIsFavorite(true);
  }

  function removefavorite(favorites) {
    const update = favorites.filter((meal) => {
      return meal.idMeal !== data.idMeal;
    });

    localStorage.setItem("favorites", JSON.stringify(update));
    setIsFavorite(false);
  }

  function handleFavorite() {
    const { favorites, item } = getLocalData();

    if (item) {
      removefavorite(favorites);
    } else {
      addtofavorite(favorites);
    }
  }

  useEffect(() => {
    const { item } = getLocalData();

    if (item) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className="card">
        <img src={data.strMealThumb} alt="meal" />
        <div className="info">
          <h2>{data.strMeal}</h2>
          <p>{data.strArea} food</p>
        </div>
        {showDetails && (
          <div className="recipe">
            <h2>Recipe</h2>
            <p>{data.strInstructions}</p>
          </div>
        )}
        <button className="recipe" onClick={toggleDetails}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
        <button className="favorite" onClick={handleFavorite}>
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
      </div>
    </>
  );
};

export default Mealitem;