const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

function resolveDatabasePath() {
  if (process.env.DATABASE_PATH) {
    return process.env.DATABASE_PATH;
  }
  return path.join(__dirname, "data", "database.sqlite");
}

const databasePath = resolveDatabasePath();
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

const db = new Database(databasePath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS qrcodes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    data TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'text',
    title TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
  CREATE INDEX IF NOT EXISTS idx_qrcodes_user_created
    ON qrcodes(userId, createdAt);
`);

const insertQr = db.prepare(`
  INSERT INTO qrcodes (userId, data, type, title, createdAt, updatedAt)
  VALUES (@userId, @data, @type, @title, @createdAt, @updatedAt)
`);

const selectByIdForUser = db.prepare(`
  SELECT id, userId, data, type, title, createdAt, updatedAt
  FROM qrcodes
  WHERE id = ? AND userId = ?
`);

const listForUser = db.prepare(`
  SELECT id, userId, data, type, title, createdAt, updatedAt
  FROM qrcodes
  WHERE userId = ?
  ORDER BY createdAt DESC
  LIMIT ? OFFSET ?
`);

const countForUser = db.prepare(`
  SELECT COUNT(*) AS total FROM qrcodes WHERE userId = ?
`);

const updateForUser = db.prepare(`
  UPDATE qrcodes
  SET data = @data, type = @type, title = @title, updatedAt = @updatedAt
  WHERE id = @id AND userId = @userId
`);

const deleteForUser = db.prepare(`
  DELETE FROM qrcodes WHERE id = ? AND userId = ?
`);

function nowIso() {
  return new Date().toISOString();
}

function createQrCode({ userId, data, type, title }) {
  const timestamp = nowIso();
  const result = insertQr.run({
    userId,
    data,
    type,
    title,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  return selectByIdForUser.get(Number(result.lastInsertRowid), userId);
}

function listQrCodes({ userId, limit, offset }) {
  const rows = listForUser.all(userId, limit, offset);
  const count = countForUser.get(userId);
  return { rows, total: count.total };
}

function readQrCode({ userId, id }) {
  return selectByIdForUser.get(id, userId);
}

function updateQrCode({ userId, id, data, type, title }) {
  const existing = selectByIdForUser.get(id, userId);
  if (!existing) {
    return null;
  }
  updateForUser.run({
    id,
    userId,
    data,
    type,
    title,
    updatedAt: nowIso(),
  });
  return selectByIdForUser.get(id, userId);
}

function deleteQrCode({ userId, id }) {
  const result = deleteForUser.run(id, userId);
  return result.changes > 0;
}

function close() {
  db.close();
}

module.exports = {
  createQrCode,
  listQrCodes,
  readQrCode,
  updateQrCode,
  deleteQrCode,
  close,
};
