import React, { useEffect } from "react";
import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import ProfileForm from "../../sections/ProfileForm";
import { useDispatch } from "react-redux";
import { FetchUserProfile } from "../../redux/slices/app";

const Profile = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  useEffect(() => {
    dispatch(FetchUserProfile());
  }, []);

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left Pane */}
        <Box
          sx={{
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

            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>

              <Typography variant="h5">Profile</Typography>
            </Stack>

            {/* Profile Edit Form */}
            <ProfileForm />
          </Stack>
        </Box>

        {/* Right Pane */}
        <Box
          sx={{
            height: "100%",
            width: "calc(100vw - 420px )",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#FFF"
                : theme.palette.background.paper,
            borderBottom: "0 px solid #0162C4",
          }}
        ></Box>
      </Stack>
    </>
  );
};

export default Profile;
