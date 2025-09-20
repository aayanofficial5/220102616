// src/components/UrlInputForm.js
import React from "react";
import { TextField, Box } from "@mui/material";

export default function UrlInputForm({ index, urlData, onChange }) {
  return (
    <Box className="url-input-form">
      <TextField
        label={`Original URL ${index}`}
        variant="outlined"
        fullWidth
        margin="normal"
        value={urlData.longUrl}
        onChange={(e) => onChange(urlData.id, "longUrl", e.target.value)}
      />
      <TextField
        label="Validity (minutes)"
        type="number"
        variant="outlined"
        margin="normal"
        value={urlData.validity}
        onChange={(e) => onChange(urlData.id, "validity", e.target.value)}
      />
      <TextField
        label="Preferred Shortcode (optional)"
        variant="outlined"
        margin="normal"
        value={urlData.shortcode}
        onChange={(e) => onChange(urlData.id, "shortcode", e.target.value)}
      />
    </Box>
  );
}
