import { CssBaseline, Grid, Stack } from "@mui/material";
import "./App.css";
import SideBar from "./Components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { getThemePallete } from "./Components/Theme/ThemePalate";
import { ThemeContext } from "./Components/Theme/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  return (
    <>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Grid
            container
            sx={{
              background:
                "linear-gradient(rgba(215, 199, 244, 0.2), rgba(151, 133, 186, 0.2))",
            }}
          >
            <Grid
              size={{ xs: 12, md: 2.5 }}
              position={{ xs: "fixed", md: "relative" }}
              height={"100vh"}
              zIndex={{ xs: 9999, md: 1 }}
              sx={{
                bgcolor: "primary.light",
                "@media (max-width:800px)": {
                  width: "70%",
                  transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
                  transition: "transform 400ms ease",
                },
              }}
            >
              <SideBar setConversation closeMenu={() => setMenuOpen(false)} />
            </Grid>
            <Grid size={{ xs: 12, md: 9.5 }}>
              <Outlet
                context={{
                  prompt,
                  setPrompt,
                  handleMobileMenu: () => setMenuOpen(true),
                }}
              />
            </Grid>
          </Grid>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
