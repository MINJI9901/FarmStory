const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const Joi = require("joi");
const session = require("express-session");
const bcrypt = require("bcrypt");

const Farm = require("./models/farm");
const Review = require("./models/review");
const Product = require("./models/product");

const productRouter = require("./routes/products");
const farmRouter = require("./routes/farms");
const reviewRouter = require("./routes/reviews");
const userRouter = require("./routes/users");

const ExpressError = require("./utilities/ExpressError");
const wrapAsync = require("./utilities/catchAsync");

// Eventually this is going to have some extra logic in here
// that says user our local development database or if this is in production, user the production database
mongoose.connect("mongodb://127.0.0.1:27017/FarmStory");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error!"));
db.once("open", () => {
  console.log("Database connected");
  // console.log(Farm.find({}))
});

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use("/public/", express.static("./public"));

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());
// To 'fake' put/patch/delete requests:
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "minsoon1999littlesoonieioongeioong",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.cart = req.session.cart;
  res.locals.favorite = req.session.favorite;
  next();
});

app.use("/", productRouter);
app.use("/farms", farmRouter);
app.use("/products/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ******************************************************** MIDDLEWARE FUNCTIONS ********************************************************
function isLoggedIn(req, res) {
  req.session.user ? true : false;
}

// ******************************************************** ROUTES ********************************************************
app.get(
  "/",
  wrapAsync((req, res) => {
    res.render("test");
  })
);

// ******************************************************** MIDDLEWARE & ERROR HANDLERS ********************************************************

// app.use((req, res) => {
//     res.status(404).send('Not Found!');
// })

app.all("*", (req, res, next) => {
  // throw new ExpressError('Not Found', 404); 이렇게 해도 됨여
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  // const expressError = new ExpressError(err);
  res.status(status).render("error", { err });
  // res.send('Error occured!!!')
});

app.listen(3000);
