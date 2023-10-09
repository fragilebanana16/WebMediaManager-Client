import { useTheme } from "@emotion/react";
import { Box, Stack, Typography  } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import FileUpload from "../../components/File/FileUpload";

const FilesApp = () => {
  const theme = useTheme();
  return (
    <Stack sx={{ backgroundColor: "#10131a"}} >
        <FileUpload></FileUpload>
    </Stack>
  );
};

export default FilesApp;
