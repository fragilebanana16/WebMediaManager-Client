import { useTheme } from "@emotion/react";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users, } from "phosphor-react";
import { forwardRef, useEffect, useState } from 'react';
import styled from "styled-components";
import Paper from '@mui/material/Paper';
import PropTypes, { string } from 'prop-types';
import { Box, Stack, Card, Grid, CardContent, CardHeader, Divider, Typography, List, ListItem, ListItemAvatar, ListItemText, TextField, Button, ListItemSecondaryAction } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { deepOrange, green } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ToDoItem = (props) => {
  return <Grid item xs={12} md={6}>
    <List dense={false}>
      <ListItem>

        <ListItemAvatar>
          <Avatar sx={{ bgcolor: props.done ? green[500] : deepOrange[500], cursor: 'pointer' }} variant="rounded" onClick={() => { props.onToggle(props.id) }}>
            <IconButton onClick={() => { props.onDoneClick(props) }}>
              {props.done ? <EventAvailableIcon sx={{ color: 'white' }} /> : <ContentPasteIcon sx={{ color: 'white' }} />}
            </IconButton>
          </Avatar>

        </ListItemAvatar>
        <ListItemText
          primary={props.title}
          secondary={
            <Typography noWrap style={{ fontSize: '16px', minWidth: '200px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {props.description}
            </Typography>
          }
        />

        <ListItemText
          primary={<Typography noWrap style={{ fontSize: '16px', minWidth: '250px', marginLeft: -50 }}>
            Created time:{props.createdTime ?? 'None'}
          </Typography>}
        />
        <ListItemText
          primary={<Typography noWrap style={{ fontSize: '16px', minWidth: '250px', marginLeft: -50 }}>
            Finished time:{props.finishedTime ?? 'None'}
          </Typography>}
        />

        <ListItemSecondaryAction>
          <IconButton sx={{ marginRight: '30px' }} onClick={() => { props.onClickHandle(props) }}>
            <EditNoteIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => props.deleteTodo(props.todo_id)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>

      </ListItem>
    </List>
  </Grid>

}

const ToDoList = () => {
  const theme = useTheme();
  useEffect(() => { getTodos(); }, []);
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState();
  const [toDoId, setToDoId] = useState();
  const [editing, setEditing] = useState(false);
  const [toDoItemData, setToDoItemData] = useState();

  const handleClickOpenConfirm = (id) => {
    setToDoId(id);
  };

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todoList/todos");
      let jsonData = await response.json();

      function dateParse(s) {
        if (s === null) {
          return;
        }

        let b = s.split(/\D/);
        if (b[6] === null || b[6] === undefined) {
          return;
        }

        --b[1];                  // Adjust month number
        b[6] = b[6].substr(0, 3); // Microseconds to milliseconds
        return new Date(Date.UTC(...b));
      }

      jsonData = jsonData.map(item => ({ ...item, createdtime: dateParse(item.createdtime)?.toLocaleString(), finishedtime: dateParse(item.finishedtime)?.toLocaleString() }))
      setTodos(jsonData.sort((a, b) => a.todo_id - b.todo_id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTodo = async id => {
    try {
      const res = await fetch(`http://localhost:3001/todoList/todos/${id}`, {
        method: "DELETE"
      });

      getTodos();
    } catch (err) {
      console.error(err.message);
    }
  };

  const addTodo = async formJson => {
    try {
      const response = await fetch("http://localhost:3001/todoList/addTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formJson)
      });

    } catch (err) {
      console.error(err.message);
    }

  }

  const updateTodoDone = async (prop) => {
    try {
      const response = await fetch(
        `http://localhost:3001/todoList/todosDone/${prop.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done: !prop.done })
        }
      );

    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTodo = async (todo_id, formJson) => {
    try {
      const response = await fetch(
        `http://localhost:3001/todoList/todos/${todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formJson)
        }
      );

    } catch (err) {
      console.error(err.message);
    }
  };

  const onDoneClick = async (props) => {
    await updateTodoDone(props);
    await getTodos();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onToggle = (id) => {
    handleClickOpenConfirm(id);
  };

  const handleTodoItemClick = (prop) => {
    setOpen(true);
    setEditing(true);
    setToDoItemData({ todo_id: prop.todo_id, title: prop.title, description: prop.description, done: prop.done });
    // setEditingId(prop.todo_id);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
    getTodos();
  };
  return (
    <Stack style={{ backgroundColor: theme.palette.background.paper, paddingLeft: '14%', paddingRight: '14%', paddingTop: '2%', height: '100vh' }} >
      <Stack direction={"row"} spacing={2} alignItems="center">
        <TextField fullWidth label="Search To Do" id="fullWidth" />
        <Container onClick={() => { handleClickOpen() }}><Button className="button"></Button></Container>
      </Stack>

      <Box sx={{ width: '86%', paddingLeft: '3%' }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          "Hey, whatcha doing for the rest of your life?"
        </Typography>
        {todos.map((el) => (<ToDoItem finishedTime={el.finishedtime} createdTime={el.createdtime} onDoneClick={onDoneClick} deleteTodo={deleteTodo} key={el.todo_id} todo_id={el.todo_id} done={el.done} title={el.title} description={el.description} onClickHandle={handleTodoItemClick} onToggle={onToggle} />))}
      </Box>

      {/* add or edit dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async event => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());

            if (!editing) {
              await addTodo(formJson);
            }
            else {
              await updateTodo(toDoItemData.todo_id, formJson);
            }

            // setTodoItems(current => [...current, { 'done': false, title: formJson.titleName, subTitle: formJson.detailName }])
            handleClose();
            await getTodos();
          },
        }}
      >
        <DialogTitle>Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Stick to something...
          </DialogContentText>
          <TextField autoFocus required margin="dense" id="title" name="title" label="Title" fullWidth variant="standard" defaultValue={editing ? toDoItemData.title : ''} />
          <TextField autoFocus required margin="dense" id="detail" name="description" label="Detail" fullWidth variant="standard" defaultValue={editing ? toDoItemData.description : ''} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">OK</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

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

export default ToDoList;