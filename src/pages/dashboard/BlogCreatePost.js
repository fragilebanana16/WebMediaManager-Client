import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import Editor from "../../components/Blog/Editor";
import { TextField, Button, FormControl, FormControlLabel, } from "@mui/material";
export default function BlogCreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  async function createNewPost(ev) {

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    ev.preventDefault();

    const response = await fetch('http://localhost:3001/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    
    console.log(response);

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/blog'} />
  }
  return (
    <Container >
      <form onSubmit={createNewPost}>
        <TextField          fullWidth          style={{ margin: "5px 0px" }}          type="text"          label="Title"          variant="outlined"  onChange={ev => setTitle(ev.target.value)}      />
        <br />
        <TextField          fullWidth          style={{ margin: "5px 0px" }}          type="text"          label="Summary"          variant="outlined"    onChange={ev => setSummary(ev.target.value)}    />
        <br />
        <Editor value={content} onChange={setContent} />
        <Button          variant="contained"          component="label"        >          Upload File       
        <input            type="file"            hidden      onChange={ev => setFiles(ev.target.files)}    />        </Button>
        <Button type="submit" style={{ width: "30%", margin: "0px 20px" }} variant="contained" color="primary">          Create post        </Button>
      </form>

      {/* <form onSubmit={createNewPost}>
        <input type="title"
          placeholder={'Title'}
          value={title}
          onChange={ev => setTitle(ev.target.value)} />
        <input type="summary"
          placeholder={'Summary'}
          value={summary}
          onChange={ev => setSummary(ev.target.value)} />
        <input type="file"
          onChange={ev => setFiles(ev.target.files)} />
        <button style={{ marginTop: '5px' }}>Create post</button>
      </form> */}
    </Container>
  );
}

const Container = styled.div`

`;