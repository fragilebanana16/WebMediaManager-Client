import { Container, Stack } from "@mui/system";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { useDispatch, useSelector } from "react-redux";
import { Typography, } from "@mui/material";
const MainLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if(isLoggedIn){
    return <Navigate to="/">
    </Navigate>
  }

  return (
    <>
      <Container sx={{ pt: 5, }} maxWidth="sm" >
        <Stack spacing={5}>
          <Stack sx={{ width: "100&" }} direction="column" alignItems={"center"}>
            <img style={{ height: 120, width: 120 ,borderRadius: "10px", 
            border: '2px solid rgba(255, 255, 255, 1)'}} src={Logo}></img>
            <Typography variant="h3">Welcome</Typography>
          </Stack>
        </Stack>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
