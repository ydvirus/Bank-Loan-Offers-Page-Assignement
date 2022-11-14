import { Stack } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import './Sidenav.css'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';

function Sidenav() {
  const navLinks = [
    "View account summary",
    "View active loan details",
    "View/Download statements",
    "Reward catalog redemption",
    "Contact Details",
    "Report lost/stolen card",
    "Loan on credit cards",
    "Pay utility bills",
    "Get topup loan on cards",
    "Click an EMI",
    "Pay credit card bills",
    "Recharge Mobile/DTH",
    "Submit Documents",
    "Manage Cards",
  ];

  const navLinksExtra = [
    "Other Services and Queries",
    "PIN related",
    "Standing instructions",
    "Download Citi mobile app",
  ];

  const linksNode = (
    <ul>
      {navLinks.map((item, index) => {
        return <li key={index} style={{ cursor: "pointer"}} ><KeyboardArrowRightRoundedIcon color="primary" sx={{fontSize: 15, fontWeight: "700"}}/>{ item}</li>;
      })}
    </ul>
  );

  const extraLinksNode = (
    <ul>
      {navLinksExtra.map((item, index) => {
        return <li key={index} style={{ cursor: "pointer"}} ><KeyboardArrowRightRoundedIcon color="primary" sx={{fontSize: 15, fontWeight: "700"}}/>{ item}</li>;
    })}
    </ul>
  );

  return (
    <Stack direction="column" spacing={2} sx={{ paddingRight: "12px", borderRight: "1px dashed #e8e8e8"}}>
      <Box sx={{ width: "100%", bgcolor: "#ffffff", border: "2px solid #dbdcdc",color : "#2b226d", fontWeight: "500", borderRadius: "4px" }} >
        {linksNode}
      </Box>

      <Box sx={{ width: "100%", bgcolor: "#ffffff", border: "2px solid #dbdcdc" ,color : "#2b226d", fontWeight: "500", borderRadius: "4px" }}>
        {extraLinksNode}
      </Box>
    </Stack>
  );
}

export default Sidenav;
