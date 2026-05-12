import { api } from "./api";

export const login = (email: string, password: string) => {
  return api("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const register = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  return api("/users/register", {
    method: "POST",
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
};

export const logout = () => {
  return api("/users/logout", {
    method: "POST",
  });
};

export const getMe = () => {
  return api("/users/me", {
    method: "GET"
  });
};