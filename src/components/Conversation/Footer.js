import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Stack, Divider, Switch, Tooltip, Fab, InputAdornment, TextField, Badge, Avatar, Typography } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Camera, File, Image, LinkSimple, PaperPlaneTilt, Smiley, Sticker, User, } from "phosphor-react";
import { useSelector } from "react-redux";
import { socket } from "../../utils/socket";
const StyledInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        paddingTop: "12px !important",
        paddingBottom: "12px !important",
    },
}));
const Actions = [
    {
        color: "#4da5fe",
        icon: <Image size={24} />,
        y: 102,
        title: "Photo/Video",
    },
    {
        color: "#1b8cfe",
        icon: <Sticker size={24} />,
        y: 172,
        title: "Stickers",
    },
    {
        color: "#0172e4",
        icon: <Camera size={24} />,
        y: 242,
        title: "Image",
    },
    {
        color: "#0159b2",
        icon: <File size={24} />,
        y: 312,
        title: "Document",
    },
    {
        color: "#013f7f",
        icon: <User size={24} />,
        y: 382,
        title: "Contact",
    },
];


const handleTyping = (typingStatus) => {
    socket.emit("typing", typingStatus)
}



const ChatInput = ({ openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
    onSendMsg,
    name }) => {
    const [openActions, setOpenActions] = useState(false);
  
    var typing = false;
var timeout = undefined;

function timeoutFunction(){
  typing = false;
  handleTyping("")
}

function onKeyDownNotEnter(typingStatus){
  if(typing == false) {
    typing = true
    handleTyping(typingStatus)
    timeout = setTimeout(timeoutFunction, 2000);
  } else {
    clearTimeout(timeout);
    timeout = setTimeout(timeoutFunction, 2000);
  }

}

    return (
        <StyledInput fullWidth placeholder="Write a message" variant="filled"
            inputRef={inputRef}
            value={value}
            onChange={(event) => {
                setValue(event.target.value);
            }}
            onKeyDown={
                (e) => {
                    var typingStatus = `${name} is typing`;
                    onKeyDownNotEnter(typingStatus);
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onSendMsg();
                    }
                }
            }
 
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <Stack sx={{
                        width: "max-length%",
                    }}>
                        <Stack sx={{
                            position: "relative",
                            display: openActions ? "inline-block" : "none",
                        }}>
                            {Actions.map((el) => (
                                <Tooltip placement="right" title={el.title} key={el.title}>
                                    <Fab
                                        onClick={() => {

                                        }}
                                        sx={{
                                            position: "absolute",
                                            top: -el.y,
                                            backgroundColor: el.color,
                                        }}
                                        aria-label="add"
                                    >
                                        {el.icon}
                                    </Fab>
                                </Tooltip>

                            ))}
                        </Stack>
                        <InputAdornment position="start">
                            <IconButton sx={{ marginBottom: 1.5 }}
                                onClick={() => {
                                    setOpenActions((prev) => !prev);
                                }}
                            >
                                <LinkSimple />
                            </IconButton>
                        </InputAdornment>
                    </Stack>

                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => { setOpenPicker((prev) => !prev) }}
                        >
                            <Smiley />
                        </IconButton>
                    </InputAdornment>
                ),
            }} >

        </StyledInput>
    )
}

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
        urlRegex,
        (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
}

function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
}
const Footer = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef(null);
    const { sideBar, room_id } = useSelector((state) => state.app);
    const { name } = useSelector((state) => state.app.user);
    const { current_conversation } = useSelector(
        (state) => state.conversation.direct_chat
    );
    const user_id = window.localStorage.getItem("user_id");
    function handleEmojiClick(emoji) {
        const input = inputRef.current;
        if (input) {
            const selectionStart = input.selectionStart;
            const selectionEnd = input.selectionEnd;

            setValue(
                value.substring(0, selectionStart) +
                emoji +
                value.substring(selectionEnd)
            );

            // Move the cursor to the end of the inserted emoji
            input.selectionStart = input.selectionEnd = selectionStart + 1;
        }
    }

    const onSendMsg = () => {
        console.log("client send button click." + "current_conversation:" + JSON.stringify(current_conversation));
        console.log("value:", linkify(value));
        socket.emit("text_message", {
            message: linkify(value),
            conversation_id: room_id,
            from: user_id,
            to: current_conversation.user_id,
            type: containsUrl(value) ? "Link" : "Text",
        });

        setValue("")
    };

    return (
        <Box p={2} sx={{
            width: "100%", backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" :
                theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)"
        }}>
            <Stack direction="row" alignItems={"center"} spacing={3}>
                <Stack sx={{ width: "100%" }}>
                    <Box sx={{ display: openPicker ? "inline" : "none", zIndex: 10, position: "fixed", bottom: 81, right: 100 }}>
                        <Picker
                            theme={theme.palette.mode}
                            data={data}
                            onEmojiSelect={(emoji) => {
                                handleEmojiClick(emoji.native);
                            }}
                            onClickOutside={() => { if (openPicker) { setOpenPicker(false) } }}></Picker>
                    </Box>
                    <ChatInput
                        inputRef={inputRef}
                        value={value}
                        setValue={setValue}
                        openPicker={openPicker}
                        setOpenPicker={setOpenPicker}
                        onSendMsg={onSendMsg}
                        name={name}
                    />
                </Stack>

                <Box p={2} sx={{ height: 48, width: 48, backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}>
                    <Stack sx={{ height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                        <IconButton
                            onClick={onSendMsg}
                        >
                            <PaperPlaneTilt color="#fff" />
                        </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Footer;
