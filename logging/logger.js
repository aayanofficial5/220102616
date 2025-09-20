import axios from "axios";

const LOG_API = "http://20.244.56.144/evaluation-service/logs";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIxMDAwMDE4ODkyQGRpdC5lZHUuaW4iLCJleHAiOjE3NTgzNDc0NjEsImlhdCI6MTc1ODM0NjU2MSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjM2OWM4OTNhLWY2ZDItNDM5OS1hNzIyLWRiMDk5MTgwYzgxNCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFheWFuIHBhdGVsIiwic3ViIjoiZGMxNDJlNmMtOWQ2MS00MzYzLTlkZjEtMTQ0MjYyZTBhYmEyIn0sImVtYWlsIjoiMTAwMDAxODg5MkBkaXQuZWR1LmluIiwibmFtZSI6ImFheWFuIHBhdGVsIiwicm9sbE5vIjoiMjIwMTAyNjE2IiwiYWNjZXNzQ29kZSI6IlNrbW5ldyIsImNsaWVudElEIjoiZGMxNDJlNmMtOWQ2MS00MzYzLTlkZjEtMTQ0MjYyZTBhYmEyIiwiY2xpZW50U2VjcmV0IjoiTVhQRXdOdGJqU2NNbk1tTiJ9.5poTpyxPOfsL1FOFz4_YHLVSijMiWFfb_eXsweXMuk4";

export async function log(stack, level, pkg, message) {
  try {
    await axios.post(
      LOG_API,
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error("Log failed:", err.response?.data || err.message);
  }
}
