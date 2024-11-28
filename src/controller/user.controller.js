import { UserModel } from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ ok: false, message: "Error email, password or username" });
    }

    const user = await UserModel.findByOneEmail(email);

    if (user) {
      return res
        .status(409)
        .json({ ok: false, message: "Email already exists" });
    }

    //hashed password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    const token = jwt.sign(
      { email: newUser.email, role_id: newUser.role_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      ok: true,
      message: {
        token: token,
        role_id: newUser.role_id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "Error server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ ok: false, message: "Error email or password" });
    }

    const user = await UserModel.findByOneEmail(email);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ ok: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      ok: true,
      message: {
        token: token,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "Error server" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await UserModel.findByOneEmail(req.email);
    return res.json({ ok: true, message: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "Error server" });
  }
};

const findAll = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    return res.status(200).json({ ok: true, message: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "Error server" });
  }
};

const updateRoleVet = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await UserModel.findByOneUid(uid);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const updateUser = await UserModel.updateRoleVet(uid);

    return res.status(201).json({ ok: true, message: updateUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: "Error server" });
  }
};

export const UserController = {
  register,
  login,
  profile,
  findAll,
  updateRoleVet,
};
