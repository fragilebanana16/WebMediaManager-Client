import React, { useEffect, useRef } from "react";
import { Box, IconButton, Stack, Divider, Switch, InputAdornment, TextField, Badge, Avatar, Typography } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
const Conversation = () => {
    const theme = useTheme();
    // const isMobile = useResponsive("between", "md", "xs", "sm");
    const messageListRef = useRef(null);
    const { current_messages } = useSelector(
      (state) => state.conversation.direct_chat
    );
  
    useEffect(() => {
        console.log("Conversation changed.");
      // Scroll to the bottom of the message list when new messages are added
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }, [current_messages]);
  
    return (
        <Stack
            height={"100%"}
            maxHeight={"100vh"}
            width={"auto"}
        >
            {/* ChatHeader */}
            <Header>
            </Header>
            {/* msg */}
            <Box 
            ref={messageListRef}
            width={"100%"}
            sx={{
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : 
            theme.palette.background.paper,
                flexGrow: 1, width: "100%", height: "100%", overflow: "hidden",
                overflowY: "scroll",
                '&::-webkit-scrollbar': {
                    width: '0.4em',
                },
                '&::-webkit-scrollbar-track': {
                    background: theme.palette.mode === "light" ? "#f1f1f1" : theme.palette.background.paper,
                    borderRadius: '100vw',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.mode === "light" ? '#8885' : '#8884',
                    borderRadius: '100vw',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: theme.palette.mode === "light" ? '#888' : '#8888',
                },
                paddingRight: '2px',
            }}>
                <Message menu={true}/>
            </Box>

            {/* ChatFooter */}
            <Footer>
            </Footer>
        </Stack>
    )
}

export default Conversation;
