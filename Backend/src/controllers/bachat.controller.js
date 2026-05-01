import * as bachatService from "../services/bachat.service.js";

export async function createBachat(req, res, next) {
  try {
    const b = await bachatService.createBachat({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({ success: true, data: b });
  } catch (err) {
    next(err);
  }
}

export async function listBachats(req, res, next) {
  try {
    const list = await bachatService.listBachats();
    res.json({ success: true, data: list });
  } catch (err) {
    next(err);
  }
}

export async function getBachat(req, res, next) {
  try {
    const b = await bachatService.getBachat(req.params.id);
    if (!b)
      return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: b });
  } catch (err) {
    next(err);
  }
}

export async function addMember(req, res, next) {
  try {
    const updated = await bachatService.addMember(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

export async function addTransaction(req, res, next) {
  try {
    const updated = await bachatService.addTransaction(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}
