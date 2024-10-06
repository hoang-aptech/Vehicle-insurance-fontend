import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import jsPDF from 'jspdf';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const { Title, Paragraph } = Typography;

const Contract = () => {
    const { id } = useParams();
    const contractRef = useRef();
    const [contractData, setContractData] = useState({});

    const getContractData = async () => {
        const res = await axios.get(process.env.REACT_APP_BACKEND_URL + '/insurances/' + id);
        setContractData(res.data);
    };

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Contract', 10, 10);
        doc.text('Party A: Hoang', 10, 20);
        doc.text('Party B: XYZ Company', 10, 100);
        doc.text(contractData.clause, 10, 200);
        doc.save('contract.pdf');
    };

    useEffect(() => {
        getContractData();
    }, []);

    return (
        <div>
            <div ref={contractRef} style={{ padding: '20px', border: '1px solid #ddd' }}>
                <Title level={2}>Contract</Title>

                <Row gutter={16}>
                    <Col span={12}>
                        <Title level={4}>Party A</Title>
                        <Paragraph>Name: ABC Company</Paragraph>
                        <Paragraph>Address: 123 ABC Street, Hanoi</Paragraph>
                        <Paragraph>Phone number: 0909123456</Paragraph>
                    </Col>
                    <Col span={12}>
                        <Title level={4}>Party B</Title>
                        <Paragraph>Name: XYZ Company</Paragraph>
                        <Paragraph>Address: 456 XYZ Street, Ho Chi Minh City</Paragraph>
                        <Paragraph>Phone number: 0988765432</Paragraph>
                    </Col>
                </Row>

                <Title level={4}>Contract Content</Title>
                <Paragraph>{contractData.clause}</Paragraph>
            </div>

            <Button type="default" onClick={exportPDF} style={{ marginTop: '20px' }}>
                Export PDF
            </Button>
        </div>
    );
};

export default Contract;
