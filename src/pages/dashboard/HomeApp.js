import { useTheme } from "@emotion/react";
import { Box, Stack, Typography,Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const HomeApp = () => {
  const theme = useTheme();
  return (
    <Stack sx={{ backgroundColor: "#10131a" }} >
      <Button href="/chat" variant="contained">
        Chat
      </Button>
      <Button href="/netflix" variant="contained">
        Video
      </Button>
      <Button href="/files" variant="contained">
        File
      </Button>
      <Button href="/admin" variant="contained">
        Admin
      </Button>
    </Stack>
  );
};

export default HomeApp;
