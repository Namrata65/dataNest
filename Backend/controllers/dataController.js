
import { getData, addData, updateData, deleteData } from "../services/googleSheetsService.js";

export const getAll = async (req, res) => {
  try {
    const data = await getData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addRow = async (req, res) => {
  try {
    const { row } = req.body;
    await addData(row);
    res.status(201).json({ message: "Row added" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRow = async (req, res) => {
  try {
    const { range, newValue } = req.body;
    await updateData(range, newValue);
    res.json({ message: "Row updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRow = async (req, res) => {
  try {
    const { range } = req.body;
    await deleteData(range);
    res.json({ message: "Row deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
