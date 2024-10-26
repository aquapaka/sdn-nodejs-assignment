import express from "express";

const adminRouter = express.Router();

adminRouter.get("/products", (req, res) => {
  res.render("pages/admin/products");
});

adminRouter.get("/categories", (req, res) => {
  res.render("pages/admin/categories");
});

export default adminRouter;
