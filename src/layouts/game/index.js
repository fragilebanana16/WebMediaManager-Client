import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import { Box, IconButton, Stack, Divider, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const GameDashboard = () => {
  return (
    <>
      <Stack>
          <Outlet />
      </Stack>
    </>
  );
};

export default GameDashboard;
