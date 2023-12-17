import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme, styled } from "@mui/material/styles";
import { Box, IconButton, Stack, Divider, Switch, Menu, MenuItem, Typography } from "@mui/material";
import Logo from "../../assets/Images/logo.ico"
import { Nav_Buttons, Profile_Menu, Nav_Setting } from "../../data";
import { Gear, Aperture } from "phosphor-react";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../redux/slices/auth";
import { string } from "prop-types";
const ChatSideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  const navi = useNavigate();
  // menu stuff
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getPath = (index) => {
    switch (index) {
      case 0:
        return "/chat/app";
      case 1:
        return "/chat/friends";
      case 2:
        return "/group";
      case 3:
        return "/call";
      case 4:
        return "/settings";
      default:
        break;
    }
  };
  // menu stuff
  const getMenuPath = (index) => {
    // console.log(index)
    switch (index) {
      case 0:
        return "/profile";
      case 1:
        return "/settings";
      case 2:
        // update token & isAuth=false
        return "/auth/login";
      case 3:
        return "/home";
      default:
        break;
    }
  };
  const { name } = useSelector((state) => state.app.user);
  const loc = useLocation()
  useEffect(()=> {
    console.log("location" + JSON.stringify(loc));
    if (loc && loc.state && loc.state.selectedIndex) {
      setSelected(loc.state.selectedIndex);
    }
  }, []);

  return (
    <>
      <Box p={2} sx={{
        backgroundColor: "rgba(0,0,0,0.3)", // theme.palette.primary.darker
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        height: "100vh", width: 100
      }}>
        <Stack spacing={4} direction="column" alignItems={"center"} sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between">
          <Stack spacing={4} alignItems="center">
            {/* avatar */}
          <Stack spacing={0.5} alignItems="center">
            <Box sx={{
              backgroundColor: 'transparent',
              height: 64, width: 64, borderRadius: 1.5,
              display: "flex",
            }}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}>
              {/* online or not */}
              <Box sx={{
                backgroundColor: 'rgba(0,255,0,0.8)',
                position: 'absolute',
                left: 72,
                height: 12, width: 12, borderRadius: 1.5,
              }}>

              </Box>
              <img src={Logo} alt={"Chat App Logo"}
                style={{ borderRadius: "10px", border: '2px solid rgba(255, 255, 255, 1)' }}
              />
            </Box>
            <Typography variant="subtitle2">{name}</Typography>
            </Stack>

            {/* avatar click menu */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Stack spacing={1} px={1}>
                {Profile_Menu.map((el) => (
                  <MenuItem key={el.title}>
                    <Stack onClick={() => {
                      if (el.index == 2) {
                        dispatch(LogoutUser()); // watch out for the ()
                      }
                      else {
                        navi(getMenuPath(el.index));
                      }
                    }} sx={{ width: 100 }} direction="row" alignItems={"center"} justifyContent={"space-between"}>
                      <span>
                        {el.title}

                      </span>
                      {el.icon}
                    </Stack>
                  </MenuItem>
                ))}
              </Stack>
            </Menu>

            {/* options */}
            <Stack sx={{ width: "max-content" }} direction="column" alignItems="center" spacing={4}>
              {Nav_Buttons.map((el) =>
                <Box p={1} key={el.index} sx={{
                  backgroundColor:
                  selected === el.index ? theme.palette.primary.darker : 'transparent', borderRadius: 1.5,
                }}>
                  <IconButton onClick={() => {
                    navi(getPath(el.index), {
                      state: {
                        selectedIndex: el.index,
                      }
                    });

                  }}
                    sx={{
                      width: "max-content", color:
                        (theme.palette.mode === 'light' && selected !== el.index) ? "#000" : "#fff"
                    }} key={el.index}>
                    {el.icon}
                  </IconButton>
                </Box>
              )}
            </Stack>

            <Divider style={{ width: '48px' }} sx={{
              borderBottomWidth: 1, borderColor:
                theme.palette.mode === 'light' ? "#000" : "#fff"
            }}></Divider>

            {/* daily */}
            <Box p={1} sx={{
              backgroundColor:
                selected === 3 ? theme.palette.primary.darker : 'transparent', borderRadius: 1.5,
            }}>
              <IconButton onClick={() => {
                // setSelected(3);
                navi("/settings");
              }} sx={{
                width: "max-content", color:
                  (theme.palette.mode === 'light' && selected !== 3) ? "#000" : "#fff"
              }}>
                <Aperture>
                </Aperture>
              </IconButton>
            </Box>

          </Stack>

          {/* bottom */}
          <Stack spacing={4} alignItems="center">
            <AntSwitch onChange={() => { onToggleMode(); }}></AntSwitch>
            <Box p={1} sx={{
              backgroundColor: selected === 4 ? theme.palette.primary.darker : 'transparent',
              borderRadius: 1.5,
            }}>
              <IconButton onClick={() => {
                // setSelected(4);
                navi("/settings");
              }} sx={{
                width: "max-content",
                color: (theme.palette.mode === 'light' && selected !== 4)
                  ? "#000" : "#fff"
              }}>
                <Gear></Gear>
              </IconButton>
            </Box>

          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default ChatSideBar;
