import express from "express";
import {
  CREATE_CATEGORY_ERROR_DUPLICATE_MESSAGE,
  CREATE_CATEGORY_ERROR_UNDEFINED_MESSAGE,
  CREATE_CATEGORY_SUCCESS_MESSAGE,
  DELETE_CATEGORY_SUCCESS_MESSAGE,
  UPDATE_CATEGORY_ERROR_DUPLICATE_MESSAGE,
  UPDATE_CATEGORY_ERROR_UNDEFINED_MESSAGE,
  UPDATE_CATEGORY_SUCCESS_MESSAGE,
} from "../../consts/messages.js";
import { MONGO_DUPLICATE_KEY_ERROR_CODE } from "../../consts/mongo-error-codes.js";
import Categories from "../../models/categories.js";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  const categories = await Categories.find({}).populate("products").exec();
  res.send(categories);
});

categoryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const category = await Categories.findOne({ _id: id })
    .populate("products")
    .exec();
  res.send(category);
});

categoryRouter.post("/", async (req, res) => {
  const { title, description } = req.body;

  const newCategory = Categories({
    title: title,
    description: description,
  });

  newCategory
    .save()
    .then((category) => {
      res.send({
        category: category,
        message: CREATE_CATEGORY_SUCCESS_MESSAGE,
      });
    })
    .catch((error) => {
      console.log(error);

      if (error.code === MONGO_DUPLICATE_KEY_ERROR_CODE) {
        res.status(409).send({
          message: CREATE_CATEGORY_ERROR_DUPLICATE_MESSAGE,
        });
      } else {
        res.status(400).send({
          message: CREATE_CATEGORY_ERROR_UNDEFINED_MESSAGE,
        });
      }
    });
});

categoryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, productIds } = req.body;

  Categories.findByIdAndUpdate(
    { _id: id },
    {
      title: title,
      description: description,
      products: productIds,
    },
    {
      new: true,
    },
  )
    .then((category) => {
      res.send({
        category: category,
        message: UPDATE_CATEGORY_SUCCESS_MESSAGE,
      });
    })
    .catch((error) => {
      console.log(error);

      if (error.code === MONGO_DUPLICATE_KEY_ERROR_CODE) {
        res.status(409).send({
          message: UPDATE_CATEGORY_ERROR_DUPLICATE_MESSAGE,
        });
      } else {
        res.status(400).send({
          message: UPDATE_CATEGORY_ERROR_UNDEFINED_MESSAGE,
        });
      }
    });
});

categoryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const category = await Categories.findByIdAndDelete({ _id: id });

  res.send({
    category: category,
    message: DELETE_CATEGORY_SUCCESS_MESSAGE,
  });
});

export default categoryRouter;
