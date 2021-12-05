import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// const mongoose = require("mongoose")
// const mongoString = "mongodb+srv://mattBeadnall:Coomcaibdjf92@chefsnacc-backend.gynid.mongodb.net/test"

// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
// var db = mongoose.connection;

// db.on("error", function(error) {
//   console.log(error)
// })

// db.on("open", function() {
//   console.log("Connected to MongoDB database.")
// })

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
  ,document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
