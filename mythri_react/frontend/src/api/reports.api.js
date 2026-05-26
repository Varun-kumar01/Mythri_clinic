import api from "./client";

export async function submitReportApi(payload) {
  const { data } = await api.post("/v1/reports", payload);
  return data;
}