import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

// ✅ Validate essential env variables
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
  throw new Error("Missing required environment variables for Google Sheets API.");
}

// ✅ Google Auth Setup
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// ✅ READ data
export const getData = async () => {
  try {
    console.log('response here');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1", 
    });
    console.log('response', response.data.values);
    return response.data.values || [];
  } catch (error) {
    console.error("❌ Error reading data from Google Sheets:", error);
    throw new Error("Failed to retrieve data.");
  }
};

// ✅ CREATE (append) data
export const addData = async (row) => {
  if (!Array.isArray(row) || row.length === 0) {
    throw new Error("Invalid input: row must be a non-empty array.");
  }

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });
  } catch (error) {
    console.error("❌ Error appending data:", error);
    throw new Error("Failed to add data.");
  }
};

// ✅ UPDATE specific range
export const updateData = async (range, newValue) => {
  if (!range || !Array.isArray(newValue)) {
    throw new Error("Invalid input: 'range' must be a string and 'newValue' an array.");
  }

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [newValue] },
    });
  } catch (error) {
    console.error("❌ Error updating data:", error);
    throw new Error("Failed to update data.");
  }
};

// ✅ DELETE (clear) specific range
export const deleteData = async (range) => {
  if (!range || typeof range !== "string") {
    throw new Error("Invalid input: 'range' must be a string.");
  }

  try {
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });
  } catch (error) {
    console.error("❌ Error deleting data:", error);
    throw new Error("Failed to delete data.");
  }
};
