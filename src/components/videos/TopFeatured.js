import InfoIcon from '@mui/icons-material/Info';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from "axios";
import { useEffect, useState } from "react";
import { Stack, Typography, Link, Box, Item, Menu, MenuItem, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"
import YoutubePlayer from './YoutubePlayer';

import { BASE_URL } from '../../config';
export default function Featured({ type, setGenre }) {
    const [content, setContent] = useState({});
    const [percent, setPercent] = useState();

    const navi = useNavigate();
    // useEffect(() => {
    //     const getRandomContent = async () => {
    //         try {
    //             const res = await axios.get(`/movies/random?type=${type}`, {
    //                 headers: {
    //                     token:
    //                         "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
    //                 },
    //             });
    //             setContent(res.data[0]);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getRandomContent();
    // }, [type]);

    return (
        <Stack>
            <Box
                component="img"
                src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/2cc5e72d-5aa4-43aa-b0d7-44be8758e1cc/HK-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                sx={{ width: "100%" }}
            />

            <Box sx={{
                position: "absolute",
                top: "20%", left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
            }}
            >
                <YoutubePlayer videoUrl={`${BASE_URL}/videos/bigbuck.mp4`} />
            </Box>

            <Box sx={{
                width: "80%", position: "absolute",
                left: "3%",
                top: "70%"
            }}
            >
                <Box sx={{ width: "40%", }}
                >
                    <Typography variant="h4"
                        sx={{ mt: 1, textAlign: 'left', marginLeft: "10px", color: "white" }}
                    >
                        不可能的任务：致命清算
                    </Typography>
                </Box>

                <Box sx={{ margin: "10px", width: "40%" }}
                >
                    {/* https://stackoverflow.com/questions/64315111/material-ui-write-text-in-exactly-2-lines-with-ellipsis */}
                    <Typography variant="subtitle2"
                        sx={{
                            mt: 1, textAlign: 'left', overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "5",
                            WebkitBoxOrient: "vertical", color: "white"
                        }}
                    >
                        正在测试低可侦测性技术的俄罗斯潜艇“塞瓦斯托波尔号”因利用人工智能“智体”中发生问题并不受潜艇控制反而遭到“实体”所自发虚拟的另一艘潜艇发射鱼雷，“塞瓦斯托波尔号”下令发射鱼雷还击，惟“智体”所虚拟的潜艇和鱼雷突然失踪，令“塞瓦斯托波尔号”的鱼雷突然扭转方向，击中了塞瓦斯托波尔号，舰艇内全体船员死亡。
                    </Typography>

                </Box>
                <Button style={{
                    backgroundColor: "#1c1c1c", margin: "10px"
                }} variant="contained" onClick={() => {
                    navi("/netflix/watch",
                        {
                            state: {
                                videoId: "bigbuck.mp4",
                            }
                        }
                    );
                }} >
                    <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                    >
                        <PlayArrowIcon />
                        <Typography variant="subtitle2"
                            sx={{ mt: 3, textAlign: 'center' }}
                        >
                            Play
                        </Typography>
                    </Stack>
                </Button>
                <Button style={{
                    backgroundColor: "#1c1c1c", margin: "10px"
                }} variant="contained">
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <InfoIcon />
                        <Typography variant="subtitle2"
                            sx={{ mt: 3, textAlign: 'center' }}
                        >
                            Info
                        </Typography>
                    </Stack>
                </Button>

                {/* download */}
                <Button style={{
                    backgroundColor: "#1c1c1c",margin: "10px"
                }} variant="contained" onClick={() => {
                    const url = `${BASE_URL}/videos/bigbuck.mp4`;
                    axios({
                        url,
                        method: 'GET',
                        responseType: 'blob',
                        onDownloadProgress: (progressEvent) => {
                            const percentCompleted = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            console.log(`Downloaded ${percentCompleted}%`);
                            setPercent(percentCompleted)
                        },
                    })
                        .then(res => {
                            let blob = new Blob([res.data])
                            const url = window.URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = "1234ww.mp4";
                            document.body.appendChild(a);
                            a.click();
                            a.remove();
                            URL.revokeObjectURL(url)
                        });
                }}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <InfoIcon />
                        <Typography variant="subtitle2"
                            sx={{ mt: 3,  textAlign: 'center' }}
                        >
                            Download {percent}
                        </Typography>
                    </Stack>
                </Button>
            </Box>

        </Stack>
    );
}
