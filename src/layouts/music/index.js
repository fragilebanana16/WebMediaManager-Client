import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Box, IconButton, Stack, Divider, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SpotifySidebar from "../../components/music/SpotifySidebar";
import styled from "styled-components";

const MusicDashboard = () => {
  return (
    <>
    <Container>
      <Stack direction="row" >
      <div className="spotify__body">
      <SpotifySidebar/>
      <Outlet />
      </div>
      </Stack>
    </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;
export default MusicDashboard;
