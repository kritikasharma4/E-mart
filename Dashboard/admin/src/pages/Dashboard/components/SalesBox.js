import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: '2013', value: 930, color: '#66BB6A' },  // Darker green
  { name: '2014', value: 600, color: '#FFCA28' },  // Darker yellow
  { name: '2018', value: 1100, color: '#FF7043' }, // Darker orange/red
  { name: '2019', value: 950, color: '#BA68C8' }   // Darker lavender/purple
];



const SalesBox = () => {
  return (
    <div className="salesBox p-4 text-white rounded-4">
      <h5>Total Sales</h5>
      <h3>$3,787,681.00</h3>
      <p>$3,578.90 in last month</p>
      <PieChart width={218} height={218}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={70}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="middle" align="right" layout="vertical" />
      </PieChart>
    </div>
  );
};

export default SalesBox;
