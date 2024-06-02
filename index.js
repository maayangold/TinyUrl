import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import LinksRouter from './Routers/LinksRouter.js';
import UsersRouter from './Routers/UsersRouter.js';
import User from './Models/UserModel.js';
import connectDB from './database.js';
import LinksController from './Controllers/LinksController.js';

const app = express();
const port = process.env.PORT||5000;
const secret = "JIs%WCfS#Sl454d5MG";

connectDB();

app.use(cors());
app.use(bodyParser.json());
// Routers
// Define the redirection route
app.get('/maayan.shortness/:id', LinksController.redirectLink);
app.use('/links', LinksRouter);
app.use('/users', UsersRouter);

app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ password }); // Find user by name

    // Check if user exists and password matches
    if (user && user.password === password) {
      const token = jwt.sign(
        { userId: user._id, userName: user.name, roles: ["user"] }, secret);
      res.send({ accessToken: token });
    } else {
      res.status(401).send({ message: "unauthorized" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

//Middleware
app.use("/", (req, res, next) => {
  req.UUID = crypto.randomUUID();
  console.log(`request ${req.UUID} started.`);
  next();
});

// JWT Middleware comes after  login and register routes
app.use("/", (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const token = req.headers.authorization.slice(7);
  console.log("token", token);
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).send({ message: "unauthorized" });
  }
});


app.get("/", (req, res) => {
  res.send("Hello World! I develop my last project for this school year!");
});


app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
