import "./WatchBoard.css";
import { Visibility } from '@mui/icons-material';
import { useEffect, useState } from "react";
import axios from "axios";

export default function WatchBoard({title}) {
  const [newUsers, setNewUsers] = useState([]);
  const userData = [
    {
      username: "Jan",
    },
    {
      username: "Dickens",
    },
  ];
  // useEffect(() => {
  //   const getNewUsers = async () => {
  //     try {
  //       const res = await axios.get("/users?new=true", {
  //         headers: {
  //           token:
  //             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTZmYzQ2NDk0Mjc3MTYwNDg4MmMxNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNTgzMjMxMSwiZXhwIjoxNjI2MjY0MzExfQ.ATXV-1TTWIGyVBttTQSf0erRWjsgZ8jHQv1ZsUixbng",
  //         },
  //       });
  //       setNewUsers(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getNewUsers();
  // }, []);
  
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">{title}</span>
      <ul className="widgetSmList">
        {userData.map((user) => (
          <li className="widgetSmListItem" key={user.username}>
            <img
              src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
