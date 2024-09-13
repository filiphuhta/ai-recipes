import React from "react";

interface RecipeProps {
  recipe: {
    recipe_title: string;
    recipe_ingredients: string[];
    recipe_steps: string[];
    recipe_summary: string;
  };
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <div className="recipeResults">
      <h2>{recipe.recipe_title}</h2>
      <div className="recipeCard">
        <p>{recipe.recipe_summary}</p>
        <h3>Ingredients</h3>
        <ul>
          {recipe.recipe_ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <h3>Steps</h3>
        <ol>
          {recipe.recipe_steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Recipe;
