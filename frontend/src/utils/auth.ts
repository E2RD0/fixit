// Check if a token exists
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Retrieve the token from storage
export const getToken = (): string | null => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Remove token on logout
export const logout = (): void => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
