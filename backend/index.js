const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 2000; //dynamically choosing the port if our .env port is busy then by default aur backend choose 2000 port by default
app.use(express.json());

app.use(cookieParser());
// for parsing and converting data to json format
const cors = require("cors"); // cors is user to communicating between frontend and backend bassically used for cross origin communication like our frontend is running on port no 3000 and backend is running on 3000 port no then cors is used to communicate
const allowedOrigins = [
  'https://deployment-9cai.onrender.com',
  'https://deployment-npko.onrender.com',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and other credentials to be sent
};

app.use(cors(corsOptions));
// app.use(cors());//same as above
//nondegit 
const dbConnect = require("./config/database"); //importing function which we created to connect database

dbConnect(); //calling the function to connect database

const route = require("./routes/routes"); // importing the route
app.use(route); //mounting our route to our app

app.listen(PORT, () => {
  
  console.log(`server started at ${PORT}`);
}); // starting our development server of backend
