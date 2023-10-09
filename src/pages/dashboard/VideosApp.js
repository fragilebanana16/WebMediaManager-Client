import { useTheme } from "@emotion/react";
import { Box, Stack, Typography  } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import VideoNavBar from "../../components/videos/VideoNavBar"
import TopFeatured from "../../components/videos/TopFeatured"
const VideosApp = () => {
  const theme = useTheme();
  return (
    <Stack direction={"column"} sx={{ backgroundColor: "#10131a"}} >

        <VideoNavBar />
        <TopFeatured />

    </Stack>
  );
};

export default VideosApp;
