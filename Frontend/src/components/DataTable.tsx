import React, { useEffect, useState, type ChangeEvent } from "react";
import { getData, addData, updateData, deleteData } from "../api/api";

// Define the component type
const DataTable: React.FC = () => {
    // Each row is an array of strings
    const [rows, setRows] = useState<string[][]>([]);
    const [newRow, setNewRow] = useState<string[]>(["", "", "", "", ""]);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getData();
                setRows(res.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Handle adding a new row
    const handleAdd = async () => {
        try {
            await addData(newRow);
            const res = await getData();
            setRows(res.data || []);
            setNewRow(["", "", "", "", ""]);
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    // Handle updating a specific cell
    const handleUpdate = async (rowIndex: number, colIndex: number) => {
        try {
            const range = `Sheet1!${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`;
            const newValue = rows[rowIndex]; // ✅ Correct type: string[]
            await updateData(range, newValue);
            const res = await getData();
            setRows(res.data || []);
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };



    // Handle deleting a specific row
    const handleDelete = async (rowIndex: number) => {
        try {
            const range = `Sheet1!A${rowIndex + 1}:E${rowIndex + 1}`;
            await deleteData(range);
            const res = await getData();
            setRows(res.data || []);
        } catch (error) {
            console.error("Error deleting row:", error);
        }
    };

    // Handle new row input
    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const updated = [...newRow];
        updated[index] = event.target.value;
        setNewRow(updated);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>📊 Google Sheets Data</h2>

            {/* Data Table */}
            <table
                style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    marginBottom: "20px",
                }}
            >
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "8px",
                                    }}
                                    onDoubleClick={() => handleUpdate(rowIndex, colIndex)}
                                >
                                    {cell}
                                </td>
                            ))}
                            <td>
                                <button onClick={() => handleDelete(rowIndex)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Row Section */}
            <div style={{ display: "flex", gap: "8px" }}>
                {newRow.map((cell, i) => (
                    <input
                        key={i}
                        value={cell}
                        placeholder={`Column ${i + 1}`}
                        onChange={(e) => handleInputChange(i, e)}
                        style={{
                            padding: "6px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                ))}
                <button
                    onClick={handleAdd}
                    style={{
                        padding: "6px 12px",
                        borderRadius: "4px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default DataTable;
