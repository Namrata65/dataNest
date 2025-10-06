 import { api } from './api';

export interface DataItem {
  id: string;
  name: string;
  value: string;
}

// Read all items
export const getItems = async (): Promise<DataItem[]> => {
  const response = await api.get<DataItem[]>('/items');
  return response.data;
};

// Create item
export const createItem = async (item: Omit<DataItem, 'id'>): Promise<DataItem> => {
  const response = await api.post<DataItem>('/items', item);
  return response.data;
};

// Update item
export const updateItem = async (
  id: string,
  updatedFields: Partial<DataItem>
): Promise<DataItem> => {
  const response = await api.put<DataItem>(`/items/${id}`, updatedFields);
  return response.data;
};

// Delete item
export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};
