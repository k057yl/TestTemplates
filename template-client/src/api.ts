import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5276/api/templates",
});

export const getTemplates = () => api.get("/");
export const getTemplate = (id: number) => api.get(`/${id}`);
export const createTemplate = (data: { name: string; htmlContent: string }) =>
  api.post("/", data);
export const updateTemplate = (id: number, data: { name: string; htmlContent: string }) =>
  api.put(`/${id}`, data);
export const deleteTemplate = (id: number) => api.delete(`/${id}`);
export const generatePDF = (id: number, data: Record<string, string>) =>
  api.post(`/${id}/generate`, data, { responseType: "blob" });