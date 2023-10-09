import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeft } from "phosphor-react";
// import useResponsive from "../hooks/useResponsive";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import Conversation from "./Conversation";
import Message from "./Conversation/Message";

const StarredMessages = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const isDesktop = useResponsive("up", "md");

  return (
    <Box sx={{ width: 320, maxHeight: "100vh", backgroundColor:
    theme.palette.mode === "light" ? "#F8FAFF" : 
    theme.palette.background.paper}}>
      <Stack sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",
          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}
          >
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "hidden",
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
          }}
          spacing={3}
        >
        {/* menu: dot menu */}
          <Message menu={false}/>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
