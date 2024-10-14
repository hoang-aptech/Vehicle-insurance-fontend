import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Select } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Dữ liệu doanh thu hàng ngày cho mỗi tháng (5 ngày)
const dailyData = {
    'Tháng 1': [
        { day: 'Ngày 1', value: 50 },
        { day: 'Ngày 2', value: 60 },
        { day: 'Ngày 3', value: 70 },
        { day: 'Ngày 4', value: 80 },
        { day: 'Ngày 5', value: 90 },
    ],
    'Tháng 2': [
        { day: 'Ngày 1', value: 42 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 3': [
        { day: 'Ngày 1', value: 43 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 4': [
        { day: 'Ngày 1', value: 80 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 5': [
        { day: 'Ngày 1', value: 100 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 6': [
        { day: 'Ngày 1', value: 125 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 7': [
        { day: 'Ngày 1', value: 401 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 8': [
        { day: 'Ngày 1', value: 121 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 9': [
        { day: 'Ngày 1', value: 40 },
        { day: 'Ngày 2', value: 111 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 10': [
        { day: 'Ngày 1', value: 40 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 126 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
    'Tháng 11': [
        { day: 'Ngày 1', value: 40 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 60 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 254 },
    ],
    'Tháng 12': [
        { day: 'Ngày 1', value: 40 },
        { day: 'Ngày 2', value: 50 },
        { day: 'Ngày 3', value: 104 },
        { day: 'Ngày 4', value: 70 },
        { day: 'Ngày 5', value: 80 },
    ],
};

// Dữ liệu doanh thu hàng tháng theo năm
const yearlyData = {
    2021: [
        { month: 'Tháng 1', revenue: 300 },
        { month: 'Tháng 2', revenue: 4000 },
        { month: 'Tháng 3', revenue: 4500 },
        { month: 'Tháng 4', revenue: 6000 },
        { month: 'Tháng 5', revenue: 7000 },
        { month: 'Tháng 6', revenue: 7000 },
        { month: 'Tháng 7', revenue: 7000 },
        { month: 'Tháng 8', revenue: 7000 },
        { month: 'Tháng 9', revenue: 7000 },
        { month: 'Tháng 10', revenue: 7000 },
        { month: 'Tháng 11', revenue: 7000 },
        { month: 'Tháng 12', revenue: 7000 },
    ],
    2022: [
        { month: 'Tháng 1', revenue: 5000 },
        { month: 'Tháng 2', revenue: 4000 },
        { month: 'Tháng 3', revenue: 4500 },
        { month: 'Tháng 4', revenue: 6000 },
        { month: 'Tháng 5', revenue: 7000 },
        { month: 'Tháng 6', revenue: 7000 },
        { month: 'Tháng 7', revenue: 7000 },
        { month: 'Tháng 8', revenue: 7000 },
        { month: 'Tháng 9', revenue: 7000 },
        { month: 'Tháng 10', revenue: 7000 },
        { month: 'Tháng 11', revenue: 7000 },
        { month: 'Tháng 12', revenue: 7000 },
    ],
    2023: [
        { month: 'Tháng 1', revenue: 5000 },
        { month: 'Tháng 2', revenue: 4000 },
        { month: 'Tháng 3', revenue: 4500 },
        { month: 'Tháng 4', revenue: 6000 },
        { month: 'Tháng 5', revenue: 7000 },
        { month: 'Tháng 6', revenue: 7000 },
        { month: 'Tháng 7', revenue: 7000 },
        { month: 'Tháng 8', revenue: 7000 },
        { month: 'Tháng 9', revenue: 7000 },
        { month: 'Tháng 10', revenue: 7000 },
        { month: 'Tháng 11', revenue: 7000 },
        { month: 'Tháng 12', revenue: 7000 },
    ],
};

const Dashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState('Tất cả');
    const [selectedYear, setSelectedYear] = useState('2023');
    const [dailyRevenueData, setDailyRevenueData] = useState([]);
    const [monthlyRevenueData, setMonthlyRevenueData] = useState(yearlyData[selectedYear]);

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
        setDailyRevenueData(value !== 'Tất cả' ? dailyData[value] : []);
    };

    const handleYearChange = (value) => {
        setSelectedYear(value);
        setMonthlyRevenueData(yearlyData[value]);
    };

    // Dữ liệu cho biểu đồ tròn
    const filteredDataPie =
        selectedMonth === 'Tất cả'
            ? Object.keys(dailyData).map((month) => ({
                  name: month,
                  value: dailyData[month].reduce((sum, day) => sum + day.value, 0),
              }))
            : dailyRevenueData.map(({ day, value }) => ({
                  name: `${day} `,
                  value,
              }));
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#FFD700' }}>
                        <Statistic
                            title="Doanh thu tháng"
                            value={monthlyRevenueData.reduce((total, month) => total + month.revenue, 0)}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#1E90FF' }}>
                        <Statistic title="So với tháng trước" value={15.5} suffix="%" />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#32CD32' }}>
                        <Statistic title="Số lượt người đăng ký" value={568} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="Biểu đồ doanh thu hàng ngày" style={{ width: '100%', textAlign: 'center' }}>
                        <Select
                            defaultValue="Tất cả"
                            style={{ width: 120, marginBottom: '10px' }}
                            onChange={handleMonthChange}
                        >
                            <Select.Option value="Tất cả">Tất cả</Select.Option>
                            {Object.keys(dailyData).map((month, index) => (
                                <Select.Option key={index} value={month}>
                                    {month}
                                </Select.Option>
                            ))}
                        </Select>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={filteredDataPie}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={150}
                                fill="#8884d8"
                            >
                                {filteredDataPie.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Doanh thu theo năm">
                        <Select
                            defaultValue="2023"
                            style={{ width: 120, marginBottom: '10px' }}
                            onChange={handleYearChange}
                        >
                            {Object.keys(yearlyData).map((year, index) => (
                                <Select.Option key={index} value={year}>
                                    {year}
                                </Select.Option>
                            ))}
                        </Select>
                        <BarChart width={400} height={300} data={monthlyRevenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
