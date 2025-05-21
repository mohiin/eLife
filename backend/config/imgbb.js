
// config/imgbb.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function uploadToImgBBBuffer(buffer) {
  const base64 = buffer.toString("base64");
  const response = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      key: process.env.IMGBB_API_KEY,
      image: base64,
    }),
  });

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.error.message);
  }
  
  return json.data.url;
}


export async function deleteFromImgBB(deleteUrl) {
  const response = await fetch(deleteUrl, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete image: ${errorText}`);
  }
}
