"use client";
// App.js
import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerticalTabs from "./components/Sidebar"; // Adjust path if necessary

// Create a theme instance
const theme = createTheme();

const Sidebar = styled(Paper)(({ theme, open }) => ({
  padding: theme.spacing(2),
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  position: "fixed",
  width: open ? "240px" : "0",
  top: 0,
  left: 0,
  overflowX: "hidden",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Header = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1, 2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100vw", // Full viewport width
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: theme.zIndex.appBar,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Content = styled(Paper)(({ theme, open }) => ({
  padding: theme.spacing(2),
  marginTop: "64px", // To make space for the fixed header
  marginLeft: open ? "240px" : "0", // Adjust content margin based on sidebar state
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function App() {
  const [openSidebar, setOpenSidebar] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (isMobile) {
      setOpenSidebar(false);
    } else {
      setOpenSidebar(true);
    }
  }, [isMobile]);

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" disableGutters>
        <CssBaseline />
        <Grid container>
          {/* Sidebar */}
          <Sidebar elevation={3} open={openSidebar}>
            <VerticalTabs
              selectedTab={selectedTab}
              onTabChange={handleTabChange}
            />
          </Sidebar>

          {/* Main Content */}
          <Grid item xs>
            <Box display="flex" flexDirection="column" height="100vh">
              {/* Header */}
              <Header elevation={3}>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setOpenSidebar(!openSidebar)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6">Dashboard Header</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton color="inherit">
                    <NotificationsIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <AccountCircleIcon />
                  </IconButton>
                </Box>
              </Header>

              {/* Content */}
              <Box flex={1}>
                <Content elevation={0} open={openSidebar}>
                  {/* Display the content for the selected tab */}
                  <Typography variant="h4">
                    {selectedTab === 0 && "Content for Item One"}
                    {selectedTab === 1 && "Content for Item Two"}
                    {selectedTab === 2 && "Content for Item Three"}
                    {selectedTab === 3 && "Content for Item Four"}
                    {selectedTab === 4 && "Content for Item Five"}
                    {selectedTab === 5 && "Content for Item Six"}
                    {selectedTab === 6 && "Content for Item Seven"}
                  </Typography>
                </Content>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
