export const fetchToken = () => {
  const token: String = window.localStorage.getItem("token") || "";
  return token;
};
