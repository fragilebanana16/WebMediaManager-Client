import "./CustomLineChart.css";
import {  LineChart,  Line,  XAxis,YAxis,  CartesianGrid, Legend, Tooltip,  ResponsiveContainer,} from "recharts";
export default function CustomLineChart({ title, data, dataKeyX, dataKeyY, grid,}) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={8 / 1}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKeyX} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey={dataKeyY} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
  );
}
