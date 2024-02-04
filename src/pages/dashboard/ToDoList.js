import { useTheme } from "@emotion/react";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users, } from "phosphor-react";
import { forwardRef, useEffect, useState } from 'react';
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { Box, Stack, Card, Grid, CardContent, CardHeader, Divider, Typography, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

const Container = styled.div`
.button {
  height: 60px;
  width: 200px;
  position: relative;
  box-shadow: 0 1.25em 2.18em rgba(0, 0, 0, 0.3);
  overflow: hidden;
  cursor: pointer;
  border-radius: 0.5em;
}

.button:before {
  content: "";
  height: 36em;
  width: 36em;
  position: absolute;
  top: -9em;
  left: -9em;
  background: repeating-linear-gradient(
    to right,
    #fd004c 2.62em,
    #fe9000 5.25em,
    #fff020 7.87em,
    #3edf4b 10.5em,
    #3363ff 15.75em,
    #fd004c 18.75em
  );
  background-size: 120em;
  border-radius: 100%;
}
.button:after {
  content: "Yolo";
  position: absolute;
  background-color: #1c1b29;
  height: 92%;
  width: 98%;
  top: 5%;
  left: 1%;
  border-radius: 0.2em;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 1.2em;
  letter-spacing: 0.3em;
  display: grid;
  place-items: center;
  border-radius: 0.3em;
}
.button:hover:before {
  background-position: -106.25em 0;
  transition: 20s linear;
  transform: rotate(180deg);
}
`;

const ToDoItem = () => {
  return <Grid item xs={12} md={6}>
    <List dense={false}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Single-line item"
          secondary={'Secondary text'}
        />
      </ListItem>
    </List>
  </Grid>

}

const ToDoList = () => {
  const theme = useTheme();
  const [todoItems, setTodoItems] = useState([1, 2, 3]);
  return (
    <Stack style={{ backgroundColor: theme.palette.background.paper, paddingLeft: '14%', paddingRight: '14%', paddingTop: '2%', height: '100vh' }} >
      <Stack direction={"row"} spacing={2} alignItems="center">
        <TextField fullWidth label="To Do" id="fullWidth" />
        <Container onClick={() => setTodoItems(current => [...current, 4])}><Button  className="button"></Button></Container>
      </Stack>

      <Box sx={{ width: '86%', paddingLeft: '3%' }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Avatar with text and icon
        </Typography>
        { todoItems.map((el) => (<ToDoItem/> ))}
      </Box>
    </Stack>
  );
};

export default ToDoList;
