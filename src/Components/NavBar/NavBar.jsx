import { Stack, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useOutletContext } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../Components/Theme/ThemeContext";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function NavBar() {
  const { mode, setMode } = useContext(ThemeContext);
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { handleMobileMenu } = useOutletContext();
  return (
    <>
      <Stack
        component={"header"}
        p={{ xs: 2, md: 3 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {isMobile && <MenuIcon onClick={handleMobileMenu} />}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h1" component="h1">
              Bot AI
            </Typography>
          </Link>
        </Stack>

        <Stack direction="row" spacing={0.2} alignItems="center">
          <Typography textTransform={"capitalize"} fontSize={10}>
            {mode}
          </Typography>
          <IconButton
            onClick={() =>
              setMode((prev) => (prev == "light" ? "dark" : "light"))
            }
          >
            {mode == "light" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
