import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import { Box, IconButton, Stack, Divider, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AdminTopBar from "../../components/Admin/AdminTopBar";
import AdminSideBar from "../../components/Admin//AdminSideBar";
const AdminDashboardLayout = () => {
  return (
    <>
      <Stack direction='column'> {/*if no stack list will under sidebar*/}
        <Box marginTop="10px">
          <AdminTopBar />
        </Box>
      <Stack direction='row'>
        <AdminSideBar />
        <Outlet />
      </Stack>
      </Stack>
    </>
  );
};

export default AdminDashboardLayout;
