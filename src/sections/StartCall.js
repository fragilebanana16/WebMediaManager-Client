import React, { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Slide, Stack, useTheme, } from "@mui/material";
import { Search, SearchIconWrapper, StyledInputBase, } from "../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../components/CallElement";
import { MembersList } from "../data";
import { useDispatch, useSelector } from "react-redux";
// import { FetchAllUsers } from "../../redux/slices/app";
import { faker } from "@faker-js/faker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  const { all_users } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const theme = useTheme();
  // useEffect(() => {
  //   dispatch(FetchAllUsers());
  // }, []);

  // console.log(CallList, all_users, "Call List Info");

  const list = all_users.map((el) => ({
    id: el?._id,
    name: `${el?.firstName} ${el?.lastName}`,
    image: faker.image.avatar(),
  }));

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      <DialogTitle>{"Start New Conversation"}</DialogTitle>
      <Stack p={1} sx={{ width: "100%" }}>
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
      <DialogContent sx={{
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
        }
      }}>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.4}
          >
            {MembersList.map((el, idx) => {
              return <CallElement key={idx} {...el} handleClose={handleClose} />;
            })}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
