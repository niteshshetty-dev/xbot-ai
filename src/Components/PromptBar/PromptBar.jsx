import { Stack, Box, TextField, Button } from "@mui/material";

export default function PromptBar({ prompt, setPrompt, handleChat, saveChat }) {
  return (
    <Box flexShrink={0} px={{ xs: 0.5, md: 2 }}>
      <Box component={"form"} onSubmit={handleChat}>
        <Stack
          direction={"row"}
          spacing={{ xs: 1, md: 2 }}
          p={{ xs: 2, md: 3 }}
        >
          <TextField
            placeholder="Message Bot Ai..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{
              flex: 1,
              bgcolor: "primary.light",
              borderRadius: 1,
              "& input": {
                fontSize: { xs: 12, md: 16 },
                paddingLeft: { xs: 1, md: 2 },
                paddingRight: { xs: 1, md: 2 },
              },
            }}
            required
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            Ask
          </Button>
          <Button
            variant="outlined"
            onClick={saveChat}
            sx={{
              fontSize: { xs: 12, md: 16 },
              "@media (max-width:767px)": {
                minWidth: 0,
                paddingLeft: 1.5,
                paddingRight: 1.5,
              },
            }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
