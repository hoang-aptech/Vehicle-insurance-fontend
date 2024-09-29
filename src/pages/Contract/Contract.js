import React, { useRef } from 'react';
import { Button, Row, Col, Typography } from 'antd';
import jsPDF from 'jspdf';

const { Title, Paragraph } = Typography;

const Contract = () => {
    const contractRef = useRef();

    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text('Contract', 10, 10);
        doc.text('Party A: ABC Company', 10, 20);
        doc.text('Party B: XYZ Company', 10, 30);
        doc.text('Contract content: ....', 10, 40);
        doc.save('contract.pdf');
    };

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
                <Paragraph>The contract content is agreed upon by both parties with the following terms...</Paragraph>
            </div>

            <Button type="default" onClick={exportPDF} style={{ marginTop: '20px' }}>
                Export PDF
            </Button>
        </div>
    );
};

export default Contract;
