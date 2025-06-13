import axios from "axios";

const API_BASE = "http://localhost:3000/api";

export const createPoll = (data: any) => axios.post(`${API_BASE}/polls`, data);
export const getPoll = (id: string) => axios.get(`${API_BASE}/polls/${id}`);
export const votePoll = (id: string, index: number, ip: string) =>
  axios.post(`${API_BASE}/polls/${id}/vote`, { index, ip });
