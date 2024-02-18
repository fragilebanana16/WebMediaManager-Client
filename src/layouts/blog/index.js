import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Logo from "../../assets/Images/logo.ico"
import { Typography, Box } from "@mui/material";
import Header from "../../components/Blog/Header";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
const BlogLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (!isLoggedIn) {
    return <Navigate to="/auth/login">
    </Navigate>
  }

  return (
    <>
      <Container>
        <main>
          <Header />
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default BlogLayout;

const Container = styled.div`
  main{
    padding: 10px;
    max-width: 960px;
    margin: 0 auto;
    }
  
`;