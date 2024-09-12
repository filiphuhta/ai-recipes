"use client";
import { useState } from "react";
import './page.css';

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [recipe, setRecipe] = useState({ recipe_name: '', recipe_content: '', });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Show the spinner
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: inputText,
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setRecipe(JSON.parse(result.message)); // Save the recipe result to state
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide the spinner after fetch
    }
  };

  return (
    <div className="page">
      <main className="main">
        <div className="chatContainer">
          <h1>Recipe generator</h1>
          <p>Write some ingridients you want to include in your recipe 🥛🍗🌽🍓</p>
          <form onSubmit={handleSubmit} className="form">
            <textarea
              className="inputField"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className="submitButton">
              Submit
            </button>
          </form>

          {/* Loading Spinner */}
          {isLoading && <div className="spinner">Loading...</div>}

          {/* Recipe Results */}
          <div className="recipeResults">
            {recipe.recipe_content !== '' && recipe.recipe_name !== '' && (
              <div className="recipeCard">
                <div dangerouslySetInnerHTML={{ __html: recipe.recipe_content }} />
              </div>)
            }
          </div>
        </div>
      </main>
    </div>
  );
}
