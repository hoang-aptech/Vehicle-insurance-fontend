import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const dataPie = [
    { name: 'Doanh thu A', value: 400 },
    { name: 'Doanh thu B', value: 300 },
    { name: 'Doanh thu C', value: 300 },
    { name: 'Doanh thu D', value: 200 },
];

const dataBar = [
    { month: 'Tháng 1', count: 400 },
    { month: 'Tháng 2', count: 300 },
    { month: 'Tháng 3', count: 200 },
    { month: 'Tháng 4', count: 278 },
    { month: 'Tháng 5', count: 189 },
];

const Dashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#FFD700' }}>
                        <Statistic title="Doanh thu tháng" value={112893} />
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
                <Col span={12}>
                    <Card title="Biểu đồ doanh thu tháng">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={dataPie}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} // Hiển thị tên và phần trăm
                            >
                                {dataPie.map((entry, index) => (
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
                    <Card title="Số người mua theo tháng">
                        <BarChart width={400} height={300} data={dataBar}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
