const express = require("express");
const {
  createQrCode,
  listQrCodes,
  readQrCode,
  updateQrCode,
  deleteQrCode,
} = require("../db");

const router = express.Router();
const MAX_DATA_LENGTH = 8192;
const MAX_TITLE_LENGTH = 200;
const TYPES = new Set(["url", "text"]);

function parseId(value) {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }
  const id = Number(value);
  if (!Number.isSafeInteger(id)) {
    return null;
  }
  return id;
}

function parsePage(value) {
  if (value === undefined) {
    return 0;
  }
  if (!/^\d+$/.test(String(value))) {
    return null;
  }
  const page = Number(value);
  if (!Number.isSafeInteger(page) || page > 10000) {
    return null;
  }
  return page;
}

function parseLimit(value) {
  if (value === undefined) {
    return 100;
  }
  if (!/^\d+$/.test(String(value))) {
    return null;
  }
  const limit = Number(value);
  if (!Number.isSafeInteger(limit) || limit < 1) {
    return null;
  }
  return Math.min(limit, 100);
}

function readPayload(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { error: "Invalid payload" };
  }
  if (typeof body.data !== "string" || body.data.trim() === "") {
    return { error: "Data is required" };
  }
  if (body.data.length > MAX_DATA_LENGTH) {
    return { error: "Data is too long" };
  }
  const type = body.type === undefined ? "text" : body.type;
  if (typeof type !== "string" || !TYPES.has(type)) {
    return { error: "Type must be url or text" };
  }
  let title = null;
  if (body.title !== undefined && body.title !== null) {
    if (typeof body.title !== "string") {
      return { error: "Title must be text" };
    }
    if (body.title.length > MAX_TITLE_LENGTH) {
      return { error: "Title is too long" };
    }
    title = body.title.trim() === "" ? null : body.title;
  }
  return { data: body.data, type, title };
}

router.post("/create", (req, res) => {
  const payload = readPayload(req.body);
  if (payload.error) {
    res.status(400).json({ error: payload.error });
    return;
  }
  const record = createQrCode({ userId: req.userId, ...payload });
  res.status(201).json(record);
});

router.get("/read", (req, res) => {
  const page = parsePage(req.query.page);
  const limit = parseLimit(req.query.limit);
  if (page === null || limit === null) {
    res.status(400).json({ error: "Invalid page or limit" });
    return;
  }
  const { rows, total } = listQrCodes({
    userId: req.userId,
    limit,
    offset: page * limit,
  });
  res.json({ data: rows, total, page, limit });
});

router.get("/read/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const record = readQrCode({ userId: req.userId, id });
  if (!record) {
    res.status(404).json({ error: "Record not found" });
    return;
  }
  res.json(record);
});

router.put("/update/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const payload = readPayload(req.body);
  if (payload.error) {
    res.status(400).json({ error: payload.error });
    return;
  }
  const record = updateQrCode({ userId: req.userId, id, ...payload });
  if (!record) {
    res.status(404).json({ error: "Record not found" });
    return;
  }
  res.json(record);
});

router.delete("/delete/:id", (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const deleted = deleteQrCode({ userId: req.userId, id });
  if (!deleted) {
    res.status(404).json({ error: "Record not found" });
    return;
  }
  res.json({ message: "Record deleted successfully" });
});

module.exports = router;
