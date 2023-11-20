import { useTheme } from "@emotion/react";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect } from "react";
import Contact from "../../components/Contact";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import StarredMessages from "../../components/StarredMessages"
import Media from "../../components/SharedMessages";
import NoChat from "../../assets/Illustration/NoChat";
import ChatSideBar from "../../layouts/chatDashboard/ChatSideBar"
import ChatElement from "../../components/ChatElement";
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users, } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";

const dummyFriendsData = [
  {    id: 1,    name: "dickens",    msg: "hihihi",    time: "09:55",    unread: 2  },  
  {    id: 2,    name: "tom",    msg: "dadada",    time: "18:23",    unread: 33  },  
  {    id: 3,    name: "Nom",    msg: "dadada",    time: "18:23",    unread: 33  }, 
  {    id: 4,    name: "Zom",    msg: "dadada",    time: "18:23",    unread: 33  }, 
  {    id: 5,    name: "eom",    msg: "dadada",    time: "18:23",    unread: 33  }, 
  {    id: 6,    name: "pp",    msg: "dadada",    time: "18:23",    unread: 33  }, 
  {    id: 7,    name: "qq",    msg: "dadada",    time: "18:23",    unread: 33  }, 
  {    id: 8,    name: "zz",    msg: "dadada",    time: "18:23",    unread: 33  }, 
  {    id: 9,    name: "Az",    msg: "xiebro",    time: "18:23",    unread: 33  }, 
]

// Arranged by alphabet friends list
const GetFriendsInAlphaOrder = (friends) => {
  if(!friends){
    return;
  }

  const grouped = friends.reduce(
    (groupedRows, row) => {
      const firstLetter = row.name.slice(0, 1).toUpperCase();
      return {
        ...groupedRows,
        [firstLetter]: [...(groupedRows[firstLetter] || []), row]
      }
    }, {}
  )

  return Object.keys(grouped).map((key) => [key, grouped[key]]).sort();
}

const Friends = () => {
  const { friends } = useSelector((state) => state.app);
  const theme = useTheme();
  const groupedByAlpha = GetFriendsInAlphaOrder([...friends, ...dummyFriendsData]);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <ChatSideBar />
      <Box sx={{
        position: 'relative',
        width: 320,
        backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
      }}>
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack direction={"row"} alignItems="center" spacing={1} justifyContent="space-between">
            <Typography variant="h5">
              Friends
            </Typography>
            <IconButton
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
            <Divider />
          </Stack>


          <Stack spacing={2} sx={{
            flexflow: 1, height: "100%", overflow: "hidden",
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

            <Stack spacing={2.4}>
              {groupedByAlpha.map((el, idx) => {
                return <Box key={idx} >
                  <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                    {el[0]}
                  </Typography>

                  {el[1].map((el, idx) => {
                    return <ChatElement  key={idx} {...el} />;
                  })}
                </Box>
              })}
            </Stack>
          </Stack>
        </Stack>
      </Box>

    </Stack>
  );
};

export default Friends;
