import React from "react";
import styled from "styled-components";
// import { useStateProvider } from "../utils/StateProvider";
// import { FaSearch } from "react-icons/fa";
// import { CgProfile } from "react-icons/cg";
import { Nav_Buttons, Profile_Menu, Nav_Setting } from "../../data";
import { Stack, Typography, Link, Box, Item, Menu, MenuItem } from '@mui/material';
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
  // menu stuff
  const getMenuPath = (index) => {
    console.log(index)
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
export default function Navbar({ hidden ,navbackground }) {
  const navi = useNavigate();
  const userInfo = {}
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [{ userInfo }] = useStateProvider();
  return (
    <Container navbackground={navbackground} hidden={hidden}>
      <div className="search__bar" >
        {/* <FaSearch /> */}
        <input type="text" placeholder="Artists, songs, or podcasts" />
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          {/* <CgProfile /> */}
          <span  onClick={handleClick}>Yolo</span>
                  {/* click Menu */}
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
                    // dispatch(LogoutUser()); // watch out for the ()
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
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 14vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navbackground }) =>
  navbackground ? "rgba(0,0,0,0.7)" : "none"};
  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: ${({ hidden }) => hidden ? "none" : "flex"};
    align-items: center;
    gap: 0.5rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }
  .avatar {
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 0.5rem;
    margin-left: auto;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
