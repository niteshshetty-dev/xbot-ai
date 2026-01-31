import { Stack, Typography, Box, Grid } from "@mui/material";
import logo from "../../assets/logo.png";
import Card from "./Card";

export default function Hero() {
  const initialData = [
    {
      heading: "Hi, what is the weather",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, what is my location",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, what is the temperature",
      subtext: "Get immediate AI generated response",
    },
    {
      heading: "Hi, how are you",
      subtext: "Get immediate AI generated response",
    },
  ];

  return (
    <>
      <Stack height={1} justifyContent={"flex-end"} p={{ xs: 2, md: 3 }}>
        <Stack alignItems={"center"} spacing={2} my={5}>
          <Typography variant="h2" component="h2">
            How Can I Help You Today?
          </Typography>
          <Box
            component="img"
            src={logo}
            alt="logo"
            height={{ xs: 42, md: 70 }}
            width={{ xs: 42, md: 70 }}
            borderRadius={"50%"}
          ></Box>
        </Stack>
        <Grid container spacing={{ xs: 1, md: 3 }}>
          {initialData.map((item, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card heading={item.heading} subtext={item.subtext} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
