import express from 'express'
import Users from "../models/users.js";
import { check, encrypt } from "../utils/encryption.js";
import config from "../configs/config.js";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, password, fullname } = req.body;

  if (!username || !password || !fullname) {
    res.status(400).send({
      message: "Không có username, password hoặc fullname",
    });
    return;
  }

  let user = await Users.findOne({
    username: username,
  }).exec();

  if (user) {
    res.status(409).send({
      message: "Username đã tồn tại",
    });
    return;
  }

  user = new Users({
    username: username,
    password: await encrypt(password),
    fullname: fullname,
  });
  await user.save();

  res.send({
    message: `Tạo user ${fullname} thành công`,
  });
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({
      message: "Không có username hoặc password",
    });
    return;
  }

  const user = await Users.findOne({
    username: username,
  });

  if (!user || !(await check(password, user.password))) {
    res.status(401).send({
      message: "Username hoặc password không đúng",
    });
    return;
  }

  // Create token
  const payload = { id: user.id };
  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  res.send({
    message: `Đăng nhập thành công`,
    token: token,
  });
});

export default authRouter;
