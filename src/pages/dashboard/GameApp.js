import { useTheme } from "@emotion/react";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Search, SearchIconWrapper, StyledInputBase, } from "../../components/Search";
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users, } from "phosphor-react";
import { forwardRef, useEffect, useState } from 'react';
import { styled } from "@mui/material/styles";
import Paper from '@mui/material/Paper';
// types
import PropTypes from 'prop-types';

// material-ui
import { Box, Stack, Card, Grid, CardContent, CardHeader, Divider, Typography, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

import ToolLightCard from "../../components/Playground/ToolLightCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const toolNames =new Array("Json Convert","Code to Img","Todo List", "My Games");

const GameApp = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const theme = useTheme();
  return (
    <Stack style={{ backgroundColor: "grey", height: '100vh' }}>
      <Stack style={{ paddingLeft: '14%', paddingRight: '14%' }} >
        <Search style={{ marginBottom: '20px',marginTop: '20px' }}>
          <SearchIconWrapper>
            <MagnifyingGlass color="#709CE6" ></MagnifyingGlass>
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…"
            inputProps={{ "aria-label": "search" }}></StyledInputBase>
        </Search>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {toolNames.map((name, index) => (
            <Grid item xs={2} sm={3} md={3} key={index}>
              <ToolLightCard isLoading={isLoading} mainTitle={name} subTitle={index}/>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default GameApp;
