import express from "express";
import Categories from "../../models/categories.js";
import Products from "../../models/products.js";

const adminRouter = express.Router();

adminRouter.get("/dashboard", async (req, res) => {
  const products = await Products.find({}).exec();
  const categories = await Categories.find({}).populate("products").exec();

  res.render("pages/admin/dashboard", {
    products: products,
    categories: categories,
    message: null,
  });
});

adminRouter.get("/product/add", async (req, res) => {
  res.render("pages/admin/products/add-product");
});

export default adminRouter;
