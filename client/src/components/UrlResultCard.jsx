// src/components/UrlResultCard.js
import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function UrlResultCard({ result }) {
  console.log(result);
  return (
    <Card className="result-card" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="body1">
          <strong>Original:</strong> {result.originalUrl}
        </Typography>
        <Typography variant="body1">
          <strong>Shortened:</strong>{" "}
          <Link
            href={result.shortLink || result.shortUrl}
            target="_blank"
            rel="noopener"
          >
            {result.shortLink || result.shortUrl}
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Expiry: {new Date(result.expiry).toLocaleString()}
        </Typography>

        {result.clickDetails && result.clickDetails.length > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Click History:
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Referrer</TableCell>
                  <TableCell>IP</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.clickDetails.map((click, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      {new Date(click.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{click.referrer}</TableCell>
                    <TableCell>{click.ip}</TableCell>
                    <TableCell>{click.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
