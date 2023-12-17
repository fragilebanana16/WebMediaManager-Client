import { useTheme } from "@emotion/react";
import { Box, Stack, Typography  } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Spotify from "../../components/music/Spotify";

const MusicApp = () => {
  const theme = useTheme();
  return (
    <Stack>
      <Spotify />
    </Stack>
  );
};

export default MusicApp;
