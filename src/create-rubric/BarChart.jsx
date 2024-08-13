import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({performanceScores}) => {

    return (
        <ResponsiveContainer width="80%" height={370}>
            <BarChart data={performanceScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="black" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CustomBarChart;
