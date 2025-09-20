// src/components/StatsTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function StatsTable({ stats }) {
  if (!stats || stats.length === 0) {
    return <Typography>No statistics available.</Typography>;
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString();
  };
  console.log(stats);
  return (
    <Box>
      {stats.map((s, idx) => (
        <Paper key={idx} sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Short URL:{" "}
            <a href={s.shortUrl} target="_blank" rel="noreferrer">
              {s.shortUrl}
            </a>
          </Typography>
          <Typography>Original URL: {s.originalUrl}</Typography>
          <Typography>Created At: {formatDate(s.createdAt)}</Typography>
          <Typography>Expiry: {formatDate(s.expiry)}</Typography>
          <Typography>Total Clicks: {s.totalClicks}</Typography>

          <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
            Click Details:
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Referrer</TableCell>
                <TableCell>IP</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {s.clicks && s.clicks.length > 0 ? (
                s.clicks.map((c, i) => (
                  <TableRow key={i}>
                    <TableCell>{formatDate(c.timestamp)}</TableCell>
                    <TableCell>{c.referrer || "direct"}</TableCell>
                    <TableCell>{c.ip || "unknown"}</TableCell>
                    <TableCell>{c.location || "unknown"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No clicks recorded yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Box>
  );
}
