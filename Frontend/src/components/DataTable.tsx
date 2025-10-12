import React, { useEffect, useState, type ChangeEvent } from "react";
import { getData, addData, updateData, deleteData } from "../api/api";

// Define the component type
const DataTable: React.FC = () => {
    // Each row is an array of strings
    const [rows, setRows] = useState<string[][]>([]);
    const [newRow, setNewRow] = useState<string[]>(["", "", "", "", ""]);
    
    const demoData = [
        ["123-456-7890", "John Doe", "johndoe@example.com", "123 Elm St, Springfield, IL, 62701", "Total Spend: $1200, Last Purchase: 2025-09-30"],
        ["987-654-3210", "Jane Smith", "janesmith@example.com", "456 Oak St, Chicago, IL, 60601", "Total Spend: $850, Last Purchase: 2025-10-01"],
        ["555-123-4567", "Mike Johnson", "mikej@example.com", "789 Pine St, Dallas, TX, 75201", "Total Spend: $600, Last Purchase: 2025-08-25"],
        ["666-789-1234", "Emily Davis", "emilydavis@example.com", "321 Maple St, Boston, MA, 02108", "Total Spend: $1500, Last Purchase: 2025-09-29"],
        ["777-555-9876", "Chris Lee", "chrislee@example.com", "654 Birch St, Seattle, WA, 98101", "Total Spend: $300, Last Purchase: 2025-07-19"]
    ];


    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Simulating API call with demo data
                const res = { data: demoData };
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
