import React, { useEffect, useState } from 'react';
import type { DataItem } from '../services/crudService';
import { getItems, deleteItem } from '../services/crudService';

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch items', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteItem(id);
    fetchItems(); // Refresh the list
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.value}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
