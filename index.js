import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/auth.js';
import categoryRouter from './routes/categories.js';
import productRoutes from './routes/products.js';
import config from './configs/config.js';
import passport from "passport";
import { jwtStrategy } from "./configs/strategies.js";

const app = express();
const PORT = 5000;

passport.use(jwtStrategy);
app.use(passport.initialize());
app.use(bodyParser.json());

app.use("/auth", authRouter);
// Stay behind auth so token is not required for auth
app.use(passport.authenticate("jwt", { session: false }));
app.use("/products", productRoutes);
app.use("/categories", categoryRouter);

// Connect database
const url = config.MONGO_DB_URL;
await mongoose.connect(url);

app.listen(PORT, () => console.log('Server is running on port ' + PORT))
