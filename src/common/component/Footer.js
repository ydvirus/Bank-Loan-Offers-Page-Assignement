import { Box, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box>
      <Box
        sx={{
          background:
            "linear-gradient(0deg, rgba(217,232,242,1) 0%, rgba(245,248,251,1) 100%)",
          borderTop: "2px solid #cfe2ef",
          minHeight: "32px",
          height: "32px",
          color: "#325787",
          justifyContent:"left",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px"
        }}
      >
        Get funds instantly
      </Box>
      <Box>
        <ul style={{ listStylePosition: "inside" }}>
          <li style={{ listStyleType: "disc"}}>
            This is a straight through process for available loan on Citi
            credit. To know more 
            <Typography component="span" sx={{ color: "#7e7d7e", textDecoration: "underline" }}>
              click here
            </Typography>
            (FAQ).
          </li>
        </ul>
      </Box>
    </Box>
  );
}

export default Footer;
