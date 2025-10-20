// src/utils/auth.js

// ✅ Save user + token
export function setAuthData(user, token) {
  try {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error("Failed to save auth data:", err);
  }
}

// ✅ Safely get stored user
export function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn("Corrupted user data, clearing...");
    localStorage.removeItem("user");
    return null;
  }
}

// ✅ Strict token validation
export function getStoredToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null" || token.trim() === "") {
      localStorage.removeItem("token");
      return null;
    }
    return token;
  } catch {
    return null;
  }
}

// ✅ Clear all auth data
export function clearAuth() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

// ✅ Check login state
export function isAuthenticated() {
  const token = getStoredToken();
  return !!token;
}

// ✅ Logout
export function logoutUser() {
  clearAuth();
  window.location.href = "/login"; // clean refresh ensures routing reset
}
