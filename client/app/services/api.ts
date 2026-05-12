const URL = "http://localhost:5000";

export const api = async (endpoint: string, options: RequestInit = {}) => {
  let cookiesHeader: string | undefined;

  // Server-side: forward cookies manually
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    cookiesHeader = cookieStore.toString();
  }
  // Client-side: browser sends cookies automatically via credentials: "include"

  const res = await fetch(`${URL}/api/v1${endpoint}`, {
    credentials: "include",
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(cookiesHeader ? { Cookie: cookiesHeader } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};
