import axios from "axios";

// ✅ Define the type for a single row in your Google Sheet
// Adjust this based on how many columns you have and what each represents
export interface SheetRow {
  [key: string]: string; // flexible for dynamic columns
}

// ✅ Define a standard API response type
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Axios instance (can easily extend later for auth tokens, interceptors, etc.)
const api = axios.create({
  baseURL: "/api", // vite.config.ts proxy will handle forwarding
});

// ✅ Fetch all rows
export const getData = async (): Promise<ApiResponse<string[][]>> => {
  const res = await api.get("/data");
  return res.data;
};

// ✅ Add a new row
export const addData = async (row: string[]): Promise<ApiResponse<null>> => {
  const res = await api.post("/data", { row });
  return res.data;
};

// ✅ Update an existing row
export const updateData = async (
  range: string,
  newValue: string[]
): Promise<ApiResponse<null>> => {
  const res = await api.put("/data", { range, newValue });
  return res.data;
};


// ✅ Delete a row (by range or ID)
export const deleteData = async (range: string): Promise<ApiResponse<null>> => {
  const res = await api.delete("/data", { data: { range } });
  return res.data;
};
