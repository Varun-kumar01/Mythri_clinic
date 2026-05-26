import api from "./client";

export async function loginApi({ mobileNumber, password }) {
  const { data } = await api.post("/v1/auth/login", { mobileNumber, password });
  localStorage.setItem("token", data.token);
  return data;
}

export async function registerApi({ mobileNumber, password, district, hospital, cdpo }) {
  const { data } = await api.post("/v1/auth/register", { mobileNumber, password, district, hospital, cdpo });
  return data;
}

export async function resetPasswordApi({ mobileNumber, newPassword, confirmPassword }) {
  const { data } = await api.post("/v1/auth/reset", { mobileNumber, newPassword, confirmPassword });
  return data;
}