import { Stack, Typography, Link, Box, Item, Menu, MenuItem } from '@mui/material';
import { useContext, useState, useEffect, useRef } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../../assets/Images/logo.ico"
import zIndex from '@mui/material/styles/zIndex';
import "./YoutubePlayer.scss"
import { BASE_URL } from "../../config"

const YoutubePlayer = ({videoUrl}) => {
    const videosRef = useRef();
    const volumeSliderRef = useRef();
    const videoContainerRef = useRef();
    const timelineContainerRef = useRef();
    const previewImgRef = useRef();
    const thumbnailImgRef = useRef();
    const speedBtnRef = useRef();
    const captionsBtnRef = useRef();
    const currentTimeElemRef = useRef();
    const totalTimeElemRef = useRef();
    const muteBtnRef = useRef();
    const fullScreenBtnRef = useRef();
    const miniPlayerBtnRef = useRef();
    const captionsRef = useRef();

    let isScrubbing = false;
    let wasPaused;

    const onVolChange = () => {
        volumeSliderRef.current.value = videosRef.current.volume;
        let volumeLevel;
        if (videosRef.current.muted || videosRef.current.volume === 0) {
            volumeSliderRef.current.value = 0;
            volumeLevel = "muted";
        } else if (videosRef.current.volume >= 0.5) {
            volumeLevel = "high";
        } else {
            volumeLevel = "low";
        }

        videoContainerRef.current.dataset.volumeLevel = volumeLevel;
    };

    const onSliderInput = (e) => {
        videosRef.current.volume = e.target.value
        videosRef.current.muted = e.target.value === 0
    }

    const handleTimelineUpdate = (e) => {
        const rect = timelineContainerRef.current.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
        const previewImgNumber = Math.max(
            1,
            Math.floor((percent * videosRef.current.duration) / 10)
        )
        
        const previewImgSrc = `${BASE_URL}/assets/previewImgs/preview${previewImgNumber}.jpg`;
        previewImgRef.current.src = previewImgSrc
        timelineContainerRef.current.style.setProperty("--preview-position", percent)

        if (isScrubbing) {
            e.preventDefault()
            if (thumbnailImgRef && thumbnailImgRef.current) {
                thumbnailImgRef.current.src = previewImgSrc
                timelineContainerRef.current.style.setProperty("--progress-position", percent)
            }
        }
    }

    const toggleScrubbing = (e) => {
        const rect = timelineContainerRef.current.getBoundingClientRect()
        const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
        isScrubbing = (e.buttons & 1) === 1;
        videoContainerRef.current.classList.toggle("scrubbing", isScrubbing)
        if (isScrubbing) {
            wasPaused = videosRef.current.paused
            videosRef.current.pause()
        } else {
            videosRef.current.currentTime = percent * videosRef.current.duration
            if (!wasPaused) videosRef.current.play()
        }

        handleTimelineUpdate(e)
    }

    const changePlaybackSpeed = () => {
        let newPlaybackRate = videosRef.current.playbackRate + 0.25
        if (newPlaybackRate > 2) newPlaybackRate = 0.25
        videosRef.current.playbackRate = newPlaybackRate
        speedBtnRef.current.textContent = `${newPlaybackRate}x`
    }
    
    const onMuted = () => {
        videosRef.current.muted = !videosRef.current.muted;
    }

    const toggleCaptions = () => {
        const isHidden = captionsRef.current.mode === "hidden";
        captionsRef.current.mode = (isHidden ? "showing" : "hidden");
        videoContainerRef.current.classList.toggle("captions", isHidden)
    }

    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
        minimumIntegerDigits: 2,
    })

    const formatDuration = (time) => {
        const seconds = Math.floor(time % 60)
        const minutes = Math.floor(time / 60) % 60
        const hours = Math.floor(time / 3600)
        if (hours === 0) {
            return `${minutes}:${leadingZeroFormatter.format(seconds)}`
        } else {
            return `${hours}:${leadingZeroFormatter.format(
                minutes
            )}:${leadingZeroFormatter.format(seconds)}`
        }
    }

    const onTimeUpdate = () => {
        currentTimeElemRef.current.textContent = formatDuration(videosRef.current.currentTime)
        const percent = videosRef.current.currentTime / videosRef.current.duration
        timelineContainerRef.current.style.setProperty("--progress-position", percent)
    }

    const onPlay = () => {
        if (videoContainerRef && videoContainerRef.current) {
            videoContainerRef.current.classList.remove("paused")
        }
    };
    const onPause = () => {
        if (videoContainerRef && videoContainerRef.current) {
            videoContainerRef.current.classList.add("paused")
        }
    };

    const skip = (duration) => {
        if (videosRef && videosRef.current) {
            videosRef.current.currentTime += duration;
        }
    }

    const onLoadedData = () => {
        if (videoContainerRef && videoContainerRef.current) { totalTimeElemRef.current.textContent = formatDuration(videosRef.current.duration); }
    };

    const togglePlay = () => {
        if (videosRef && videosRef.current) { videosRef.current.paused ? videosRef.current.play() : videosRef.current.pause() }
    };

    const toggleFullScreenMode = () => {
        if (document.fullscreenElement == null) {
            videoContainerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    const toggleMiniPlayerMode = () => {
        if (videoContainerRef.current.classList.contains("mini-player")) {
            document.exitPictureInPicture();
        } else {
            videosRef.current.requestPictureInPicture();
        }
    }

    const addMiniPlayClass = () => { videoContainerRef.current.classList.add("mini-player"); }

    const delMiniPlayClass = () => { videoContainerRef.current.classList.remove("mini-player"); }

    useEffect(() => {
        if (videosRef && videosRef.current) {
            captionsRef.current = videosRef.current.textTracks[0];
            captionsRef.current.mode = "hidden";
        }
    }, [videosRef])

    useEffect(() => {
        if (videosRef && videosRef.current) {
            videosRef.current.addEventListener("volumechange", onVolChange);
            videosRef.current.addEventListener("play", onPlay);
            videosRef.current.addEventListener("pause", onPause);
            videosRef.current.addEventListener("timeupdate", onTimeUpdate);
            videosRef.current.addEventListener("loadeddata", onLoadedData);
            videosRef.current.addEventListener("click", togglePlay);
            videosRef.current.addEventListener("enterpictureinpicture", addMiniPlayClass);
            videosRef.current.addEventListener("leavepictureinpicture", delMiniPlayClass);
            return () => {
                if (videosRef && videosRef.current) {
                videosRef.current.removeEventListener("volumechange", onVolChange);
                videosRef.current.removeEventListener("play", onPlay);
                videosRef.current.removeEventListener("pause", onPause);
                videosRef.current.removeEventListener("timeupdate", onTimeUpdate);
                videosRef.current.removeEventListener("loadeddata", onLoadedData);
                videosRef.current.removeEventListener("click", togglePlay);
                videosRef.current.removeEventListener("enterpictureinpicture", addMiniPlayClass);
                videosRef.current.removeEventListener("leavepictureinpicture", delMiniPlayClass);
            }
        }
        }
    }, [videosRef])

    useEffect(() => {
        if (volumeSliderRef && volumeSliderRef.current) {
            volumeSliderRef.current.addEventListener("input", onSliderInput);
            return () => {
                volumeSliderRef.current.removeEventListener("input", onSliderInput);
            }
        }
    }, [volumeSliderRef])

    useEffect(() => {
        if (timelineContainerRef && timelineContainerRef.current) {
            timelineContainerRef.current.addEventListener("mousemove", handleTimelineUpdate);
            timelineContainerRef.current.addEventListener("mousedown", toggleScrubbing);
            return () => {
                timelineContainerRef.current.removeEventListener("mousemove", handleTimelineUpdate);
                timelineContainerRef.current.removeEventListener("mousedown", toggleScrubbing);
            }
        }
    }, [timelineContainerRef])

    useEffect(() => {
        if (speedBtnRef && speedBtnRef.current) {
            speedBtnRef.current.addEventListener("click", changePlaybackSpeed);
            return () => {
                speedBtnRef.current.removeEventListener("click", changePlaybackSpeed);
            }
        }
    }, [speedBtnRef])

    useEffect(() => {
        if (captionsBtnRef && captionsBtnRef.current) {
            captionsBtnRef.current.addEventListener("click", toggleCaptions);
            return () => {
                captionsBtnRef.current.removeEventListener("click", toggleCaptions);
            }
        }
    }, [captionsBtnRef])

    useEffect(() => {
        if (muteBtnRef && muteBtnRef.current) {
            muteBtnRef.current.addEventListener("click", onMuted);
            return () => {
                muteBtnRef.current.removeEventListener("click", onMuted);
            }
        }
    }, [muteBtnRef])

    useEffect(() => {
        if (fullScreenBtnRef && fullScreenBtnRef.current) {
            fullScreenBtnRef.current.addEventListener("click", toggleFullScreenMode);
            return () => {
                fullScreenBtnRef.current.removeEventListener("click", toggleFullScreenMode);
            }
        }
    }, [fullScreenBtnRef])

    useEffect(() => {
        if (miniPlayerBtnRef && miniPlayerBtnRef.current) {
            miniPlayerBtnRef.current.addEventListener("click", toggleMiniPlayerMode);
            return () => {
                miniPlayerBtnRef.current.removeEventListener("click", toggleMiniPlayerMode);
            }
        }
    }, [miniPlayerBtnRef])

    window.addEventListener('mouseup', (e) => {
        if (isScrubbing)
            toggleScrubbing(e);
    });

    window.addEventListener('mousemove', (e) => {
        if (isScrubbing)
            handleTimelineUpdate(e);
    });

    window.addEventListener("fullscreenchange", () => {
        if (videoContainerRef && videoContainerRef.current) {
            videoContainerRef && videoContainerRef.current.classList.toggle("full-screen", window.fullscreenElement)
        }
    })

    window.addEventListener('keydown', (e) => {
        {
            const tagName = document.activeElement.tagName.toLowerCase()
            if (tagName === "input") return
            switch (e.key.toLowerCase()) {
                case " ":
                    if (tagName === "button") return
                case "k":
                    togglePlay();
                    break
                case "f":
                    toggleFullScreenMode();
                    break
                case "t":
                    // toggleTheaterMode()
                    break
                case "i":
                    // toggleMiniPlayerMode()
                    break
                case "m":
                    // toggleMute()
                    break
                case "arrowleft":
                case "j":
                    skip(-2)
                    break
                case "arrowright":
                case "l":
                    skip(2)
                    break
                case "c":
                    // toggleCaptions()
                    break
            }
        }
    });

    return (
        <div className="video-container paused" data-volume-level="high" ref={videoContainerRef}>
        {/* does not support mkv files, only have sound */}
            <video src={videoUrl} ref={videosRef} crossOrigin="anonymous"  type="video/mp4">
                <track kind="captions" srcLang="en" src={`${BASE_URL}/videos/subtitles.vtt`} />
            </video>
            {/* crossOrigin YYDS , occupy the whole video, better not to*/}
            {/* <img className="thumbnail-img" ref={thumbnailImgRef} crossOrigin="anonymous"/> */}
            <div className="video-controls-container">
                <div className="timeline-container" ref={timelineContainerRef}>
                    <div className="timeline">
                        <img className="preview-img" ref={previewImgRef} />
                        <div className="thumb-indicator"></div>
                    </div>
                </div>
                <div className="controls">
                    <button className="play-pause-btn" onClick={togglePlay}>
                        <svg className="play-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                        <svg className="pause-icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                    </button>
                    <div className="volume-container">
                        <button className="mute-btn" ref={muteBtnRef}>
                            <svg className="volume-high-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                            </svg>
                            <svg className="volume-low-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                            </svg>
                            <svg className="volume-muted-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                            </svg>
                        </button>
                        <input className="volume-slider" type="range" min="0" max="1" step="any" ref={volumeSliderRef} />
                    </div>
                    <div className="duration-container">
                        <div className="current-time" ref={currentTimeElemRef}>0:00</div>
                        /
                        <div className="total-time" ref={totalTimeElemRef}></div>
                    </div>
                    <button className="captions-btn" ref={captionsBtnRef}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                        </svg>
                    </button>
                    <button className="speed-btn wide-btn" ref={speedBtnRef}>
                        1x
                    </button>
                    <button className="mini-player-btn" ref={miniPlayerBtnRef}>
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                        </svg>
                    </button>
                    <button className="theater-btn">
                        <svg className="tall" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                        </svg>
                        <svg className="wide" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
                        </svg>
                    </button>
                    <button className="full-screen-btn" ref={fullScreenBtnRef}>
                        <svg className="open" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                        <svg className="close" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default YoutubePlayer;
