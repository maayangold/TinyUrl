import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crypto from 'crypto'
import jwt from "jsonwebtoken";


import  LinksRouter from './Routers/LinksRouter.js'; 
import UsersRouter from './Routers/UsersRouter.js';
import User from './Models/UserModel.js';

connectDB();

const app = express();
const port = process.env.PORT || 5000
const secret = "JIs%WCfS#Sl454d5MG";


app.use(cors());
app.use(bodyParser.json());
// Routers
app.use('/links', LinksRouter);
app.use('/users', UsersRouter);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
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
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
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
