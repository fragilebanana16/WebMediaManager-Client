import { useNavigate } from "react-router-dom"
import styled from "styled-components";
// import { MdHomeFilled, MdSearch } from "react-icons/md";
// import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";
import { Spotify_Nav_Buttons } from "../../data";
import { Box, IconButton, Stack, Divider, Switch, Menu, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function SpotifySidebar() {
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const navi = useNavigate();

  const getPath = (index) => {
    switch (index) {
      case 0:
        return "/music";
      case 1:
        return "/music/chordsTable";
      default:
        break;
    }
  };

  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
          />
        </div>
        <ul>
          {Spotify_Nav_Buttons.map((el) =>
            <Box p={2.1} key={el.index} sx={{
              backgroundColor:
                selected === el.index ? theme.palette.primary.darker : 'transparent', borderRadius: 1.5,
            }} onClick={() => { navi(getPath(el.index), { state: { selectedIndex: el.index, } }); setSelected(el.index); }}>
              <li>
                <span>{el.text}</span>
              </li>
            </Box>
          )}
        </ul>
      </div>
      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      li {
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: white;
        }
      }
    }
  }
`;
