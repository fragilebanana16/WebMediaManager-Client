import { Box, Stack, Typography,Button } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import React from "react";
import { styled, useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Logo from "../../assets/Images/logo.ico"
import gif from "../../assets/Images/cardimgfree.png";
import Grid from "@mui/material/Grid";
import MusicMiniControl from "../../components/music/MusicMiniControl";
const WallPaper = styled('div')({
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

  const NaviTab = ({title, detail, path}) => {
    return (
      <a href={path} style={{ textDecoration: 'none' }}>

    <Card sx={() => ({
      display:"flex",
      height:"250px",
      // backgroundImage: `url(${gif})`,
      backgroundSize: "cover",
      backgroundPosition: "50%",
      zIndex: 1
    })}>
      <CardActionArea>
        <CardContent sx={{mt:14}}>

<Typography gutterBottom variant="h3" component="div">
           {title}
          </Typography>
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
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
    <Stack sx={{ backgroundColor: "#10131a" }} >
      
      <Card sx={{ maxWidth: 250,  zIndex:1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
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

    <Box mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} xl={3}>
            <NaviTab  title="Movie" detail="123很长回答很长回答我低价位哈U很长回答我低价位哈U很长回答我低价位哈U很长回答我低价位哈U很长回答我低价位哈U很长回答我低价位哈U很长回答我低价位哈U我低价位哈U盾吾爱打我打打我打我打我我打我单位" path="/netflix"/>
            </Grid>
            <Grid item xs={12} xl={3}>
              <NaviTab title="Chat" detail="456" path="/chat"/>
            </Grid>
            <Grid item xs={12} xl={3} style={{ textDecoration: 'none' }}>
              <NaviTab  title="File" detail="789" path="/files"/>
            </Grid>
            <Grid item xs={12} xl={3} style={{ textDecoration: 'none' }}>
              <NaviTab  title="Admin" detail="999" path="/admin"/>
            </Grid>
          </Grid>
        </Box>



    <MusicMiniControl>

    </MusicMiniControl>

    </Stack>
    <WallPaper></WallPaper>

    </Box>

  );
};

export default HomeApp;
