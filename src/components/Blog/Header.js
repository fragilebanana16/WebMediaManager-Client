import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Profile_Menu } from "../../data";
import { Box, IconButton, Stack, Divider, Switch, Menu, MenuItem, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { LogoutUser } from "../../redux/slices/auth";

export default function Header() {
  //   const {setUserInfo,userInfo} = useContext();
  const { setUserInfo, userInfo } = useState();
  const { name } = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navi = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <Container>
      <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
          {name && (
            <>
              <Link to="/blog/createPost">Create new post</Link>
              <div class="avatar">
                <a onClick={handleClick} title={name}>
                  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/751678/skytsunami.png" alt="ooo" />
                </a>
              </div>
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
            </>
          )}
          {!name && (
            <>
              <Link to="/auth/login">Login</Link>
            </>
          )}
        </nav>
      </header>
    </Container>

  );
}

const Container = styled.div`
 .avatar {
	width: 1.5rem;
	height: 1.5rem;
	box-sizing: border-box;
	border: 2px white solid;
	border-radius: 50%;
	overflow: hidden;
	box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
	img { width: 100%; height: auto; }
}

header{
    display:flex;
    justify-content:space-between;
    margin-top: 20px;
    margin-bottom: 50px;
    align-items: center;
}

header a{
    text-decoration:none;
    color: inherit;
}

header a.logo{
    font-weight: bold;
    font-size: 1.5rem;
}

header nav{
    display:flex;
    gap: 24px;
}
`;