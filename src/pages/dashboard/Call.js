import { Box, Divider, IconButton, Stack, Typography, Link, } from "@mui/material";
import { MagnifyingGlass, Phone } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";

import { useTheme } from "@mui/material/styles";
// import { SimpleBarStyle } from "../../components/Scrollbar";
import { CallLogElement } from "../../components/CallElement";
// import StartCall from "../../sections/dashboard/StartCall";
import { useDispatch, useSelector } from "react-redux";
// import { FetchCallLogs } from "../../redux/slices/app";
import { CallLogs } from "../../data";
import StartCall from "../../sections/StartCall";

const Call = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(FetchCallLogs());
  // }, []);
  const { call_logs } = useSelector((state) => state.app);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    // console.log("??");
    setOpenDialog(true);
  };
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}

        <Box
          sx={{
            overflow: "hidden",
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.mode === "light" ? "#f1f1f1" : theme.palette.background.paper,
              borderRadius: '100vw',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.mode === "light" ? '#8885' : '#8884',
              borderRadius: '100vw',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: theme.palette.mode === "light" ? '#888' : '#8888',
            },

            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Call Log</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>

            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Start a conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{
              flexGrow: 1,
              overflow: "hidden",
              overflowY: "scroll",
              '&::-webkit-scrollbar': {
                width: '0.4em',
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.mode === "light" ? "#f1f1f1" : theme.palette.background.paper,
                borderRadius: '100vw',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.mode === "light" ? '#8885' : '#8884',
                borderRadius: '100vw',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.mode === "light" ? '#888' : '#8888',
              },
              height: "100%"
            }}>
              {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
              <Stack spacing={2.4}>
                {CallLogs.map((el, idx) => {
                    return <CallLogElement key={idx} {...el} />;
                  })}
              </Stack>
              {/* </SimpleBarStyle> */}
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {openDialog && (
        <StartCall open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Call;
