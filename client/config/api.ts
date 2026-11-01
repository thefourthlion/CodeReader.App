import { auth } from "@/firebase";

const PRODUCTION_API_URL = "https://api.codereader.app";

function resolveApiUrl(value: string | undefined): string {
  const trimmed = value?.trim().replace(/\/$/, "");
  if (!trimmed) {
    return PRODUCTION_API_URL;
  }
  return trimmed;
}

export const API_URL = resolveApiUrl(process.env.NEXT_PUBLIC_API_URL);

export async function authorizedFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not signed in");
  }

  const token = await user.getIdToken();
  const headers = new Headers(init.headers);
  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${API_URL}${path}`, {
    ...init,
    headers,
  });
}

export default API_URL;
