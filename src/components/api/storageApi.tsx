export const fetchToken = () => {
  const token: String = window.localStorage.getItem("ig_token") || "";
  return token;
};

export const setToken = (token: string) => {
  window.localStorage.setItem("ig_token", token);
};

export const isLoggedIn = () => {
  if (fetchToken()) {
    return true;
  }
  return false;
};

export const logout = () => {
  window.localStorage.removeItem("ig_token");
};
