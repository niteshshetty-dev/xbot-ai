import { Typography, Stack, Box, Grid, Button } from "@mui/material";
import SearchBar from "../../Components/PromptBar/PromptBar";
import { useContext, useState } from "react";
import data from "../../aiData/sampleData.json";
import { ThemeContext } from "../../Components/Theme/ThemeContext";
import NavBar from "../../Components/NavBar/NavBar";
import Hero from "../../Components/Hero/Hero";
import PromptBar from "../../Components/PromptBar/PromptBar";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);

  const { mode, setMode } = useContext(ThemeContext);

  function handleChat(event) {
    event.preventDefault();
    const match = data.find((item) => item.question === prompt);

    setConversation([
      ...conversation,
      {
        prompt,
        response:
          match?.response ||
          "As an AI Language Model, I don’t have the details",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);

    setPrompt("");
  }

  return (
    <>
      <Stack
        height={"100vh"}
        justifyContent={"space-between"}
        sx={{
          "@media (max-width:767px)": {
            background:
              mode == "light" ? "linear-gradient(#F9FAFA 60%, #EDE4FF)" : "",
          },
        }}
      >
        <NavBar />
        {conversation.length == 0 && <Hero />}
        <PromptBar
          prompt={prompt}
          setPrompt={setPrompt}
          handleChat={handleChat}
        />
      </Stack>
    </>
  );
}
