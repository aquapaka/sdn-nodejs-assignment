import express from 'express'

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const { username, password } = req.body;
})

authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
})

export default authRouter;
