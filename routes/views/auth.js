import express from "express";
import { API_PRE } from "../../consts/consts.js";

const authViewRouter = express.Router();

authViewRouter.get("/login", (req, res) => {
  res.render("pages/auth/login", { message: null });
});

authViewRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await response.json();

  // Login success
  if (response.status === 200) {
    // Save jwt into cookie
    res.redirect("/admin/dashboard");
    return;
  }

  if (response.status === 401) {
    res.render("pages/auth/login", { message: data.message });
    return;
  }
});

export default authViewRouter;
