import * as userService from "../services/user.service.js";

export async function listUsers(req, res, next) {
  try {
    const users = await userService.listUsers({ isDeleted: false });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
}

export async function getUser(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const user = await userService.removeUser(req.params.id);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}
