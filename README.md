# AI(R) Poetry Generator

A React application that generates poetry inspired by air pollution data using Google's Generative AI.

## Overview

The AI(R) Poetry Generator is a web application that creates poetry by combining air pollution data with literary inspiration. The application uses Google's Generative AI (Gemini) to generate poems based on user-selected parameters.

## Features

- Generate poetry in various forms (Sonnet, Ode, Free Verse)
- Use real air pollution data from different cities
- Visualize pollution levels with interactive graphs
- Download and share generated poems
- Translate poems to different languages
- No backend required - uses Google AI directly from the frontend

## Setup

1. Clone this repository
2. Install dependencies with `npm install`
3. Set up your Google AI API key:
   - Create a Google Cloud account and enable the Generative Language API
   - Get your API key from the Google AI Studio: https://makersuite.google.com/app/apikey
   - Create a `.env` file in the root directory with the following content:
     ```
     REACT_APP_GOOGLE_API_KEY=your_api_key_here
     ```
4. Start the development server with `npm start`

## Using the Application

1. Select a poetry form (Sonnet, Ode, Free Verse)
2. Choose a city and pollutant type
3. Set a date range for the pollution data
4. Click "Generate Poem" to create a unique poem based on the selected parameters
5. Download or share the generated poem
6. Optionally translate the poem to different languages

## How It Works

The application constructs detailed prompts for Google's Generative AI based on:
- The selected poetry form (with specific structural guidelines)
- The city and its characteristics
- Pollution data for the selected date range
- Adjusting tone based on pollution levels

The AI then generates a unique poem that combines these elements into a cohesive literary piece.

## Note on Fallback Functionality

If the Google AI API is unavailable or returns an error, the application will fall back to using locally generated mock poems that follow similar structures. This ensures the application remains functional even when external services are unavailable.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

#   p o e t r y 
 
 #   p o e t r y 
 
 