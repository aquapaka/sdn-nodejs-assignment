import express from "express";
import Categories from "../../models/categories.js";

const adminCategoryRouter = express.Router();

adminCategoryRouter.get("/add", async (req, res) => {
  res.render("pages/admin/categories/add-category");
});

adminCategoryRouter.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const category = await Categories.findById(id);

  res.render("pages/admin/categories/edit-category", category);
});

adminCategoryRouter.post("/add", async (req, res) => {
  const { title, description, price } = req.body;

  const category = new Categories({
    title,
    description,
    price,
    createdAt: new Date(),
  });

  const result = await category.save();

  res.redirect("/admin/dashboard");
});

adminCategoryRouter.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  const category = await Categories.findByIdAndUpdate(
    { _id: id },
    {
      title: title,
      description: description,
      price: price,
    },
    { new: true },
  );
  console.log(category);

  res.redirect("/admin/dashboard");
});

export default adminCategoryRouter;
