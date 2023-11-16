import React, { useEffect } from "react";
import { Dialog, DialogContent, Slide, Stack, Tab, Tabs, Box, Fade } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import { FriendElement, FriendRequestElement, UserElement } from "./UserElement";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const UsersList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchUsers());
  }, []);

  return (
    <>
    <UserElement key={"idx1"} name={"Fake1"} _id={"test_add_id"}/>
    <UserElement key={"idx2"} name={"Fake2"} />
    <UserElement key={"idx3"} name={"Fake3"} />
    <UserElement key={"idx4"} name={"Fake4"} />
    {users.map((el, idx) => {
        return <UserElement key={idx} {...el} />;
      })}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);

  return (
    <>
      {friends.map((el, idx) => {
        return <FriendElement key={idx} {...el} />;
      })}

      <FriendElement key={"idx1"} name={"Fake1"} />
    <FriendElement key={"idx2"} name={"Fake2"} />
    <FriendElement key={"idx3"} name={"Fake3"} />
    <FriendElement key={"idx4"} name={"Fake4"} />
    </>
  );
};

const RequestsList = () => {
  const dispatch = useDispatch();

  const { friendRequests } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, []);

  return (
    <>
      {friendRequests.map((el, idx) => {
        return <FriendRequestElement key={idx} {...el.sender} id={el._id} />;
      })}
    </>
  );
};

const FindFriends = ({ open, handleClose }) => {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      {/* <DialogTitle>{"Friends"}</DialogTitle> */}
      <Stack p={1} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Requests" />
        </Tabs>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={1} sx={{ height: "200px" ,
                        position: "relative",
                        flexGrow: 1,
                        overflow: "hidden",
                        overflowY: "auto",
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
                    }}>
            {(() => {
              switch (value) {
                case 0: // display all users in this list
                  return <UsersList />;

                case 1: // display friends in this list
                  return <FriendsList />;

                case 2: // display request in this list
                  return <RequestsList />;

                default:
                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default FindFriends;
