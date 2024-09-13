"use client";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"; // Import Material UI Spinner
import Recipe from './recipe';
import './page.css';

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [recipe, setRecipe] = useState({
    recipe_title: '',
    recipe_ingredients: [],
    recipe_steps: [],
    recipe_summary: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: inputText,
      });
      if (response.ok) {
        const result = await response.json();
        setRecipe(JSON.parse(result.message));
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <div className="chatContainer">
          <h1>Recipe Generator</h1>
          <p>Write some ingredients you want to include in your recipe 🥛🍗🌽🍓</p>
          <form onSubmit={handleSubmit} className="form">
            <textarea
              className="inputField"
              placeholder="Enter your text here..."
              value={inputText}
              onChange={handleInputChange}
            ></textarea>
            <button type="submit" className="submitButton">Submit</button>
          </form>

          {isLoading ? (
            <div className="spinner">
              <CircularProgress sx={{ color: '#00695C' }} />
            </div>
          ) : (
            recipe.recipe_title && <Recipe recipe={recipe} />
          )}
        </div>
      </main>
    </div>
  );
}
