import "./CustomPieChart.css";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, } from 'recharts';
import { Tooltip, Typography, Stack, Box } from "@mui/material";
import { textAlign } from "@mui/system";

const data = [
  { name: 'Music', value: 400 },
  { name: 'Movie', value: 300 },
  { name: 'Books', value: 300 },
  { name: 'Others', value: 200 },
];

const radarData = [
  {
    subject: 'Math',
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: 'Chinese',
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'English',
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: 'Geography',
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: 'Physics',
    A: 85,
    B: 90,
    fullMark: 150,
  },
  {
    subject: 'History',
    A: 65,
    B: 85,
    fullMark: 150,
  },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CustomPieChart({ title, radarTitle }) {
  const demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';
  return (
    <div className="chart">
      <h3 className="chartTitle">{"Layout " + title}</h3>

      <Stack direction={"row"} alignItems={"center"}>
        <Box>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend align="center" height={36} />
          </PieChart>
        </Box>

        <Stack alignItems={"center"}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" width={344} height={344} data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject"/>
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Tooltip title="radarTitle">
            <Typography style={{color:"#8884d8"}}>
              {radarTitle}
            </Typography>
          </Tooltip>
        </Stack>
      </Stack>
    </div>
  );
}
