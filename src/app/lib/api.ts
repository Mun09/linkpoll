import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPoll = (data: any) => axios.post(`${API_BASE}/polls`, data);
export const getPoll = (id: string) => axios.get(`${API_BASE}/polls/${id}`);
export const votePoll = (id: string, index: number, ip: string) =>
  axios.post(`${API_BASE}/polls/${id}/vote`, { index, ip });
