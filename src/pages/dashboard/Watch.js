import { Stack, Typography, Link, Box, Item, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from "react";
import Logo from "../../assets/Images/logo.ico"
import { useLocation } from "react-router-dom";
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaSliderThumbnail, MediaPoster, MediaThumbnail, MediaTimeSlider } from '@vidstack/react';
import YoutubePlayer from '../../components/videos/YoutubePlayer';
import {BASE_URL} from "../../config"

const Watch = ({ route, navigation }) => {
  const location = useLocation();
  let videoId = location.state.videoId;
  return (
    <Box sx={{}}>
      {/* <MediaPlayer style={{
        width: 1080,
        height: 720,
        position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)',
      }}
        title="Sprite Fight"
        src={`http://192.168.0.107:3001/videos/${videoId}`}
        poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
        thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
        aspectRatio={16 / 9}
        crossorigin=""
      >
        <MediaOutlet>
          <MediaPoster
            alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
          />
          <track
            src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
            label="English"
            srcLang="en-US"
            kind="subtitles"
            default
          />
          <track
            src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
            srcLang="en-US"
            kind="chapters"
            default
          />
        </MediaOutlet>
        <MediaCommunitySkin />
      </MediaPlayer> */}
      {/* test */}
      <img src={Logo}></img>
      {/* thumbnails="https://media-files.vidstack.io/thumbnails.vtt" */}
      {/* damn thumbnail wont work */}
      {/* http://192.168.0.107:3001/1.vtt */}
      <MediaPlayer style={{
        width: 1080,
        height: 720,
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
        title="Sprite Fight"
        src={`${BASE_URL}/videos/${videoId}`}
        // thumbnails="http://192.168.0.107:3001/thumbnail.vtt"
        aspectRatio={16 / 9}
        poster={`${BASE_URL}/${videoId}.png`}
        crossorigin=""
      >
        {/* <MediaThumbnail time="150">

      </MediaThumbnail> */}

        <MediaTimeSlider>
          <MediaSliderThumbnail slot="preview" />
        </MediaTimeSlider>

        <MediaOutlet>
          <MediaPoster
            alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
          />
          <track src={`${BASE_URL}/chapters.vtt`} srcLang="en-US" kind="chapters" default />
        </MediaOutlet>
        {/* <MediaTimeSlider /> */}
        <MediaCommunitySkin />
      </MediaPlayer>
      {/* <video crossOrigin="anonymous" width='540' height='360' controls autoPlay>
        <source  src={`http://192.168.0.107:3001/videos/${videoId}`} type='video/mp4'></source>
        Your browser does not support the video tag.
    </video> */}

      <Box sx={{ marginTop: "400px" }}>
        <YoutubePlayer>

        </YoutubePlayer>
      </Box>

    </Box>
  );
};

export default Watch;
