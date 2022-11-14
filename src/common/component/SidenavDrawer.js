import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";

function SidenavDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{ padding: "8px"}}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "#ffffff",
            border: "none",
            color: "#2b226d",
            fontWeight: "500", 
          }}
        >
          {linksNode}
        </Box>
        <Divider />
        <Box
          sx={{
            width: "100%",
            bgcolor: "#ffffff",
            border: "none",
            color: "#2b226d",
            fontWeight: "500",
          }}
        >
          {extraLinksNode}
        </Box>
      </Stack>
    </>
  );

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
        return (
          <li key={index} style={{ cursor: "pointer"}}>
            <KeyboardArrowRightRoundedIcon
              color="primary"
              sx={{ fontSize: 15, fontWeight: "700" }}
            />
            {item}
          </li>
        );
      })}
    </ul>
  );

  const extraLinksNode = (
    <ul>
      {navLinksExtra.map((item, index) => {
        return (
          <li key={index} style={{ cursor: "pointer"}}>
            <KeyboardArrowRightRoundedIcon
              color="primary"
              sx={{ fontSize: 15, fontWeight: "700" }}
            />
            {item}
          </li>
        );
      })}
    </ul>
  );

  return (
    <React.Fragment>
      <MenuIcon
        id="menu-icon"
        onClick={toggleDrawer("left", true)}
        sx={{ paddingRight: "16px" }}
      />
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}

export default SidenavDrawer;
