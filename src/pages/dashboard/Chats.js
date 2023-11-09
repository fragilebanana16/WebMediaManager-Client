import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import React,{useEffect, useState} from "react";
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users, } from "phosphor-react";
import { useTheme, styled } from "@mui/material/styles";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import { ChatList } from "../../data";
import FindFriends from "../../components/Chat/FindFriends";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/socket";
import { FetchDirectConversations } from "../../redux/slices/conversation";
const user_id = window.localStorage.getItem("user_id");
const Chats = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);
    const [filterOnloneConversations, setFilterOnloneConversations] = useState();
    const {conversations} = useSelector((state) => state.conversation.direct_chat);
    // const {onlineUsers} = useSelector((state) => state.app.onlineUsers);
    const [onlineUserIDs, setOnlineUserIDs] = useState([]);


    useEffect(() => {
        socket.emit("get_direct_conversations", { user_id }, (data) => {
        //   console.log(data); // this data is the list of conversations
          // dispatch action
          dispatch(FetchDirectConversations({ conversations: data }));
        });
      }, []);

      useEffect(() => {

        console.log("Chat use effect excute...");
        socket.emit("get_online_users",  (data) => {
          var onlineUseridsData = data.map((user) => user.userID);
          setOnlineUserIDs(onlineUseridsData)
        });

        
        socket.on("user_disconnected", (user_id) => {
            console.log("user_disconnected before we have "+ onlineUserIDs.length+ " online user"); 
            setOnlineUserIDs(onlineUserIDs.filter(id => id !== user_id))
            let nowUsers = onlineUserIDs.filter(id => id !== user_id)
            console.log("user_disconnected now we have "+ nowUsers.length+ " online user:" + nowUsers); 
          });

          socket.on("user_connected", ({userSocketID, userID}) => {
            if (userSocketID === socket.id) {
                return; // its myself no need to update
            }
            setOnlineUserIDs( prevState => [...prevState, userID]);
            
            console.log("user_connected:" + userID); 
          });

      }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    return (
        <>
            <Box sx={{
                position: 'relative',
                width: 320,
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
            }}>
                <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
                    <Stack direction={"row"} alignItems="center" spacing={1} justifyContent="space-between">
                        <Typography variant="h5">
                            Chats
                        </Typography>
                        <IconButton
                            onClick={() => {
                                handleOpenDialog();
                            }}
                            sx={{ width: "max-content" }}
                        >
                            <Users />
                        </IconButton>
                        <IconButton sx={{ width: "max-content" }}>
                            <CircleDashed />
                        </IconButton>

                    </Stack>

                    <Stack sx={{ width: "100%" }} >
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" ></MagnifyingGlass>
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}></StyledInputBase>
                        </Search>
                    </Stack>

                    <Stack spacing={1}>
                        <Stack direction={"row"} spacing={1.5} alignItems="center">
                            <ArchiveBox size={24} />
                            <Button variant="text">Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>

                    {/* https://stackoverflow.com/questions/53772429/material-ui-how-can-i-style-the-scrollbar-with-css-in-js */}
                    {/* https://www.youtube.com/watch?v=lvKK2fs6h4I */}
                    {/* pinned */}
                    <Stack spacing={2} sx={{
                        flexflow: 1, height: "100%", overflow: "hidden",
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
                        paddingRight: '2px',
                    }} direction="column">
                        <Stack spacing={2.4}>
                            {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                Pinned
                            </Typography>
                            {ChatList.filter((el) => el.pinned).map((el, idx) => {
                                return <ChatElement key={el.id} {...el} />;
                            })} */}
                        </Stack>

                        {/* all */}
                        <Stack spacing={2.4}>
                            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                                All
                            </Typography>
                            {/* {ChatList.filter((el) => !el.pinned).map((el, idx) => {
                                return <ChatElement key={el.id} {...el} />;
                            })} */}
                            {conversations.filter((el) => !el.pinned).map((el, idx) => {
                                return <ChatElement key={el.id} {...el} isOnline={onlineUserIDs?.includes(el.user_id)}/>;
                            })}
                        </Stack>

                    </Stack>
                </Stack>
            </Box>
            {openDialog && (
                <FindFriends open={openDialog} handleClose={handleCloseDialog} />
            )}
        </>
    );
};

export default Chats;