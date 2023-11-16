import "./RecommendBoard.css"
import testImage from "../../assets/Images/oppenheimer.jpg"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Rating from '@mui/material/Rating';
import { useState } from "react";
const RecommendBoard = ({ title }) => {
  const [star, setStar] = useState(2);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">{title}</span>

      <div className="ext-box">
      <img className="posterImage" src={testImage} alt="" />

        <div className="int-box">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
          <div className="movieDescription">
            <span className="descriptionText">《奥本海默》</span>
          </div>
          <div className="movieDescription">
            <span className="descriptionText">导演: 克里斯托弗·诺兰</span>
          </div>
          <div className="movieDescription">
            <span className="descriptionText">预计上映日期：2023</span>
          </div>

          <div className="movieDescription">
          <Rating
        name="simple-controlled"
        value={star}
        onChange={(event, newValue) => {
          setStar(newValue);
        }}
      />
          </div>
  
        </div>
      </div>
    </div>
  );
};

export default RecommendBoard;
