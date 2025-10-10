// Extremely basic in-memory auth fallback for local testing only.
// Do NOT use in production.

export interface LocalUser {
  email: string;
}

const ADMIN_EMAIL = "admin@executiveinn.local";
const ADMIN_PASSWORD = "admin123";

const SESSION_KEY = "local_admin_session";

export function localSignIn(email: string, password: string): { user: LocalUser } | null {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const user: LocalUser = { email };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return { user };
  }
  return null;
}

export function localGetSession(): LocalUser | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalUser;
  } catch {
    return null;
  }
}

export function localSignOut(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getLocalAdminCredentials() {
  return { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };
}

