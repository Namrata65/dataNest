import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export const getData = async () => {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1!A1:E",
  });
  return response.data.values;
};

export const addData = async (row) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A1:E",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
};

export const updateData = async (range, newValue) => {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [newValue] }, // expects newValue to be string[]
  });
};


export const deleteData = async (range) => {
  // This is tricky in Google Sheets; you’d typically clear a range
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });
};
