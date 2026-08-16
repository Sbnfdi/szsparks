import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AUTH_COOKIE = "sz_sparks_admin";
const AUTH_TOKEN = "authenticated";

export async function login(password: string): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return false;
  }

  if (password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return true;
  }
  return false;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE);
  return token?.value === AUTH_TOKEN;
}

export async function requireAuth(): Promise<void> {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin");
  }
}
