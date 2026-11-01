const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { after, test } = require("node:test");

const databasePath = path.join(
  os.tmpdir(),
  `codereader-${process.pid}-${Date.now()}.sqlite`
);
process.env.DATABASE_PATH = databasePath;

const { createApp } = require("../app");
const { close } = require("../db");

function listen(app) {
  return new Promise((resolve) => {
    const server = app.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function api(server, method, pathname, { token, body, origin } = {}) {
  const address = server.address();
  const headers = { Origin: origin || "https://codereader.app" };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  let payload;
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }
  const response = await fetch(`http://127.0.0.1:${address.port}${pathname}`, {
    method,
    headers,
    body: payload,
  });
  const text = await response.text();
  let json = null;
  if (text) {
    json = JSON.parse(text);
  }
  return { status: response.status, json, headers: response.headers };
}

const verifyToken = async (token) => {
  if (token === "user-a" || token === "user-b") {
    return token;
  }
  throw new Error("bad token");
};

after(() => {
  close();
  for (const suffix of ["", "-wal", "-shm"]) {
    fs.rmSync(databasePath + suffix, { force: true });
  }
});

test("QR codes are private to the signed-in user", async (t) => {
  const app = createApp({ verifyToken });
  const server = await listen(app);
  t.after(() => server.close());

  const anonymous = await api(server, "POST", "/api/QRCode/create", {
    body: { data: "secret", type: "text" },
  });
  assert.equal(anonymous.status, 401);

  const created = await api(server, "POST", "/api/QRCode/create", {
    token: "user-a",
    body: { data: "wifi-password", type: "text", title: "WiFi: home", userId: "user-b" },
  });
  assert.equal(created.status, 201);
  assert.equal(created.json.userId, "user-a");
  assert.equal(created.json.data, "wifi-password");

  const otherList = await api(server, "GET", "/api/QRCode/read?userId=user-a", {
    token: "user-b",
  });
  assert.equal(otherList.status, 200);
  assert.deepEqual(otherList.json.data, []);

  const ownList = await api(server, "GET", "/api/QRCode/read", { token: "user-a" });
  assert.equal(ownList.json.total, 1);

  const stolen = await api(server, "DELETE", `/api/QRCode/delete/${created.json.id}`, {
    token: "user-b",
  });
  assert.equal(stolen.status, 404);

  const removed = await api(server, "DELETE", `/api/QRCode/delete/${created.json.id}`, {
    token: "user-a",
  });
  assert.equal(removed.status, 200);
});

test("browser origin used by the site is allowed", async (t) => {
  const app = createApp({ verifyToken });
  const server = await listen(app);
  t.after(() => server.close());

  const response = await api(server, "OPTIONS", "/api/QRCode/read", {
    origin: "https://codereader.app",
  });
  assert.equal(
    response.headers.get("access-control-allow-origin"),
    "https://codereader.app"
  );
});

test("health check does not require auth", async (t) => {
  const app = createApp({ verifyToken });
  const server = await listen(app);
  t.after(() => server.close());
  const response = await api(server, "GET", "/health");
  assert.equal(response.status, 200);
  assert.equal(response.json.status, "ok");
});
