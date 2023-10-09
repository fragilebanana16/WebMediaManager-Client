import { ThemeContext, useTheme } from "@emotion/react";
import { Divider, IconButton, Link, Menu, Typography, MenuItem } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Image, DownloadSimple, DotsThreeVertical } from "phosphor-react";
import { React, useState } from "react";
import { Message_options } from "../../data";
const MessageOption = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <DotsThreeVertical
                size={20}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} px={1}>
                    {Message_options.map((el) => (
                        <MenuItem onClick={handleClose} key={el.title}>{el.title}</MenuItem>
                    ))}
                </Stack>
            </Menu>
        </>
    );
};


const DocMsg = (props) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems="center"
            justifyContent={props.el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{
                backgroundColor: props.el.incoming ?
                    theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5,
            }}>
                <Stack spacing={2}>
                    <Stack p={2} direction="row" spacing={3}
                        alignItems="center" sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}>
                        <Image size={48}></Image>
                        <Typography variant="caption">HardCode.png</Typography>
                        <IconButton>
                            <DownloadSimple></DownloadSimple>
                        </IconButton>
                    </Stack>
                    <Typography variant="body2" sx={{
                        color: props.el.incoming ? theme.palette.text : "#fff",
                    }}>{props.el.message}</Typography>
                </Stack>
            </Box>
            {/* options */}
            {props.menu && <MessageOption  />}

        </Stack>
    )
}

const LinkMsg = (props) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems="center"
            justifyContent={props.el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{
                backgroundColor: props.el.incoming ?
                    theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 3,
            }}>
                <Stack spacing={2}>
                    <Stack p={2} direction="column" spacing={3}
                        alignItems="center" sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        }}>
                        <img src={props.el.preview} alt={props.el.message}
                            style={{ maxHeight: 210, borderRadius: "10px" }}></img>
                    </Stack>
                    <Stack spacing={2}>
                        <Typography variant="subtitle2" >
                            Creating App
                        </Typography>
                        <Typography variant="subtitle2" component={Link} sx={{
                            color: theme.palette.primary.main,
                        }} to="//https://www.bilibili.com">
                            www.youku.com
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color={props.el.incoming ?
                        theme.palette.text :
                        "#fff"}>
                        {props.el.message}
                    </Typography>
                </Stack>
            </Box>
            {/* options */}
            {props.menu && <MessageOption  />}

        </Stack>
    )
}

const ReplyMsg = (props) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems="center"
            justifyContent={props.el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{
                backgroundColor: props.el.incoming ?
                    theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 3,
            }}>
                <Stack spacing={2}>
                    <Stack p={2} direction="column" spacing={3} alignItems="center" sx={{
                        backgroundColor:
                            theme.palette.background.paper, borderRadius: 1,
                        width: "max-content"
                    }}>
                        <Typography variant="body2" color={theme.palette.text}>
                            {props.el.message}
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color={props.el.incoming ?
                        theme.palette.background.default :
                        "#fff"}>
                        {props.el.reply}
                    </Typography>
                </Stack>
            </Box>
            {/* options */}
            {props.menu && <MessageOption  />}

        </Stack>
    )
}

const MediaMsg = (props) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems="center"
            justifyContent={props.el.incoming ? "start" : "end"}>
            <Box p={1.5} sx={{
                backgroundColor: props.el.incoming ?
                    theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 3,
            }}>
                <Stack spacing={1}>
                    <img src={props.el.img} alt={props.el.message}
                        style={{ maxHeight: 210, borderRadius: "10px" }}></img>
                    <Typography variant="body2" color={props.el.incoming ?
                        theme.palette.text : "#fff"}>
                        {props.el.message}
                    </Typography>
                </Stack>
            </Box>
            {/* options */}
            {props.menu && <MessageOption  />}
            
        </Stack>
    )
}

const TextMsg = (props) => {
    const theme = useTheme();
    const [style, setStyle] = useState({ display: 'none' });
    return (
        <Stack direction={"row"} alignItems="center"
            justifyContent={props.el.incoming ? "start" : "end"}
        >
            <Stack direction={"row"} alignItems="center" onMouseEnter={
                e => {
                    setStyle({ display: 'inline-flex' });
                }}
                onMouseLeave={
                    e => {
                        setStyle({ display: 'none' });
                    }} >
                <Box p={1.5} sx={{
                    backgroundColor: props.el.incoming ?
                        theme.palette.background.default :
                        theme.palette.primary.main, borderRadius: 1.5,
                }}
                >
                    <Typography variant="body2" color={props.el.incoming ?
                        theme.palette.text : "#fff"}>
                        {props.el.message}
                    </Typography>
                </Box>
                {/* options */}
                {props.menu && <MessageOption  />}

            </Stack>

        </Stack>
    )
}

const TimeLine = (props) => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} alignItems="center" justifyContent="space-between">
            <Divider width="46%" />
            <Typography variant="caption" sx={{ color: theme.palette.text }}>
                {props.el.text}
            </Typography>
            <Divider width="46%" />
        </Stack>
    )
}

export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg }