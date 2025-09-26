import axios from "axios";
import { Template } from "../types";

const api = axios.create({ baseURL: "http://localhost:5276/api/templates" });

export const TemplateService = {
  getTemplates: async (): Promise<Template[]> => {
    const res = await api.get("/");
    return res.data;
  },
  createTemplate: async (data: { name: string; htmlContent: string }) => {
    const res = await api.post("/", data);
    return res.data;
  },
  updateTemplate: async (id: number, data: { name: string; htmlContent: string }) => {
    const res = await api.put(`/${id}`, data);
    return res.data;
  },
  deleteTemplate: async (id: number) => {
    await api.delete(`/${id}`);
  },
  generatePdf: async (id: number, data: Record<string, string>) => {
    const res = await api.post(`/${id}/generate`, data, { responseType: "blob" });
    return res.data;
  },
};