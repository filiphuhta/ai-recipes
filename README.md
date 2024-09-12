# Recipe Generator App

This is a simple recipe generator web application built using Next.js. Users can input ingredients, and the app will generate a recipe using the Google Generative AI API. The app features a chat-like interface where users submit ingredients at the bottom of the page and receive a dynamically generated recipe displayed above.

## Features:
- Recipe generation based on user-input ingredients
- Uses Google Generative AI to generate full recipes in HTML format
- Loading message to indicate when data is being fetched

---

## Installation and Setup

### Prerequisites:
- Node.js and npm installed on your local machine
- A Google Generative AI API key

### Steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/recipe-generator-app.git
   cd recipe-generator-app
2. Install Dependencies: Run the following command to install all required packages:
```bash
npm install
```
3. Create a `.env` File: In the root of your project, create a .env file. This file will store your API key securely.
```bash
touch .env
```
4. Add Your API Key: Inside your `.env` file, add the following line with your Google Generative AI API key:
```makefile
API_KEY=your_google_generative_ai_key_here
```
Ensure that your .env file is added to .gitignore to keep your API key secure.

5. Run the Development Server: To start the development server, run:
```bash
npm run dev
```
The application should now be running on `http://localhost:3000`.

## Author
* [Filip Huhta](https://github.com/filiphuhta)