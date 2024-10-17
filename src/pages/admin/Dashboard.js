import React, { useContext, useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Select } from 'antd';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import axios from 'axios';
import { Context } from '~/Context';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

const Dashboard = () => {
    const navigate = useNavigate();
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const { adminToken, handleLogoutAdmin } = useContext(Context);
    const [analyzedData, setAnalyzedData] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [billings, setBillings] = useState([]);
    const [currentRevenue, setCurrentRevenue] = useState(0);
    const [previousRevenue, setPreviousRevenue] = useState(0);
    const [annualData, setAnnualData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const annualSortedData = annualData.sort((a, b) => {
        // Extract the numeric part of the month
        const monthA = parseInt(a.month.split(' ')[1], 10);
        const monthB = parseInt(b.month.split(' ')[1], 10);

        return monthA - monthB;
    });

    const handleError = (err) => {
        if (err.status === 401) {
            alert('Unauthorized. Please log in again.');
            const Logouted = handleLogoutAdmin();
            if (Logouted) {
                navigate(config.routes.loginAdmin);
            }
        } else if (err.status === 400) {
            alert(err.response.data.message);
        }
    };

    const fetchData = async () => {
        try {
            const resTransactions = await axios.get(process.env.REACT_APP_BACKEND_URL + '/transactions');
            setTransactions(resTransactions.data);
            const resBillings = await axios.get(process.env.REACT_APP_BACKEND_URL + '/billings', {
                headers: { Authorization: 'Bearer ' + adminToken },
            });

            setBillings(resBillings.data);
        } catch (error) {
            console.error(error);
            handleError(error);
        }
    };

    const analyzeData = () => {
        let dataOfYear = [];
        const result = {};

        transactions.forEach((transaction) => {
            const { price, billingId } = transaction;

            // Find the corresponding billing information
            const billingInfo = billings.find((b) => b.id === billingId);

            const { createdAt } = billingInfo;

            if (!billingInfo) return;

            const insurancePackage = billingInfo.insurancePackage;
            const year = new Date(createdAt).getFullYear();
            const month = new Date(createdAt).getMonth() + 1;

            // Initialize year in result if not present
            if (!result[year]) {
                result[year] = [];
            }

            // Check if the current month already exists in the result for this year
            let currentMonth = result[year].find((entry) => entry.month === `Month ${month}`);

            // If current month doesn't exist, create an entry
            if (!currentMonth) {
                currentMonth = {
                    month: `Month ${month}`,
                    revenue: 0,
                    value: [],
                };
                result[year].push(currentMonth);
            }

            // Update revenue for the month
            currentMonth.revenue += price;

            // Find or create entry for the current insurance package
            let packageData = currentMonth.value.find((pkg) => pkg.InsurancePackage === insurancePackage.name);
            if (!packageData) {
                packageData = { InsurancePackage: insurancePackage.name, value: 0 };
                currentMonth.value.push(packageData);
            }

            // Update the revenue for the specific insurance package
            packageData.value += price;
        });

        setCurrentRevenue(parseFloat(result[year]?.find((i) => i.month === `Month ${month}`)?.revenue.toFixed(2) || 0));
        setPreviousRevenue(
            parseFloat(result[year]?.find((i) => i.month === `Month ${month - 1}`)?.revenue.toFixed(2) || 0),
        );

        if (result[year]) {
            dataOfYear = result[year];
            setAnnualData(dataOfYear);
            const dataOfMonth = dataOfYear.find((i) => i.month === `Month ${month}`);
            if (dataOfMonth) {
                setSelectedMonth(dataOfMonth.month);
                setMonthlyData(dataOfMonth.value);
            }
        }

        setAnalyzedData(result);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (billings.length > 0) {
            analyzeData();
        }
    }, [billings, transactions]);

    const handleMonthChange = (value) => {
        const data = annualData.find((i) => i.month === value);

        setSelectedMonth(value);
        setMonthlyData(data.value);
    };

    const handleYearChange = (value) => {
        const annualData = analyzedData[value];
        const monthData = annualData.find((i) => i.month === selectedMonth);
        setAnnualData(annualData);
        if (monthData) {
            setMonthlyData(monthData.value);
        } else {
            const firstData = annualData[0];
            setSelectedMonth(firstData.month);
            setMonthlyData(firstData.value);
        }
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#FFD700' }}>
                        <Statistic title="Monthly Revenue" value={`$${currentRevenue}`} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#1E90FF' }}>
                        <Statistic
                            title="Compared to last month"
                            value={previousRevenue !== 0 ? currentRevenue / previousRevenue : 100}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card style={{ backgroundColor: '#32CD32' }}>
                        <Statistic title="Number of subscribers" value={billings.length} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="Monthly Revenue Chart" style={{ width: '100%', textAlign: 'center' }}>
                        <Select
                            value={selectedMonth}
                            style={{ width: 120, marginBottom: '10px' }}
                            onChange={handleMonthChange}
                        >
                            {annualData.map((i, index) => (
                                <Select.Option key={index} value={i.month}>
                                    {i.month}
                                </Select.Option>
                            ))}
                        </Select>
                        <PieChart width={690} height={400}>
                            <Pie
                                data={monthlyData}
                                dataKey="value"
                                cx={340}
                                cy={200}
                                labelLine={false}
                                label={({ InsurancePackage, value }) =>
                                    `${capitalizeFirstLetter(InsurancePackage.split(' ')[2])} - ${
                                        InsurancePackage.split(' ')[0]
                                    } package: $${value}`
                                }
                                outerRadius={150}
                                fill="#8884d8"
                            >
                                {Object.keys(monthlyData).map((_, index) => (
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
                    <Card title="Annual Revenue">
                        <Select
                            defaultValue={year}
                            style={{ width: 120, marginBottom: '10px' }}
                            onChange={handleYearChange}
                        >
                            {Object.keys(analyzedData).map((year) => (
                                <Select.Option key={year} value={year}>
                                    {year}
                                </Select.Option>
                            ))}
                        </Select>
                        <BarChart width={400} height={300} data={annualSortedData}>
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
