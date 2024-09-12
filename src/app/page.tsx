"use client"
import { useState } from "react";
import './page.css'

export default function Home() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        body: inputText,
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="page">
      <main className="main">
        <div className="chatContainer">
          <h1>Submit Your Prompt</h1>
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
        </div>
      </main>
    </div>
  );
}
