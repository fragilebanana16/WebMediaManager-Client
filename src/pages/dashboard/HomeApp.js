import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Container } from '@mui/material';
import Logo from "../../assets/Images/logo.ico"
import gif from "../../assets/Images/cardimgfree.png";
import Grid from "@mui/material/Grid";
import MusicMiniControl from "../../components/music/MusicMiniControl";
import { LiveTv, Textsms, CloudUpload, AdminPanelSettings, SportsEsports } from '@mui/icons-material';
const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
}));

const WallPaper = styled('div')({
  zIndex: '0',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const HomeApp = () => {
  const theme = useTheme();

  const NaviTab = ({ title, detail, path, icon }) => {
    return (
      <a href={path} style={{ textDecoration: 'none' }}>

        <Card sx={() => ({

          // backgroundImage: `url(${gif})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          zIndex: 1
        })}>
          <CardActionArea>
            <CardContent sx={{ mt: 3 }}>
              <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
                <Box >{icon}</Box>
                <Box>
                  <Typography gutterBottom variant="h3" component="div" sx={{ mt: 1, ml: 2 }}>
                    {title}
                  </Typography>
                </Box>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "1",
                WebkitBoxOrient: "vertical",
              }}
              >
                {detail}
              </Typography>

            </CardContent>
          </CardActionArea>
        </Card>
      </a>)
  }

  return (

    <Box sx={{ width: '100%', mt: 3 }}>

      {/* <Stack sx={{ flexDirection: "row", display: "flex" }} > */}
      {/* <Grid container spacing="3" flex={"8"}>
          <Grid item xs={12} xl={12} >
            <Card sx={{ zIndex: 1 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="400"
                  image={Logo}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    电影
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    最新添加：《奥本海默》
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid> */}



      <Container maxWidth="xl">
        <Grid
          container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} xl={12}
        >
          {/* left */}
          <Grid item xs={12} xl={4}>
            <Card sx={{ zIndex: 1 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height='430'
                  image={Logo}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    电影
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    最新添加：《奥本海默》
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* right */}
          <Grid item xs={12} xl={8}>
            <Grid
              container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} xl={12}
            >
              <Grid item xs={12} sm={6} lg={6}              >
                <NaviTab title="Movie" detail="Stream, Range, Pipe" path="/netflix" icon={<LiveTv sx={{ fontSize: 50 }} />} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}              >
                <NaviTab title="Chat" detail="SocketIO, Redis, Mongodb" path="/chat" icon={<Textsms sx={{ fontSize: 50, mt: 1.5 }} />} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}              >
                <NaviTab title="File" detail="Formdata, Busboy, Multer, Stream" path="/files" icon={<CloudUpload sx={{ fontSize: 50, mt: 1 }} />} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}              >
                <NaviTab title="Admin" detail="Administration Page" path="/admin" icon={<AdminPanelSettings sx={{ fontSize: 50, mt: 1 }} />} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}              >
                <NaviTab title="Games" detail="Game poster" path="/game" icon={<SportsEsports sx={{ fontSize: 50, mt: 1 }} />} />
              </Grid>
              <Grid item xs={12} sm={6} lg={6}              >
                <NaviTab title="Music" detail="Spotify Clone" path="/music" icon={<LiveTv sx={{ fontSize: 50 }} />} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* <Stack sx={{ flexDirection: "row", display: "flex" }} >
      <Grid container spacing="3" flex={"8"}>
          <Grid item xs={12} xl={12} >
      <MusicMiniControl />
          </Grid>
        </Grid>
      </Stack> */}

      {/* <WallPaper /> */}
    </Box>
  );
};

export default HomeApp;
