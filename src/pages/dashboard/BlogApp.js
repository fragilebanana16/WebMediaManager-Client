import { useTheme } from "@emotion/react";
import { Box, Stack, Typography  } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Post from "../../components/Blog/Post";
import {useContext, useEffect, useState} from "react";


const BlogApp = () => {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <Container>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
   
  </Container>

  );
};

const Container = styled.div`

`;

export default BlogApp;
