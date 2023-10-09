import { useTheme } from "@emotion/react";
import { Box, Stack, Typography  } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Contact from "../../components/Contact";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import StarredMessages from "../../components/StarredMessages"
import Media from "../../components/SharedMessages";
import NoChat from "../../assets/Illustration/NoChat";
import SideBar from "../../layouts/chatDashboard/SideBar"
const ChatApp = () => {
  const theme = useTheme();
  const { sideBar, room_id, chat_type } = useSelector((state) => state.app);
  console.log("Current roomid:" + room_id);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <SideBar></SideBar>
      {/* left chat */}
      <Chats />
      {/* conversions */}
      <Box sx={{
        height: "100%", width: sideBar.open ? "calc(100vw - 420px - 320px)" : "calc(100vw - 420px)",
        backgroundColor: theme.palette.mode === "light" ? "#F0F4FA" : theme.palette.background.default
      }}>
      {chat_type === "individual" &&
          room_id !== null ?
       ( <Conversation />) :             
       (<Stack
              spacing={2}
              sx={{ height: "100%", width: "100%" }}
              alignItems="center"
              justifyContent={"center"}
            >
            <NoChat/>
              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>)}
      </Box>
      
      {/* conversions */}
      {sideBar.open && (() => {
            switch (sideBar.type) {
              case "CONTACT":
                return <Contact />;

              case "STARRED":
                return <StarredMessages />;

              case "SHARED":
                return <Media />;

              default:
                break;
            }
          })()}
    </Stack>
  );
};

export default ChatApp;
