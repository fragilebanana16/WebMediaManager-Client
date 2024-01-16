import "./AdminHome.css";
import { userData, userChatData, userMusicData } from "../../data/adminDummyData";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import NumberInfo from "../../components/Admin/NumberInfo";
import CustomLineChart from "../../components/Admin/CustomLineChart";
import WatchBoard from "../../components/Admin/WatchBoard";
import CustomPieChart from "../../components/Admin/CustomPieChart";
import RecommendBoard from "../../components/Admin/RecommendBoard";
export default function AdminHome() {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await axios.get("/users/stats", {
  //         headers: {
  //           token:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTZmYzQ2NDk0Mjc3MTYwNDg4MmMxNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNTgzMjMxMSwiZXhwIjoxNjI2MjY0MzExfQ.ATXV-1TTWIGyVBttTQSf0erRWjsgZ8jHQv1ZsUixbng",
  //         },
  //       });
  //       const statsList = res.data.sort(function (a, b) {
  //         return a._id - b._id;
  //       });
  //       statsList.map((item) =>
  //         setUserStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item._id - 1], "New User": item.total },
  //         ])
  //       );
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getStats();
  // }, [MONTHS]);

  return (
    <div className="home">
      <div className="homeTitleContent">
<RecommendBoard title={"Upcoming Movie"}></RecommendBoard>
      <CustomPieChart title={"Haha"} radarTitle={"Content Radar"}></CustomPieChart>
      </div>

      <NumberInfo></NumberInfo>
      <div className="homeWidgets">
      <WatchBoard title={"Add Movies"}></WatchBoard>
      <WatchBoard title={"Recently Add Music"}></WatchBoard>
      <WatchBoard title={"Recently Add Books"}></WatchBoard>
      <WatchBoard title={"Recently Add Others"}></WatchBoard>
      </div>
      <div className="homeCharts">
      <CustomLineChart data={userData} title="Movie Watched" grid dataKeyX="Active_UserX" dataKeyY="Active_UserY" />
      <CustomLineChart data={userChatData} title="Chat Messages" grid dataKeyX="Chat_CountX" dataKeyY="Chat_CountY" />
      <CustomLineChart data={userMusicData} title="Listen Count" grid dataKeyX="Listen_CountX" dataKeyY="Listen_CountY"/>
</div>
      {/* <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div> */}
    </div>
  );
}
