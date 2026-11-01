const { createRemoteJWKSet, jwtVerify } = require("jose");

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "general-2ed6c";
const JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);
const USER_ID_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

async function verifyFirebaseToken(token) {
  const { payload } = await jwtVerify(token, JWKS, {
    issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
    audience: FIREBASE_PROJECT_ID,
    clockTolerance: 5,
  });
  if (typeof payload.sub !== "string" || !USER_ID_PATTERN.test(payload.sub)) {
    throw new Error("Invalid subject");
  }
  return payload.sub;
}

function createRequireUser(verifyToken = verifyFirebaseToken) {
  return async function requireUser(req, res, next) {
    const header = req.get("authorization") || "";
    const match = /^Bearer\s+(\S+)$/i.exec(header);
    if (!match) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    try {
      req.userId = await verifyToken(match[1]);
      next();
    } catch {
      res.status(401).json({ error: "Authentication required" });
    }
  };
}

module.exports = { createRequireUser, verifyFirebaseToken };
