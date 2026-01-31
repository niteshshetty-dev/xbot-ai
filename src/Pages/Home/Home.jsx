import { Typography, Stack, Box, Grid, Button, Snackbar } from "@mui/material";
import { useContext, useState } from "react";
import data from "../../aiData/sampleData.json";
import { ThemeContext } from "../../Components/Theme/ThemeContext";
import NavBar from "../../Components/NavBar/NavBar";
import Hero from "../../Components/Hero/Hero";
import PromptBar from "../../Components/PromptBar/PromptBar";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ChattingCard from "../../Components/ConversationCard/ConversationCard";
import FeedbackModal from "../../Components/FeedbackModal/FeedbackModal";

export default function Home() {
  const [conversation, setConversation] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [chatId, setChatId] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const { prompt, setPrompt } = useOutletContext();

  const { mode } = useContext(ThemeContext);
  function handleChat(event) {
    event.preventDefault();
    const match = data.find((item) => item.question === prompt);

    setConversation([
      ...conversation,
      {
        type: "Human",
        text: prompt,
        time: new Date(),
        id: chatId,
      },
      {
        type: "AI",
        text:
          match?.response ||
          "As an AI Language Model, I don’t have the details",
        time: new Date(),
        id: chatId + 1,
      },
    ]);
    setChatId((prev) => prev + 2);
  }
  function saveChat() {
    const chat_history = JSON.parse(localStorage.getItem("chat")) || [];

    const date = new Date();

    localStorage.setItem(
      "chat",
      JSON.stringify([{ chat: conversation, datetime: date }, ...chat_history]),
    );
    setConversation([]);
    setShowSnackbar(true);
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
        {conversation.length > 0 && (
          <Stack
            height={1}
            flexGrow={0}
            p={{ xs: 2, md: 3 }}
            spacing={{ xs: 2, md: 3 }}
            sx={{
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "10px",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(151, 133, 186,0.4)",
                borderRadius: "8px",
              },
            }}
          >
            {conversation.map((item, index) => (
              <ChattingCard
                details={item}
                key={index}
                updateChat={setConversation}
                setSelectedChatId={setSelectedChatId}
                showFeedbackModal={() => setShowModal(true)}
              />
            ))}
          </Stack>
        )}

        <PromptBar
          prompt={prompt}
          setPrompt={setPrompt}
          handleChat={handleChat}
          saveChat={saveChat}
        />
        <Snackbar
          open={showSnackbar}
          message={"Chat saved."}
          onClose={() => setShowSnackbar(false)}
          autoHideDuration={5000}
          action={
            <Link to="/history">
              <Button size="small">See past conversations</Button>
            </Link>
          }
        />
        <FeedbackModal
          open={showModal}
          updateChat={setConversation}
          chatId={selectedChatId}
          handleClose={() => setShowModal(false)}
        />
      </Stack>
    </>
  );
}
