import { Container, Stack } from "@mui/system";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box} from "@mui/material";
// const { isLoggedIn } = useSelector((state) => state.auth);
const FilesLayout = () => {
  // if(isLoggedIn){
  //   return <Navigate to="/videos_app">
  //   </Navigate>
  // }

  return (
    <>
      <Box sx={{backgroundColor: "#10131a",width:"100%" , height:"100%"}}>
        <Outlet />
      </Box>
    </>
  );
};

export default FilesLayout;
