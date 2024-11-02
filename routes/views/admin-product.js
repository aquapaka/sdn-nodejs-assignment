import express from "express";
import Products from "../../models/products.js";

const adminProductRouter = express.Router();

adminProductRouter.get("/add", async (req, res) => {
  res.render("pages/admin/products/add-product");
});

adminProductRouter.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Products.findById(id);

  res.render("pages/admin/products/edit-product", product);
});

adminProductRouter.post("/add", async (req, res) => {
  const { title, description, price } = req.body;

  const product = new Products({
    title,
    description,
    price,
    createdAt: new Date(),
  });

  const result = await product.save();

  res.redirect("/admin/dashboard");
});

adminProductRouter.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  const product = await Products.findByIdAndUpdate(
    { _id: id },
    {
      title: title,
      description: description,
      price: price,
    },
    { new: true },
  );
  console.log(product);

  res.redirect("/admin/dashboard");
});

export default adminProductRouter;
