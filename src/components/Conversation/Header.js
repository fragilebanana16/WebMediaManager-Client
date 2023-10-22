import React, { useState,useEffect, useMemo } from "react";
import { Box, IconButton, Stack, Divider, Switch, InputAdornment,TextField, Badge, Avatar, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import { faker } from "@faker-js/faker";
import { useTheme, styled } from "@mui/material/styles";
import {    CaretDown, MagnifyingGlass, Phone, VideoCamera, LinkSimple,    PaperPlaneTilt,    Smiley,
} from "phosphor-react";
import StyledBadge from "../StyledBadge";
import { ToggleSidebar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../utils/socket";

const Header = () => {
    const theme = useTheme();
    const [typingStatus, setTypingStatus] = useState("")
    const dispatch = useDispatch();
    const { current_conversation } = useSelector(
        (state) => state.conversation.direct_chat
      );

      useEffect(()=> {
        socket.on("typingResponse", data => {
            console.log("time");
                setTypingStatus(data);
                    })
      }, [socket])

    return (
            <Box p={2} sx={{ width: "100%", 
            backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : 
            theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)" }}>
                <Stack
                    alignItems={"center"}
                    direction={"row"}
                    sx={{ width: "100%", height: "100%" , }}
                    justifyContent="space-between"
                >
                    {/* left avatar */}
                    <Stack
                        onClick={() => {
                            dispatch(ToggleSidebar()) // call (), only func name wont work
                        }}
                        spacing={2}
                        direction="row"
                        sx={{cursor:"pointer"}}
                    >
                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                variant="dot"
                            >
                                <Avatar
                                    alt={faker.name.fullName()}
                                    src={faker.image.avatar()}
                                />
                            </StyledBadge>
                        </Box>
                        <Stack spacing={0.2}>
                            <Typography variant="subtitle2">
                                {current_conversation && current_conversation.name}
                            </Typography>
                            <Typography variant="caption">Online</Typography>
                        </Stack>

                    </Stack>

                    <Stack>
                    <Typography variant="caption">{typingStatus}</Typography>
                    </Stack>
                    {/* right icon  */}
                    <Stack
                        direction={"row"}
                        alignItems="center"
                        spacing={3}
                    >
                        <IconButton onClick={() => {
                        }}>
                            <VideoCamera />
                        </IconButton>
                        <IconButton
                            onClick={() => {

                            }}
                        >
                            <Phone />
                        </IconButton>
                        <IconButton>
                            <MagnifyingGlass />
                        </IconButton>
                        <Divider orientation="vertical" flexItem />
                        <IconButton>
                            <CaretDown />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
    )

}

export default Header;