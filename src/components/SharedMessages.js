import React from "react";
import { useTheme } from "@mui/material/styles";
import {  Box,  IconButton,  Stack,  Typography,  Tabs,  Tab,  Grid,} from "@mui/material";
import { ArrowLeft } from "phosphor-react";
// import useResponsive from "../hooks/useResponsive";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/slices/app";
import { faker } from "@faker-js/faker";
import { DocMsg, LinkMsg } from "./Conversation/MsgTypes";
import { Shared_docs, Shared_links } from "../data";

const Media = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  // const isDesktop = useResponsive("up", "md");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 320, maxHeight: "100vh" }}>
      <Stack sx={{ height: "100%",backgroundColor:
            theme.palette.mode === "light" ? "#F8FAFF" : 
            theme.palette.background.paper,}}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            width: "100%",

          }}
        >
          <Stack
            sx={{ height: "100%", p: 2 }}
            direction="row"
            alignItems={"center"}
            spacing={3}
          >
            <IconButton
               onClick={() => {
                dispatch(UpdateSidebarType("CONTACT"));
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Typography variant="subtitle2">Shared</Typography>
          </Stack>
        </Box>

        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflow: "hidden",
            overflowY: "scroll",
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.mode === "light" ? "#f1f1f1" : theme.palette.background.paper,
              borderRadius: '100vw',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.mode === "light" ? '#8885' : '#8884',
              borderRadius: '100vw',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: theme.palette.mode === "light" ? '#888' : '#8888',
            },
          }}
          spacing={3}
          padding={value === 1 ? 1 : 3}
        >
          {/* <Conversation starred={true} /> */}
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6].map((el) => (
                      <Grid item xs={4}>
                        <img
                          src={faker.image.city()}
                          alt={faker.internet.userName()}
                        />
                      </Grid>
                    ))}
                  </Grid>
                );
              case 1:
                return Shared_links.map((el) => <LinkMsg el={el} key={el.id} />);

              case 2:
                return Shared_docs.map((el) => <DocMsg el={el} key={el.id} />);

              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Media;
