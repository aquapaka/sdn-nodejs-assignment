import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from "./routes/apis/auth.js";
import categoryRouter from "./routes/apis/categories.js";
import productRoutes from "./routes/apis/products.js";
import config from "./configs/config.js";
import passport from "passport";
import { jwtStrategy } from "./configs/strategies.js";
import adminRouter from "./routes/views/admin.js";
import authViewRouter from "./routes/views/auth.js";
import cookieParser from "cookie-parser";
import adminProductRouter from "./routes/views/admin-product.js";
import adminCategoryRouter from "./routes/views/admin-category.js";

const app = express();
const PORT = 5000;
const API_PRE = "/api/v1";

// Set view engine to ejs
app.set("view engine", "ejs");

passport.use(jwtStrategy);
app.use(passport.initialize());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authViewRouter);

app.use(bodyParser.json());
app.use(API_PRE + "/auth", authRouter);
// Stay behind auth so token is not required for auth
app.use("/admin", adminRouter);
app.use("/admin/product", adminProductRouter);
app.use("/admin/category", adminCategoryRouter);
app.use(passport.authenticate("jwt", { session: false }));
app.use(API_PRE + "/products", productRoutes);
app.use(API_PRE + "/categories", categoryRouter);

// Connect database
const url = config.MONGO_DB_URL;
await mongoose.connect(url);

app.listen(PORT, () => console.log('Server is running on port ' + PORT))
