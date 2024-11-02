import express from "express";
import {
  CREATE_PRODUCT_SUCCESS_MESSAGE,
  DELETE_PRODUCT_SUCCESS_MESSAGE,
  UPDATE_PRODUCT_SUCCESS_MESSAGE,
} from "../../consts/messages.js";
import Products from "../../models/products.js";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await Products.find({}).exec();
  res.send(products);
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Products.findOne({ _id: id }).exec();
  res.send(product);
});

productRouter.post("/", async (req, res) => {
  const { title, description } = req.body;

  const newProduct = Products({
    title: title,
    description: description,
  });

  newProduct.save().then((product) => {
    res.send({
      product: product,
      message: CREATE_PRODUCT_SUCCESS_MESSAGE,
    });
  });
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  const product = await Products.findByIdAndUpdate(
    { _id: id },
    {
      title: title,
      description: description,
      price: price,
    },
    {
      new: true,
    },
  );

  res.send({
    product: product,
    message: UPDATE_PRODUCT_SUCCESS_MESSAGE,
  });
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await Products.findByIdAndDelete({ _id: id });

  res.send({
    product: product,
    message: DELETE_PRODUCT_SUCCESS_MESSAGE,
  });
});

export default productRouter;
