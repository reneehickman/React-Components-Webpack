## Setting up Webpack Config for unminified build of React-Components
###

1. In the project src directory remove the `serviceWorker.js` and `logo.svg` files. We can also remove the entire `./src/public` directory.
###
##
###

2. Update the `./src/index.js` to reflect the following. This is our app entry point. 
```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from './App/App.js';

ReactDOM.render(<App />, document.getElementById('root'));

```
###
##
###

3. Add an `index.html` to the src directory where our `index.js` is located.
```html
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" /> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>

```
###
##
###

4. Create a `webpack.config.js` in the project directory - at same level as our `package.json`. Add in the following:

```javascript
//******* webpack.config.js *******//

const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /^(?!.*?\.module).*\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },   
      {
        test: cssModuleRegex,
        use: [ MiniCssExtractPlugin.loader, {
                loader: 'css-loader', 
                options: {
                   modules: true
                } 
            }
        ]
      },
 
    ]
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
        filename: "[name].css"
        
      })
  ]
};
```
###
##
###

5. Create a `.babelrc` file in the project directory wehere we just created the webpack config. Add in the following:

```json
{     "presets": ["@babel/preset-env", "@babel/preset-react"] }
```
###
##
###

6. In our `package.json` we need to make a few changes to our start and build scripts:

```json
"scripts": {
"start": "webpack-dev-server --open --hot --mode development",
"build": "webpack --mode none"
}
```
###
##
###

7. In our `package.json` we also need to update our dependencies as shown below. It may be helpful to remove your old `package-lock.json` before running npm install. 

```javascript

"dependencies": {
    "dotenv": "^8.0.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-calendar": "^2.19.0",
    "react-dom": "^16.8.6",
    "react-loadable": "^5.5.0",
    "react-scripts": "3.0.1"
  },
"devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.2.0",
    "enzyme": "^3.10.0",
    "enzyme-adapter-react-16": "^1.14.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "mini-css-extract-plugin": "^0.8.0",
    "path": "^0.12.7",
    "react-addons-test-utils": "^15.6.2",
    "react-svg-loader": "^3.0.3",
    "style-loader": "^1.0.0",
    "svg-inline-loader": "^0.8.0",
    "webpack": "^4.39.2",
    "webpack-cli": "^3.3.7",
    "webpack-dev-server": "^3.8.0"
  }

```
###
##
###

8. Now we can `npm install`.
###
##
###

9. `npm start` Your app should compile and run successfully. Now we are ready to build.
###
##
###

10. `npm run-script build`. This should create a build folder called `dist` and in this folder you should have an `index.html`, a `main.css` and a `main.js`. 

