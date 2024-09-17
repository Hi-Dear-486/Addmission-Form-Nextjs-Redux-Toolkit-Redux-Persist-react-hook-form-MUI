"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";

// Styled Tabs component with top padding
const CustomTabs = styled(Tabs)(({ theme }) => ({
  height: "100%", // Ensure the tabs container takes full height
  overflowY: "auto", // Enable vertical scrolling if needed
  paddingTop: theme.spacing(8), // Add top padding
  "& .MuiTabs-indicator": {
    display: "none", // Hide the default indicator
  },
}));

// Styled Tab component with border shown only when selected
const CustomTab = styled(Tab)(({ theme, selected }) => ({
  borderRight: selected ? `4px solid ${theme.palette.primary.main}` : "none", // Show border only if selected
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 0, 1, 0),
  transition: "background-color 0.3s ease, border-color 0.3s ease",
  minWidth: 120, // Ensure all tabs have a minimum width
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ selectedTab, onTabChange }) {
  const handleChange = (event, newValue) => {
    onTabChange(newValue); // Notify parent component about the tab change
  };

  return (
    <CustomTabs
      orientation="vertical"
      variant="scrollable"
      value={selectedTab}
      onChange={handleChange}
      aria-label="Vertical tabs example"
    >
      <CustomTab
        label="Item One"
        {...a11yProps(0)}
        selected={selectedTab === 0}
      />
      <CustomTab
        label="Item Two"
        {...a11yProps(1)}
        selected={selectedTab === 1}
      />
      <CustomTab
        label="Item Three"
        {...a11yProps(2)}
        selected={selectedTab === 2}
      />
      <CustomTab
        label="Item Four"
        {...a11yProps(3)}
        selected={selectedTab === 3}
      />
      <CustomTab
        label="Item Five"
        {...a11yProps(4)}
        selected={selectedTab === 4}
      />
      <CustomTab
        label="Item Six"
        {...a11yProps(5)}
        selected={selectedTab === 5}
      />
      <CustomTab
        label="Item Seven"
        {...a11yProps(6)}
        selected={selectedTab === 6}
      />
    </CustomTabs>
  );
}
